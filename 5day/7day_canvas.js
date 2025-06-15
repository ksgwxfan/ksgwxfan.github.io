var desc = [
	"5day/desc_blank.svg",
	"5day/en/desc_windy.svg",
	"5day/en/desc_hot.svg",
	"5day/en/desc_muggy.svg",
	"5day/en/desc_dry.svg",
	"5day/en/desc_severe.svg",
	"5day/en/desc_heavy_rain.svg",
	"5day/en/desc_heavy_snow.svg",
	"5day/en/desc_blizzard.svg",
	"5day/en/desc_wintry_mix.svg",
	"5day/en/desc_frost.svg",
	"5day/en/desc_fog.svg",
	"5day/en/desc_AM_clearing.svg",
	"5day/en/desc_PM_clearing.svg",
	"5day/en/desc_NIGHT_clearing.svg",
	"5day/en/desc_AM_inc_clouds.svg",
	"5day/en/desc_PM_inc_clouds.svg",
	"5day/en/desc_NIGHT_inc_clouds.svg",
	"5day/en/desc_perc_AM.svg",
	"5day/en/desc_perc_PM.svg",
	"5day/en/desc_perc_NIGHT.svg",
	"5day/en/desc_perc_rain.svg",
	"5day/en/desc_perc_tstorms.svg",
	"5day/en/desc_perc_snow.svg",
	"5day/en/desc_perc_wintry1.svg",
	"5day/en/desc_perc_wintry2.svg"
];

var sky = [
	"5day/sky_sun.svg",
	"5day/sky_sun_smile.svg",
	"5day/sky_sun_mostly.svg",
	"5day/sky_partly.svg",
	"5day/sky_cloudy_mostly.svg",
	"5day/sky_cloudy.svg",
	"5day/sky_partly_rain.svg",
	"5day/sky_cloudy_mostly_rain.svg",
	"5day/sky_cloudy_rain.svg",
	"5day/sky_cloudy_rain_catsdogs.svg",
	"5day/sky_partly_tstorm.svg",
	"5day/sky_partly_tstorm_only.svg",
	"5day/sky_cloudy_mostly_tstorm.svg",
	"5day/sky_cloudy_mostly_tstorm_only.svg",
	"5day/sky_cloudy_tstorm.svg",
	"5day/sky_cloudy_tstorm_only.svg",
	"5day/sky_hurricane.svg",
	"5day/sky_partly_snow.svg",
	"5day/sky_cloudy_mostly_snow.svg",
	"5day/sky_cloudy_snow.svg",
	"5day/sky_cloudy_snow2.svg",
	"5day/sky_partly_snowrain.svg",
	"5day/sky_cloudy_mostly_snowrain.svg",
	"5day/sky_cloudy_snowrain.svg",
	"5day/sky_partly_wintrymix.svg",
	"5day/sky_cloudy_mostly_wintrymix.svg",
	"5day/sky_cloudy_wintrymix.svg",
	"5day/sky_partly_wintrymix2.svg",
	"5day/sky_cloudy_mostly_wintrymix2.svg",
	"5day/sky_cloudy_wintrymix2.svg",
];

var logo = [
	"5day/logo_echotops.svg",
	"5day/logo_channel99.svg",
	"5day/logo_wxbonanza.svg",
	"5day/logo_weather01.svg",
	"5day/logo_weather02.svg",
	"5day/logo_weather03.svg",
	"5day/logo_weather04.svg",
	"5day/logo_blank.svg",
];

// let custom_logo = document.getElementById("form-custom-logo");
// custom_logo.onchange = unlock_custom_logo_button;

// let btn_custom_logo = document.getElementById("btn-custom-logo");
// btn_custom_logo.onclick = generate_custom_logo_data;

logo.currentIndex = function() {
	return this.findIndex(
		(logourl, indx, arr) => {
			return prop.logo.src.includes(logourl);
			// return (!URL.parse(logourl)) ? 
				// prop.logo.src.includes(logourl) :
				// prop.logo.src.includes(
					// URL.parse(logourl).href
				// );
		}
	)
}

screen.aspectRatio = function() {
	return this.availWidth / this.availHeight;
}
screen.inverseAspectRatio = function() {
	return 1 / this.aspectRatio();
}
// Dynamic Window Resize
screen.orientation.onchange = change_orientation;

let canvas = document.getElementById("forecast");
canvas.aspectRatio = function() {
	return this.width / this.height;
}
canvas.inverseAspectRatio = function() {
	return 1 / this.aspectRatio();
}
let ctx = canvas.getContext("2d");
let canvas_portrait = document.getElementById("forecast-portrait");

function change_orientation() {
	// this is needed as the document element won't reflect the proper changes in dimensions until after the resize function was complete
	setTimeout(resize, 500);
}

// Canvas Event Listener
// canvas.addEventListener(
	// "contextmenu",
	// event => respond(event)
// );
canvas.addEventListener(
	"mousemove",
	event => canvas_click(event)
);
canvas.addEventListener(
	"mousedown",
	event => canvas_click(event)
);
canvas.addEventListener(
	"touchstart",
	event => canvas_click(event)
);
canvas.addEventListener(
	"mouseup",
	event => canvas_click(event)
);
// canvas.addEventListener(
	// "mousedown",
	// event => canvas_click(event)
// );

let savelang = document.getElementById("save-lang");
let savebg = document.getElementById("save-bg");
let savebgpatt = document.getElementById("save-bg-pattern");
let saveusebgpatt = document.getElementById("save-use-bg-pattern");
let savefdindex = document.getElementById("save-firstday");
let saveprcp = document.getElementById("save-prcp");
let saveuvi = document.getElementById("save-uvi");
let savewind = document.getElementById("save-wind");
let savetemps = document.getElementById("save-temps");

// not saved in localStorage, but needed elsewhere in the script
let savename = document.getElementById("savename");

// experimental alternative title load using
//    drawTitle_underconstruction
//    causes loop though because drawTitle() is called w/in draw().
// let titlecont = document.getElementById("container-title-svg");
// let titlesvg = document.getElementById("title-svg");
// let imgtitle = document.getElementById("title-svg-img");
// imgtitle.onload = draw;

var prop = {
	"dayQty": 7,
	"weekArray": ["SUN","MON","TUE","WED","THU","FRI","SAT"],
	"hemisphere": "N",
	"tempUnits": "F",
	"language": "en",
	"lang_packs": {
		"en": {
			"name": "English",
			"dayNames": ["SUN","MON","TUE","WED","THU","FRI","SAT"],
			"title": "#NAME's #QTY-Day Forecast for #CITY",
			"title_exclude_city": "#NAME's #QTY-Day Forecast",
			"title_exclude_name": "#QTY-Day Forecast for #CITY"
		},
		"fr": {
			"name": "French",
			"dayNames": ["DIM","LUN","MAR","MER","JEU","VEN","SAM"],
			"title": "Prévisions de #QTY jours de #NAME pour #CITY",
			"title_exclude_city": "Prévisions de #QTY jours de #NAME",
			"title_exclude_name": "Prévisions de #QTY jours pour #CITY"
		},
		"sp": {
			"name": "Spanish",
			"dayNames": ["DO","LU","MA","MI","JU","VI","SA"],
			"title": "Pronóstico #QTY Días de #NAME para #CITY",
			"title_exclude_city": "Pronóstico #QTY Días de #NAME",
			"title_exclude_name": "Pronóstico #QTY Días para #CITY"
		}
	},
	"backgroundColor": "#27688D",
	"usePreMadeBackground" : false,
	"backgroundImage": new Image(),
	"dayImage": new Image(),
	"hiColor": "#FFFFFF",
	"loColor": "#000000",
	"logo": new Image(),
	"uvi": new Image(),
	"wind": new Image(),
	"titleColor": "#000000",
	"titleMode": "both",
	"highlightOver": "rgba(255, 255, 0, 30%)",
	"highlightActive": "rgba(255, 255, 0, 40%)",

};
prop.wind.src = "5day/windboxlogo.svg";

// Create day objects; init image objects
let word = "WEATHER";
prop.backgroundImage.aspectRatio = function() {
	return this.naturalWidth / this.naturalHeight;
}
prop.backgroundImage.isLandscape = function() {
	return this.naturalWidth > this.naturalHeight;
}
prop.backgroundImage.toCanvasWidth = function() {
	return this.aspectRatio() > canvas.aspectRatio() ?
		this.toCanvasHeight() * this.aspectRatio() : canvas.width
}
prop.backgroundImage.toCanvasHeight = function() {
	return this.aspectRatio() > canvas.aspectRatio() ? 
		canvas.height : this.toCanvasWidth() / this.aspectRatio()
}
prop.backgroundImage.onload = draw;
for (dy=1; dy <= 7; dy++) {
	prop[`day${dy}`] = {
		"sky": new Image(),
		"desc": new Image(),
		"prcp": "",
		"uvi": false,
		"uvi_level": 1,
		"wind": false,
		"wdir": "",
		"wspd": "",
		"hi": word[dy-1],
		"lo": word[dy-1].toLowerCase()
	};
	prop[`day${dy}`].sky.src = "5day/sky_sun.svg";
	prop[`day${dy}`].sky.onload = draw;
	prop[`day${dy}`].desc.src = "5day/desc_blank.svg";
	prop[`day${dy}`].desc.onload = draw;
}

// Set day
load_day_select();

// Set global image sources
// the following listener is only needed to populate download sizes
prop.dayImage.src = "5day/TEMPLATE_7day.svg";
prop.logo.src = "5day/logo_echotops.svg";
prop.uvi.src = "5day/uvi.svg";

// Due to image objects being loaded async
// Don't resize until image is loaded

// preload global imagery & other listeners
prop.logo.onload = draw;
prop.uvi.onload = draw;
prop.dayImage.onload = function() {
	resize();
	recalculateDownloadSizes();
}
// add temporary event listener to generate the save name placeholder
prop.dayImage.addEventListener("load", delta_save_placeholder)

prop.dayImage.aspectRatio = function() {
	return this.width / this.height;
};
prop.dayImage.inverseAspectRatio = function() {
	return 1 / this.aspectRatio();
};

function lschange() {
	try {
		// console.log(saveprcp.checked);
		localStorage.setItem("forecast.save-lang", (savelang.checked) ? 1 : 0);
		localStorage.setItem("forecast.save-bg", (savebg.checked) ? 1 : 0);
		localStorage.setItem("forecast.save-bg-pattern", (savebgpatt.checked) ? 1 : 0);
		localStorage.setItem("forecast.save-use-bg-pattern", (saveusebgpatt.checked) ? 1 : 0);
		localStorage.setItem("forecast.save-firstday", (savefdindex.checked) ? 1 : 0);
		localStorage.setItem("forecast.save-prcp", (saveprcp.checked) ? 1 : 0);
		localStorage.setItem("forecast.save-uvi", (saveuvi.checked) ? 1 : 0);
		localStorage.setItem("forecast.save-wind", (savewind.checked) ? 1 : 0);
		localStorage.setItem("forecast.save-temps", (savetemps.checked) ? 1 : 0);
	} catch (e) {
		console.log(e);
	}
}

function lsload() {
	try {
		savelang.checked = Boolean(
			parseInt(localStorage.getItem("forecast.save-lang"))
		);
		savebg.checked = Boolean(
			parseInt(localStorage.getItem("forecast.save-bg"))
		);
		saveusebgpatt.checked = Boolean(
			parseInt(localStorage.getItem("forecast.save-use-bg-pattern"))
		);
		savebgpatt.checked = Boolean(
			parseInt(localStorage.getItem("forecast.save-bg-pattern"))
		);
		savefdindex.checked = Boolean(
			parseInt(localStorage.getItem("forecast.save-firstday"))
		);
		saveprcp.checked = Boolean(
			parseInt(localStorage.getItem("forecast.save-prcp"))
		);
		saveuvi.checked = Boolean(
			parseInt(localStorage.getItem("forecast.save-uvi"))
		);
		savewind.checked = Boolean(
			parseInt(localStorage.getItem("forecast.save-wind"))
		);
		savetemps.checked = Boolean(
			parseInt(localStorage.getItem("forecast.save-temps"))
		);
	} catch (e) {
		console.log(e);
	}
}

function save_urlparams() {
	let options = {};
	let params = [];
	if (savelang.checked) {
		if (prop.language != "en") {
			options.lang = (prop.language == "sp") ? -1 : 1;
		}
	}
	if (savebg.checked) {
		options.bg = prop.backgroundColor.slice(1);
	}
	if (savebgpatt.checked && saveusebgpatt.checked) {
		options.bgpatt = document.getElementById("pre-made-bg-select").value;
	}
	if (saveusebgpatt.checked) {
		options.usebgpatt = 1;
	}
	if (savefdindex.checked) {
		options.fdindex = prop.lang_packs[prop.language].dayNames.indexOf(
			prop.weekArray[0]
		);
	}
	if (document.getElementById("nameentry").value != "") {
		options.name = document.getElementById("nameentry").value;
	}
	if (document.getElementById("cityentry").value != "") {
		options.city = document.getElementById("cityentry").value;
	}
	if (prop.titleMode != "both") {
		options.titleMode = prop.titleMode;
	}
	if (document.getElementById("customentry").value != "") {
		options.custom = document.getElementById("customentry").value;
	}
	// Don't leave out options.icon. It will be for legacy purposes
	options.icon = logo.currentIndex();
	options.icon_url = logo.at(logo.currentIndex());
	if (prop.tempUnits != "F") {
		options.temp = prop.tempUnits;
	}
	if (prop.dayQty != 7) {
		options.days = prop.dayQty;
	}
	if (document.getElementById("hemisphere").value != "N") {		
		options.hemi = prop.hemisphere;
	}
	if (saveprcp.checked) {
		let prcpstr = "";
		for (let dy=1; dy<=7; dy++) {
			prcpstr += prop[`day${dy}`].prcp + ((dy != 7) ? "|" : "");
		}
		options["prcp"] = prcpstr;
	}
	if (saveuvi.checked) {
		let uvistr = "";
		for (let dy=1; dy<=7; dy++) {
			uvistr += (
				prop[`day${dy}`].uvi ? "t":"f"
			) + prop[`day${dy}`].uvi_level + (
				(dy != 7) ? "|" : ""
			);
		}
		options["uvi"] = uvistr;
	}
	if (savewind.checked) {
		let windstr = "";
		// "wind": false,
		// "wdir": "",
		// "wspd": "",
		for (let dy=1; dy<=7; dy++) {
			windstr += 
				[
					prop[`day${dy}`].wind ? "t":"f",
					document.getElementById(`wind${dy}select`).value,
					prop[`day${dy}`].wspd
				].join("_") + (
				(dy != 7) ? "|" : ""
			);
		}
		options["wind"] = windstr;
	}
	if (savetemps.checked) {
		let tempsstr = "";
		for (let dy=1; dy<=7; dy++) {
			tempsstr += 
				[
					prop[`day${dy}`].hi,
					prop[`day${dy}`].lo
				].join("_") + (
				(dy != 7) ? "|" : ""
			);
		}
		options["temps"] = tempsstr;
	}


	// Put values in format to save
	for (let key of Object.keys(options)) {
		params.push(key + "=" + encodeURIComponent(options[key]))
	}
	let paramstr = "?" + params.join("&");
	document.location.assign(
		document.location.origin + document.location.pathname + paramstr
	);
}

function process_urlparams() {
	let options = {}
	let terms = document.location.search.slice(1).split(/\&/);
	for (let term of terms) {
		if (term.length > 0) {
			options[term.split("=")[0]] = decodeURIComponent(term.split("=")[1]);
		}
	}
	// Language
	if (Object.keys(options).includes("lang")) {
		document.getElementById(
			"lang_" + (
				(options["lang"] < 0) ? "left" : "right"
			)
		).click();
	}
	// Background stuff
	if (Object.keys(options).includes("bg")) {
		document.getElementById("mainbgcolor").value = "#" + options["bg"];
		document.getElementById("mainbgcolor").oninput();
	}
	if (Object.keys(options).includes("usebgpatt")) {
		document.getElementById("checkbox-bg-type").click();
	}
	if (Object.keys(options).includes("bgpatt")) {
		document.getElementById("pre-made-bg-select").value = options["bgpatt"];
		document.getElementById("pre-made-bg-select").onchange();
	}

	// Forecast day
	if (Object.keys(options).includes("fdindex")) {
		document.getElementById("firstday").value = options["fdindex"];
		document.getElementById("firstday").onchange();
	}
	if (Object.keys(options).includes("name")) {
		document.getElementById("nameentry").value = options["name"];
	}
	if (Object.keys(options).includes("city")) {
		document.getElementById("cityentry").value = options["city"];
	}
	if (Object.keys(options).includes("titleMode")) {
		document.getElementById("title" + options["titleMode"]).click();
	}
	if (Object.keys(options).includes("custom")) {
		document.getElementById("customentry").value = options["custom"];
	}
	// For legacy purposes, leave the "icon" option alone
	if (Object.keys(options).includes("icon")) {
		prop.logo.src = logo[options["icon"]];
	}
	// New icon method; will overwrite above legacy version
	if (Object.keys(options).includes("icon_url")) {
		prop.logo.src = options["icon_url"];
		// Add the saved URL logo to the list if not present
		if (!logo.includes(options["icon_url"])) {
			logo.push(options["icon_url"]);
		}
	}
	if (Object.keys(options).includes("temp")) {
		document.getElementById("input-temp" + options["temp"]).click();
	}
	if (Object.keys(options).includes("days")) {
		document.getElementById("frcstQty" + options["days"]).click();
	}
	if (Object.keys(options).includes("hemi")) {
		document.getElementById("hemisphere").value = options["hemi"];
		document.getElementById("hemisphere").onchange();
	}
	if (Object.keys(options).includes("prcp")) {
		let prcpli = options["prcp"].split(/\|/);
		for (let dy=1; dy<=7; dy++) {
			if (prcpli[dy-1] != "") {
				document.getElementById("percentbox" + dy).value = prcpli[dy-1];
				document.getElementById("percentbox" + dy).oninput();
			}
		}
	}
	if (Object.keys(options).includes("uvi")) {
		let uvili = options["uvi"].split(/\|/);
		for (let dy=1; dy<=7; dy++) {
			if (uvili[dy-1][0] != "f") {
				prop[`day${dy}`].uvi_level = parseInt(uvili[dy-1].slice(1));
				document.getElementById("uvitoggle" + dy).onclick();
			}
		}
	}
	if (Object.keys(options).includes("wind")) {
		let windli = options["wind"].split(/\|/);
		for (let dy=1; dy<=7; dy++) {
			let winddyli = windli[dy-1].split("_");
			if (winddyli[0] != "f") {
				document.getElementById(`windtoggle${dy}`).click();
				document.getElementById(`wind${dy}select`).value = winddyli[1];
				document.getElementById(`wind${dy}select`).onchange();
				document.getElementById(`wind${dy}speed`).value = winddyli[2];
				document.getElementById(`wind${dy}speed`).oninput();
			}
		}
	}
	if (Object.keys(options).includes("temps")) {
		let tempsli = options["temps"].split(/\|/);
		for (let dy=1; dy<=7; dy++) {
			let tempsdyli = tempsli[dy-1].split("_");
			document.getElementById(`tmax${dy}`).value = tempsdyli[0];
			document.getElementById(`tmax${dy}`).oninput();
			document.getElementById(`tmin${dy}`).value = tempsdyli[1];
			document.getElementById(`tmin${dy}`).oninput();
		}
	}
}

function forecastDayQty(n) {
	prop.dayQty = parseInt(n);
	// Because of onload (i think it acts as a listener), it runs resize autom.

	prop.dayImage.src = `5day/TEMPLATE_${prop.dayQty}day.svg`;
	// Show / Hide options for applicable days
	if (prop.dayQty == 7) {
		document.getElementById("day4").style.display = "flex";
		document.getElementById("day5").style.display = "flex";
		document.getElementById("day6").style.display = "flex";
		document.getElementById("day7").style.display = "flex";
	}
	else if (prop.dayQty == 5) {
		document.getElementById("day4").style.display = "flex";
		document.getElementById("day5").style.display = "flex";
		document.getElementById("day6").style.display = "none";
		document.getElementById("day7").style.display = "none";
	}
	else if (prop.dayQty == 3) {
		document.getElementById("day4").style.display = "none";
		document.getElementById("day5").style.display = "none";
		document.getElementById("day6").style.display = "none";
		document.getElementById("day7").style.display = "none";
	}
}

function recalculateDownloadSizes() {
	// make note of selected option
	let _sel = savesize.selectedIndex;

	for (
		let y of [
			360,
			480,
			504,
			800,
			960,
			1080,
		]
	) {
		let height = y.toString();
		let new_width = Math.round(y * prop.dayImage.aspectRatio());
		let opt

		if (Boolean(document.getElementById(`save${y}p`))) {
			opt = document.getElementById(`save${y}p`);
		}
		else {
			opt = document.createElement("option");
			opt.setAttribute("id", `save${y}p`);
		}

		opt.value = `${new_width}x${height}`;
		opt.innerText = `${new_width} x ${height}`;
		
		if (_sel == -1 && y == 504) {
			opt.selected = true
		}
		savesize.add(opt);
	}

	// re-select previous option for continuity
	if (_sel != -1) {
		savesize.options[_sel].selected = true;
	}
}

function resize() {
	// prop.width7 is the width the dayImage would have if it was the 7 day.
	// found by proportion: 1000 / naturalWidth = x / canvas.width;
	//                      x = canvas.width * 1000 / dayImage.naturalWidth


	// if the screen AR > dayImage AR, resize needs to be based on height

	let numdays = document.getElementById("numdays");
	let vmax = Math.max(
		document.documentElement.clientWidth,
		document.documentElement.clientHeight
	);
	let vmin = Math.min(
		document.documentElement.clientWidth,
		document.documentElement.clientHeight
	);
	// Landscape
	if (screen.orientation.type.includes("landscape")) {
		// resize based on screen height
		if (screen.aspectRatio() > prop.dayImage.aspectRatio()) {
			canvas.height = vmin * 0.9;
			canvas.width = canvas.height * prop.dayImage.aspectRatio();
		}
		// resize based on width
		else {
			canvas.width = vmax * 0.9;
			canvas.height = canvas.width / prop.dayImage.aspectRatio();
		}
	}
	// Portrait
	else {
		// resize based on height
		if (screen.aspectRatio() > prop.dayImage.aspectRatio()) {
			canvas.height = vmax * 0.9;
			canvas.width = canvas.height * prop.dayImage.aspectRatio();
		}
		// resize based on width
		else {
			canvas.width = vmin * 0.9;
			canvas.height = canvas.width / prop.dayImage.aspectRatio();
		}
	}
	prop.width7 = canvas.width * 1000 / prop.dayImage.naturalWidth;

	reparameterize();
}

function reparameterize() {
	// px = (3/4)*pt
	// pt = (4/3)*px
	// the above conversions don't work for the canvas!
	if (prop.dayQty == 7) {
		prop.dayHeaderFont = `bold ${canvas.width * 0.032}pt sans-serif`;
	}
	else if (prop.dayQty == 5) {
		prop.dayHeaderFont = `bold ${canvas.width * 0.045}pt sans-serif`;
	}
	else {
		prop.dayHeaderFont = `bold ${canvas.width * 0.075}pt sans-serif`;
	}
	// 7 Day Title Font (as of feb 2025, this isn't used)
	prop.titleFont = `bold ${canvas.width * 0.028}pt sans-serif`;
	prop.prcpFont = `bold ${prop.width7 * 0.018}pt sans-serif`;
	prop.uviFont = `italic normal ${prop.width7 * 0.012}pt sans-serif`;
	prop.uviMarkerFont = `normal ${prop.width7 * 0.010}pt sans-serif`;
	prop.windFont = `italic bold ${prop.width7 * 0.014}pt sans-serif`;
	prop.hiFont = `bold ${prop.width7 * 0.06}pt sans-serif`;
	prop.loFont = `bold ${prop.width7 * 0.018}pt sans-serif`;
	// Measurements
	prop.dayOffset = prop.width7 * 0.14214;
	prop.dayWidth = prop.width7 * 0.13714;
	prop.uviOffset = prop.dayWidth * 0.0454;
	prop.uviWidth = prop.dayWidth * 0.0826;
	prop.borderSpace = prop.width7 * 0.005;
	draw();
}

function draw() {

	// BACKGROUND

	// Solid fill
	ctx.fillStyle = prop.backgroundColor;
	ctx.fillRect(0, 0, prop.width7, canvas.height);

	// pre-made
	if (prop.usePreMadeBackground) {
		ctx.drawImage(
			prop.backgroundImage,
			prop.backgroundImage.aspectRatio() > canvas.aspectRatio() ?
				0 - Math.abs(prop.backgroundImage.toCanvasWidth() - canvas.width) / 2 :
				0 + Math.abs(prop.backgroundImage.toCanvasWidth() - canvas.width) / 2
			,
			prop.backgroundImage.aspectRatio() > canvas.aspectRatio() ?
				0 + Math.abs(prop.backgroundImage.toCanvasHeight() - canvas.height) / 2 :
				0 - Math.abs(prop.backgroundImage.toCanvasHeight() - canvas.height) / 2
			,
			prop.backgroundImage.toCanvasWidth(),
			prop.backgroundImage.toCanvasHeight(),
		)
	}

	// TEMPLATE
	ctx.drawImage(
		prop.dayImage,
		0, 0,
		canvas.width,
		canvas.height
	);

	// DAY NAMES
	let former_baseline = ctx.textBaseline;
	ctx.textBaseline = "middle";
	ctx.font = prop.dayHeaderFont;
	ctx.fillStyle = prop.titleColor;
	ctx.textAlign = "center";
	for (dy=1; dy <= prop.dayQty; dy++) {
		ctx.fillText(
			prop.weekArray[dy-1],
			prop.borderSpace + (dy-1) * prop.dayOffset + prop.dayWidth / 2,
			canvas.height * 35 / 500
		);
	}
	ctx.textBaseline = former_baseline;
	// TitleBox Underline
	titleUnderline();
	// LOGO
	ctx.drawImage(
		prop.logo,
		prop.borderSpace,
		canvas.height * 0.808,
		prop.width7 * 0.08,
		prop.width7 * 0.08
	);
	// TITLE
	drawTitle();
	// DAILY PROPERTIES
	for (dy=1; dy <= prop.dayQty; dy++) {
		// SKY
		ctx.drawImage(
			prop[`day${dy}`].sky,
			prop.borderSpace + (dy-1) * prop.dayOffset,
			canvas.height * 0.1082,
			prop.dayWidth,
			prop.dayWidth
		);
		// DESC
		ctx.drawImage(
			prop[`day${dy}`].desc,
			prop.borderSpace + (dy-1) * prop.dayOffset,
			canvas.height * 0.382486,
			prop.dayWidth,
			canvas.height * 0.0576
		);
		// PRCP
		if (prop[`day${dy}`].desc.src.includes("blank") || prop[`day${dy}`].desc.src.includes("perc")) {
			ctx.fillStyle = "white";
			ctx.font = prop.prcpFont;
			ctx.textAlign = "center";
			ctx.shadowColor = "black";
			ctx.shadowBlur = prop.width7 * 0.003;
			ctx.shadowOffsetX = prop.width7 * 0.002;
			ctx.shadowOffsetY = canvas.height * 0.002;
			ctx.fillText(
				(prop[`day${dy}`].prcp.length > 0) ? prop[`day${dy}`].prcp + "%" : "",
				(prop[`day${dy}`].desc.src.includes("blank")) ? prop.borderSpace + (dy-1) * prop.dayOffset + prop.dayWidth / 2 : prop.borderSpace + (dy-1) * prop.dayOffset + prop.dayWidth / 2 + prop.width7 * 0.036,
				canvas.height * 0.43
			);
			ctx.shadowColor = "rgba(0,0,0,0)";
		}
		// UVI
		if (prop[`day${dy}`].uvi == true) {
			ctx.fillStyle = "white";
			ctx.font = prop.uviFont;
			// shadow settings
			ctx.shadowColor = "black";
			ctx.shadowBlur = prop.width7 * 0.003;
			ctx.shadowOffsetX = prop.width7 * 0.002;
			ctx.shadowOffsetY = canvas.height * 0.002;
			ctx.textAlign = "center";
			// UVI: uvi_level
			ctx.fillText(
				"UVI: " + prop[`day${dy}`].uvi_level + ((prop[`day${dy}`].uvi_level == 11) ? "+": ""),
				prop.width7 * 0.073571 + (dy-1) * prop.dayOffset,
				canvas.height * 0.475
			)
			// uvi Level Indicator
			ctx.font = prop.uviMarkerFont;
			ctx.textAlign = "left";
			ctx.fillText(
				"Δ",
				draw_uvi_x(dy),
				canvas.height * 0.53
			)
			ctx.shadowColor = "rgba(0,0,0,0)";
			// uvi Image
			ctx.drawImage(
				prop.uvi,
				prop.borderSpace + (dy-1) * prop.dayOffset,
				canvas.height * 0.485,
				prop.dayWidth,
				prop.dayWidth / 13.44
			)
		}
		// WIND
		if (prop[`day${dy}`].wind == true) {
			// console.log(
				// `prop[day${dy}].wdir =`,
				// prop[`day${dy}`].wdir,
				// `prop[day${dy}].wspd =`,
				// prop[`day${dy}`].wspd
			// );
			ctx.drawImage(
				prop.wind,
				prop.borderSpace + (dy-1) * prop.dayOffset + prop.dayWidth * 0.06,
				(prop[`day${dy}`].uvi == true) ? canvas.height * 0.533 : canvas.height * 0.488,
				prop.width7 * 0.04,
				prop.width7 * 0.03
			);
			ctx.fillStyle = "rgb(230, 230, 230)";
			ctx.font = prop.windFont;
			ctx.textAlign = "center";
			ctx.shadowColor = "black";
			ctx.shadowBlur = prop.width7 * 0.003;
			ctx.shadowOffsetX = prop.width7 * 0.002;
			ctx.shadowOffsetY = canvas.height * 0.002;
			ctx.textAlign = "left";
			ctx.fillText(
				((prop[`day${dy}`].wdir == "") ? "" : prop[`day${dy}`].wdir) + ((prop[`day${dy}`].wspd == "") ? "" : " " + prop[`day${dy}`].wspd),
				prop.borderSpace + (dy-1) * prop.dayOffset + prop.dayWidth * 0.4,
				(prop[`day${dy}`].uvi == true) ? canvas.height * 0.58 : canvas.height * 0.535
			);
			ctx.shadowColor = "rgba(0,0,0,0)";
		}
		//HI
		// shadow settings
		ctx.shadowColor = "black";
		ctx.shadowBlur = prop.width7 * 0.005;
		ctx.shadowOffsetX = prop.width7 * 0.003;
		ctx.shadowOffsetY = canvas.height * 0.003;
		// High Temp - Fill
		ctx.font = prop.hiFont;
		ctx.fillStyle = prop.hiColor;
		ctx.textAlign = "right";
		ctx.fillText(
			prop[`day${dy}`].hi,
			prop.dayWidth + (dy-1) * prop.dayOffset,
			canvas.height * 0.72
		);
		ctx.shadowColor = "rgba(0,0,0,0)";

		//LO
		ctx.font = prop.loFont;
		ctx.fillStyle = prop.loColor;
		ctx.textAlign = "left";
		ctx.fillText(
			prop[`day${dy}`].lo,
			prop.width7 * 0.010 + (dy-1) * prop.dayOffset,
			canvas.height * 0.775
		);
	}
	
}

function chg_title_mode(newmode) {
	let namediv = document.getElementById("nameentrydiv");
	let citydiv = document.getElementById("cityentrydiv");
	let customdiv = document.getElementById("customtitlediv");
	prop.titleMode = newmode;
	// CUSTOM MODE
	if (prop.titleMode == "custom") {
		namediv.style.display = "none";
		citydiv.style.display = "none";
		customdiv.style.display = "block";
	}
	// STANDARD MODE
	else if (prop.titleMode == "both") {
		namediv.style.display = "block";
		citydiv.style.display = "block";
		customdiv.style.display = "none";
	}
	// EXCLUDE CITY
	else if (prop.titleMode == "name") {
		namediv.style.display = "block";
		citydiv.style.display = "none";
		customdiv.style.display = "none";
	}
	// EXCLUDE NAME
	else if (prop.titleMode == "city") {
		namediv.style.display = "none";
		citydiv.style.display = "block";
		customdiv.style.display = "none";
	}
	draw();
}

function drawTitle_FUTUREMETHOD() {
	let title;
	let name = document.getElementById("nameentry").value;
	let city = document.getElementById("cityentry").value;
	if (name.length == 0) {name = "<NAME>";}
	if (city.length == 0) {city = "<CITY>";}
	// Standard
	if (prop.titleMode == "both") {
		title = prop.lang_packs[prop.language].title;
	}
	// Exclude City
	else if (prop.titleMode == "name") {
		title = prop.lang_packs[prop.language].title_exclude_city;
	}
	// Exclude Name
	else if (prop.titleMode == "city") {
		title = prop.lang_packs[prop.language].title_exclude_name;
	}
	// CUSTOM
	else if (prop.titleMode == "custom") {
		title = document.getElementById("customentry").value;
		if (title.length == 0) {
			title = "<CUSTOM TEXT>";
		}
	}
	// Replace Name
	title = title.replace("#NAME", name);
	// Replace City
	title = title.replace("#CITY", city);
	// Replace forecast day qty
	title = title.replace("#QTY", prop.dayQty);
	titlesvg.innerText = title;
	

	// source for idea: https://pqina.nl/blog/wrap-text-with-html-canvas/

	imgtitle.src = "data:image/svg+xml," + encodeURIComponent(
		titlecont.outerHTML
			.replace(/[\t\n]/g, "")
	);
	// console.log(imgtitle.src);
	ctx.drawImage(
		imgtitle,
		0, 0,
		prop.width7 * 0.095,
		(prop.dayQty == 7) ? canvas.height * 0.915 : canvas.height * 0.91
	);
}

function drawTitle() {
	let title;
	let name = document.getElementById("nameentry").value;
	let city = document.getElementById("cityentry").value;
	if (name.length == 0) {name = "<NAME>";}
	if (city.length == 0) {city = "<CITY>";}
	// Standard
	if (prop.titleMode == "both") {
		title = prop.lang_packs[prop.language].title;
	}
	// Exclude City
	else if (prop.titleMode == "name") {
		title = prop.lang_packs[prop.language].title_exclude_city;
	}
	// Exclude Name
	else if (prop.titleMode == "city") {
		title = prop.lang_packs[prop.language].title_exclude_name;
	}
	// CUSTOM
	else if (prop.titleMode == "custom") {
		title = document.getElementById("customentry").value;
		if (title.length == 0) {
			title = "<CUSTOM TEXT>";
		}
	}
	
	// Replace Name
	title = title.replace("#NAME", name);
	// Replace City
	title = title.replace("#CITY", city);
	// Replace forecast day qty
	title = title.replace("#QTY", prop.dayQty);

	// Draw Title
	ctx.fillStyle = "black";
	ctx.textAlign = prop.logo.src.includes("logo_blank.svg") ?
		"center" : "left"
	;

	// find available space available for the title
	let title_available_area = canvas.width - prop.width7 * (
		prop.logo.src.includes("logo_blank.svg") ?
			0.015 :
			0.095
	) - prop.borderSpace;

	// Initial font sizes
	// prop.titleFont factor = canvas.width * 0.028
	// `bold ${canvas.width * 0.028}pt sans-serif`;
	let init_factor;
	// 7 day font
	if (prop.dayQty == 7) {
		init_factor = 31;
	}
	// 5 day font
	else if (prop.dayQty == 5) {
		init_factor = 38;
	}
	// 3 day font
	else {
		init_factor = 55;
	}
	// set initial font size
	ctx.font = `bold ${
		canvas.width * init_factor / 1000
	}pt sans-serif`;

	while (ctx.measureText(title).width > title_available_area) {
		init_factor--;
		ctx.font = `bold ${
			canvas.width * init_factor / 1000
		}pt sans-serif`;
	}

	// make note of the former baseline to move it back after
	// writing title
	let former_baseline = ctx.textBaseline;

	ctx.textBaseline = "middle";
	// mid section of the title part on a 500h canvas would be at 447
	ctx.fillText(
		title,
		// x
		prop.logo.src.includes("logo_blank.svg") ?
			canvas.width / 2 :
			prop.width7 * (
				prop.dayQty != 3 ?
				0.095 : 0.09
			)
		,
		// y
		canvas.height * 447 / 500,
		// maxwidth
		(prop.logo.src.includes("logo_blank.svg") ?
			canvas.width :
			canvas.width - prop.width7 * (
				prop.dayQty != 3 ?
				0.095 : 0.09
			)) - prop.borderSpace
	);
	// reset textBaseline
	ctx.textBaseline = former_baseline;
}

function titleUnderline() {
	let r = parseInt(prop.backgroundColor.slice(1,3), 16);
	let g = parseInt(prop.backgroundColor.slice(3,5), 16);
	let b = parseInt(prop.backgroundColor.slice(5), 16);

	let titleUnderlineColor = `rgb(${parseInt(r/2)}, ${parseInt(g/2)}, ${parseInt(b/2)})`;

	let titleUnderlineColor2 = `rgb(${parseInt(r/2) + 92}, ${parseInt(g/2) + 92}, ${parseInt(b/2) + 92})`;

	// Create Linear Gradient Obj
	let gr = ctx.createLinearGradient(
		0,
		0,
		canvas.width,
		canvas.height
	);
	gr.addColorStop(0, titleUnderlineColor);
	gr.addColorStop(0.5, titleUnderlineColor);
	gr.addColorStop(1, titleUnderlineColor2);
	ctx.fillStyle = gr;
	ctx.fillRect(
		prop.borderSpace - 1,
		canvas.height * 0.97,
		// (prop.dayQty == 7) ? canvas.width * 0.99 : canvas.width * 0.977,
		canvas.width - 2 * prop.borderSpace + 1,
		canvas.height * 0.015
	);
}

function chg_lang(dir) {
	let lang_selection = document.getElementById("lang_selection");
	let lang_keys = Object.keys(prop.lang_packs);
	let curr_dow_i = prop.lang_packs[prop.language].dayNames.indexOf(prop.weekArray[0]);
	// LEFT
	if (dir < 0) {
		if (lang_keys.indexOf(prop.language) == 0) {
			prop.language = lang_keys[lang_keys.length - 1];
		}
		else {
			prop.language = lang_keys[lang_keys.indexOf(prop.language) - 1];
		}
	}
	// RIGHT
	else {
		if (lang_keys.indexOf(prop.language) == lang_keys.length - 1) {
			prop.language = lang_keys[0];
		}
		else {
			prop.language = lang_keys[lang_keys.indexOf(prop.language) + 1];
		}
	}
	// Change to celsius if not US
	if (prop.language != "en" && prop.tempUnits != "C") {
		document.getElementById("input-tempC").checked = true;
		prop.tempUnits = "C";
		convert_temps();
	}
	// else if (prop.language == "en" && prop.tempUnits != "F") {
		// document.getElementById("input-tempF").checked = true;
		// prop.tempUnits = "F";
		// convert_temps();
	// }
	// Change the active descriptions
	for (dy=1; dy <= 7; dy++) {
		let SRC = prop[`day${dy}`].desc.src.match(/5day\/.*\.svg/)[0];
		prop[`day${dy}`].desc.src = desc[desc.indexOf(SRC)].replace(/\/\w\w\//, `/${prop.language}/`);
	}
	// Change the description list
	for (i=1; i < desc.length; i++) {
		desc[i] = desc[i].replace(/\/\w\w\//, `/${prop.language}/`);
	}
	chg_day(curr_dow_i);
	lang_selection.src = `5day/lang_${prop.language}.svg`;
	lang_selection.title = prop.lang_packs[prop.language].name;
	// Change Day names in the select box
	let firstday = document.getElementById("firstday");
	for (i=0; i < 7; i++) {
		firstday.options[i].innerHTML = prop.lang_packs[prop.language].dayNames[i];
	}
	
}

function chg_day(fdindex) {
	prop.weekArray = prop.lang_packs[prop.language].dayNames.slice(fdindex).concat(prop.lang_packs[prop.language].dayNames.slice(0, fdindex));

	for (dy=0; dy < 7; dy++) {
		document.getElementById(`d${dy+1}name`).innerHTML = prop.weekArray[dy];
	}
	draw();
}

function load_day_select() {
	populate_options();
	// "en": ["SUN","MON","TUE","WED","THU","FRI","SAT"],
	let z = new Date();		// Get the current time
	// rearrange week array so tmrw is day 1 (index 0)
	// if time is less than 11am, put today's day as the start
	if (z.getHours() <= 10) {
		document.getElementById("firstday").value = z.getDay();
		prop.weekArray = prop.lang_packs[prop.language].dayNames.slice(z.getDay()).concat(prop.lang_packs[prop.language].dayNames.slice(0, z.getDay()));
	}
	else if (z.getDay() == 6) {
		// change the displayed selected value
		document.getElementById("firstday").value = 0;
		prop.weekArray = prop.lang_packs[prop.language].dayNames;
	}
	else {
		// change the displayed selected value
		document.getElementById("firstday").value = z.getDay() + 1;
		prop.weekArray = prop.lang_packs[prop.language].dayNames.slice(z.getDay() + 1).concat(prop.lang_packs[prop.language].dayNames.slice(0, z.getDay() + 1));
	}
	for (dy=0; dy < 7; dy++) {
		try {
			document.getElementById(`d${dy+1}name`).innerHTML = prop.weekArray[dy];
		} catch(e) {console.log(`d${dy+1}name`)}

	}
}

function canvas_click(e) {
	// Canvas top-left coords
	let canvasX0 = canvas.getBoundingClientRect().x;
	let canvasY0 = canvas.getBoundingClientRect().y;
	
	let oldFillStyle = ctx.fillStyle;

	// Canvas-Relative click coords
	// Regular Screens
	if (e.type.includes("touch") == false) {
		var xclick = e.clientX-canvasX0;
		var yclick = e.clientY-canvasY0;
	}
	// TOUCH
	else {
		var xclick = e.touches[0].clientX;
		var yclick = e.touches[0].clientY;
	}

	// Instructive variables to be modified
	var frcst_dow = null;

	draw();
	//if (e.type.includes("touch") || e.type.includes("up")) {console.log(e)};

	// LOGO
	if (yclick >= canvas.height * 0.8) {
		if (xclick <= prop.width7 * 0.08) {
			if (e.type != "mouseup") {
			// Hover
				if (e.type.includes("move")) {
					ctx.fillStyle = prop.highlightOver;
				}
			// Active
				else {
					
					ctx.fillStyle = prop.highlightActive;
				}
				ctx.fillRect(
					prop.borderSpace,
					(yclick < canvas.height * 0.89) ? canvas.height * 0.808 : canvas.height * 0.89,
					prop.width7 * 0.08,
					prop.width7 * 0.04
				);
			}
			// Change
			else {
				chg_logo(
					(yclick < canvas.height * 0.89) ? -1 : 1
				);
			}

		}
		ctx.fillStyle = oldFillStyle;
	}
	// DAY CLICKED
	else {
		// if the click didn't happen on the days of the week
		if (yclick >= canvas.height * 0.11) {
			// Test for interpretation of day
			for (dy=1; dy <= prop.dayQty; dy ++) {
				if (xclick <= dy * prop.dayOffset) {
					frcst_dow = dy; 	// Day found
					// SKY CHANGE
					if (yclick < canvas.height * 0.38) {
						if (e.type != "mouseup") {
						// Hover
							if (e.type.includes("move")) {
								ctx.fillStyle = prop.highlightOver;
							}
						// Active
							else {
								ctx.fillStyle = prop.highlightActive;
							}

							ctx.fillRect(
								prop.borderSpace + (dy-1) * prop.dayOffset,
								(yclick < canvas.height * 0.25) ? canvas.height * 0.11 : canvas.height * 0.25,
								prop.dayOffset - prop.borderSpace,
								canvas.height * 0.25 - canvas.height * 0.11
							);
						}
						// Change
						else {
							chg_imagery(
								"sky",
								dy,
								(yclick < canvas.height * 0.25) ? -1 : 1
							);
						}
					}
					// DESC CHANGE
					else if (yclick < canvas.height * 0.45) {
						if (e.type != "mouseup") {
						// Hover
							if (e.type.includes("move")) {
								ctx.fillStyle = prop.highlightOver;
							}
						// Active
							else {
								ctx.fillStyle = prop.highlightActive;
							}
							ctx.fillRect(
								(xclick < dy * prop.dayOffset - prop.dayOffset/2) ? prop.borderSpace + (dy-1) * prop.dayOffset : prop.borderSpace + (dy-1) * prop.dayOffset + prop.dayOffset/2,
								canvas.height * 0.38,
								prop.dayOffset/2 - prop.borderSpace,
								canvas.height * 0.45 - canvas.height * 0.38
							);
						}
						// Change
						else if (e.type == "mouseup") {
							chg_imagery(
								"desc",
								dy,
								(xclick < dy * prop.dayOffset - prop.dayOffset/2) ? -1 : 1
							);
						}

					}
					// UVI CHANGE
					else if (yclick > canvas.height * 0.485 && yclick <= canvas.height * 0.53) {
						if (prop[`day${dy}`].uvi == true) {
							if (e.type != "mouseup") {
							// Hover
								if (e.type.includes("move")) {
									ctx.fillStyle = prop.highlightOver;
								}
							// Active
								else {
									ctx.fillStyle = prop.highlightActive;
								}
								ctx.fillRect(
									get_uvi_over_x(dy, xclick),
									canvas.height * 0.51,
									prop.uviWidth,
									canvas.height * 0.025
								);
							}
							// Change
							else {
								chg_uvi(dy, xclick);
							}
						}
					}
					ctx.fillStyle = oldFillStyle;
					break;
				}
			}
		}

	}
	
}

function get_uvi_over_x(dy, xover) {
	// starting edge of each day block -> (dy-1) * prop.dayOffset + prop.borderSpace
	let bounds = [
		(dy-1) * prop.dayOffset + prop.borderSpace,
		(dy-1) * prop.dayOffset + prop.borderSpace + prop.dayWidth
	];
	var xticks = [];
	for (x=0; x < 11; x++) {
		xticks.push(
			[prop.uviOffset + bounds[0] + x * prop.uviWidth,
			prop.uviOffset + bounds[0] + (x+1) * prop.uviWidth]
		)
	}
	for (segment=0; segment < xticks.length; segment++) {
		if (xover >= xticks[segment][0] && xover < xticks[segment][1]) {
			return xticks[segment][0];
			break;
		}
	}
}

function chg_uvi(dy, xclick) {
	let bounds = [
		(dy-1) * prop.dayOffset + prop.borderSpace,
		(dy-1) * prop.dayOffset + prop.borderSpace + prop.dayWidth
	];
	var xticks = [];
	for (x=0; x < 11; x++) {
		xticks.push(
			[prop.uviOffset + bounds[0] + x * prop.uviWidth,
			prop.uviOffset + bounds[0] + (x+1) * prop.uviWidth]
		)
	}
	for (segment=0; segment < xticks.length; segment++) {
		if (xclick >= xticks[segment][0] && xclick < xticks[segment][1]) {
			prop[`day${dy}`].uvi_level = segment+1;
			
			break;
		}
	}
	draw();
}

function draw_uvi_x(dy) {
	let bounds = [
		(dy-1) * prop.dayOffset + prop.borderSpace,
		(dy-1) * prop.dayOffset + prop.borderSpace + prop.dayWidth
	];
	return prop.uviOffset + bounds[0] + (prop[`day${dy}`].uvi_level - 1) * prop.uviWidth
}

function chg_uvi_vis(dy) {
	let uvitoggle = document.getElementById(`uvitoggle${dy}`);
	// Turning On
	if (uvitoggle.className.includes("activated") == false) {
		uvitoggle.className += " activated";
		prop[`day${dy}`].uvi = true;
		uvitoggle.innerText = "ON";
	}
	// Turning Off
	else {
		uvitoggle.className = uvitoggle.className.replace(" activated", "");
		prop[`day${dy}`].uvi = false;
		uvitoggle.innerText = "OFF";
	}
	draw();
}

function chg_wind_vis(dy) {
	let windtoggle = document.getElementById(`windtoggle${dy}`);
	// Turning On
	if (windtoggle.className.includes("activated") == false) {
		windtoggle.className += " activated";
		windtoggle.innerText = "ON";
		prop[`day${dy}`].wind = true;
		document.getElementById(`wind${dy}desc`).style.display = "block";
	}
	// Turning Off
	else {
		windtoggle.className = windtoggle.className.replace(" activated", "");
		windtoggle.innerText = "OFF";
		prop[`day${dy}`].wind = false;
		document.getElementById(`wind${dy}desc`).style.display = "none";
	}
	draw();

}

function chg_wind(ele) {
	let welement = ele;
	let dy = parseInt(welement.id.slice(4,5));
	// Direction Change
	if (welement.id.includes("select")) {
		prop[`day${dy}`].wdir = welement.value;
	}
	// Speed Change
	else if (welement.id.includes("speed")) {
		prop[`day${dy}`].wspd = welement.value.slice(0,2);
		welement.value = welement.value.slice(0,2); 	// Limits the quantity of characters
	}
	
	draw();
}

function chg_temp(el) {
	let tempel = el;
	let which = (tempel.id.includes("tmax")) ? "hi" : "lo";
	let dy = parseInt(el.id[el.id.length-1]);
	if (tempel.value.length == 0) {
		prop[`day${dy}`][which] = "--";
	}
	else {
		prop[`day${dy}`][which] = tempel.value.slice(0, 3);
		tempel.value = tempel.value.slice(0, 3);
	}
	draw();
}

function get_daynum(currentdate = null) {
	// Get the date; determine the day number out of 365 (x)
	let monthdays = {};
	let days31 = [1, 3, 5, 7, 8, 10, 12];
	let days30 = [4, 6, 9, 11];
	for (m = 1; m <= 12; m++) {
		if (m == 2) {
			monthdays[m] = 28;
		}
		else if (days31.includes(m)) {
			monthdays[m] = 31;
		}
		else {
			monthdays[m] = 30;
		}
	}
	if (currentdate == null) {
		currentdate = new Date();
	}
	let daynum = 0;
	for (m = 1; m <= currentdate.getMonth() + 1; m++) { 
		if (m != currentdate.getMonth() + 1) {
			daynum += monthdays[m];
		}
		else {
			daynum += currentdate.getDate();
		}
	}
	return daynum;
}

function convert_temps() {
	// This function typically won't be called unless a change has occurred in the tempUnits
	for (dy=1; dy<=7; dy++) {
		// `temp${prop.tempUnits}to${(prop.tempUnits != "F") ? "F" : "C"}`
		prop[`day${dy}`].hi = window[
			(prop.tempUnits == "F") ? "tempCtoF" : "tempFtoC"
		](prop[`day${dy}`].hi);
		prop[`day${dy}`].lo = window[
			(prop.tempUnits == "F") ? "tempCtoF" : "tempFtoC"
		](prop[`day${dy}`].lo);
	}
	draw();
}

function skycast(_lo, _hi) {
            // "5day/sky_sun.svg",
			// "5day/sky_sun_smile.svg",
			// "5day/sky_sun_mostly.svg",
			// "5day/sky_partly.svg",
			// "5day/sky_cloudy_mostly.svg",
			// "5day/sky_cloudy.svg",
			// "5day/sky_partly_rain.svg",
			// "5day/sky_cloudy_mostly_rain.svg",
			// "5day/sky_cloudy_rain.svg",
			// "5day/sky_cloudy_rain_catsdogs.svg",
			// "5day/sky_partly_tstorm.svg",
			// "5day/sky_partly_tstorm_only.svg",
			// "5day/sky_cloudy_mostly_tstorm.svg",
			// "5day/sky_cloudy_mostly_tstorm_only.svg",
			// "5day/sky_cloudy_tstorm.svg",
			// "5day/sky_cloudy_tstorm_only.svg",
			// "5day/sky_hurricane.svg",
			// "5day/sky_partly_snow.svg",
			// "5day/sky_cloudy_mostly_snow.svg",
			// "5day/sky_cloudy_snow.svg",
			// "5day/sky_cloudy_snow2.svg",
			// "5day/sky_partly_snowrain.svg",
			// "5day/sky_cloudy_mostly_snowrain.svg",
			// "5day/sky_cloudy_snowrain.svg",
			// "5day/sky_partly_wintrymix.svg",
			// "5day/sky_cloudy_mostly_wintrymix.svg",
			// "5day/sky_cloudy_wintrymix.svg",
			// "5day/sky_partly_wintrymix2.svg",
			// "5day/sky_cloudy_mostly_wintrymix2.svg",
			// "5day/sky_cloudy_wintrymix2.svg",

	// base it off of fahrenheit (for just this function)
	let lo = (prop.tempUnits == "F") ? _lo : tempCtoF(_lo);
	let hi = (prop.tempUnits == "F") ? _hi : tempCtoF(_hi);
	// 'dewpoint depression'
	let dd = hi - lo;

	let prcp;
	let skycon;
	let chance;

	function chance_of(humidity) {
		return 1000 / (0.1 * humidity ** 1.8 + 10) - 10;
	}

	// COLD
	if (hi <= 36) {
		if (dd <= 5) {
			chance = RANDOM_NUM(1,100);
			skycon = (chance >= 40) ? "cloudy" :
				     (chance >= 30) ? "cloudy_mostly" :
				     (chance >= 10) ? "partly" : RANDOM_ARG("sun", "sun_mostly");
			chance = RANDOM_NUM(1,100);
			prcp = (["cloudy", "cloudy_mostly", "partly"].includes(skycon)) ? ((chance >= 30) ? RANDOM_ARG("snow", "snowrain", "wintrymix", "wintrymix2") : "") : "";
		}
		else if (dd <= 15) {
			chance = RANDOM_NUM(1,100);
			skycon = (chance >= 90) ? "cloudy" :
					 (chance >= 80) ? "cloudy_mostly" :
					 (chance >= 40) ? "partly" : RANDOM_ARG("sun", "sun_mostly");
			chance = RANDOM_NUM(1,100);
			prcp = (["cloudy", "cloudy_mostly", "partly"].includes(skycon)) ?
				(chance >= 70) ? RANDOM_ARG("snow", "snowrain", "wintrymix", "wintrymix2") : "" : "";
		}
		else {
			skycon = RANDOM_ARG("partly", "sun", "sun_mostly");
			prcp = "";
		}
	}
	else if (hi <= 65) {
		if (dd <= 5) {
			chance = RANDOM_NUM(1,100);
			skycon = (chance >= 30) ? "cloudy" :
				     (chance >= 5) ? "cloudy_mostly" : "partly";
			chance = RANDOM_NUM(1,100);
			prcp = (chance >= 20) ? "rain" :
				(chance >= 10) ? "tstorm" : "";
		}
		else if (dd <= 15) {
			chance = RANDOM_NUM(1,100);
			skycon = (chance >= 90) ? "cloudy" :
				     (chance >= 70) ? "cloudy_mostly" :
					 (chance >= 40) ? "partly" : RANDOM_ARG("sun", "sun_mostly");
			chance = RANDOM_NUM(1,100);
			prcp = (["partly", "cloudy_mostly"].includes(skycon)) ? (chance >= 70) ? "rain" : (chance >= 95) ? "tstorm" : "" : "";
		}
		else {
			skycon = RANDOM_ARG("partly", "cloudy_mostly", "sun", "sun_mostly");
			chance = RANDOM_NUM(1,100);
			prcp = (["partly", "cloudy_mostly"].includes(skycon)) ? 
				(chance > 90) ? "rain" : "" : "";
		}
	}
	else {
		if (dd <= 5) {
			chance = RANDOM_NUM(1,100);
			skycon = (chance >= 30) ? RANDOM_ARG("cloudy", "cloudy_mostly") : "partly";
			chance = RANDOM_NUM(1,100);
			prcp = (chance >= 40) ? "rain" :
				(chance >= 10) ? "tstorm" : "";
		}
		else if (dd <= 15) {
			chance = RANDOM_NUM(1,100);
			skycon = (chance >= 90) ? "cloudy" :
				     (chance >= 70) ? "cloudy_mostly" :
					 (chance >= 40) ? "partly" : RANDOM_ARG("sun", "sun_mostly");
			chance = RANDOM_NUM(1,100);
			prcp = (["partly", "cloudy_mostly"].includes(skycon)) ? (chance >= 30) ? "rain" : "tstorm" : "";
		}
		else {
			chance = RANDOM_NUM(1,100);
			skycon = (chance >= 50) ? RANDOM_ARG("cloudy", "cloudy_mostly", "partly") : RANDOM_ARG("sun", "sun_mostly");
			chance = RANDOM_NUM(1,100);
			prcp = (["cloudy", "cloudy_mostly", "partly"].includes(skycon)) ? (chance >= 50) ? RANDOM_ARG("rain", "tstorm", "tstorm_only") : "" : "";
		}
	}
	return `5day/sky_${skycon}${(prcp != '') ? "_" : ""}${prcp}.svg`;
}

function random_forecast() {
	// NH Temperate:
	//		Highs: 21 * math.sin(x / 58 + 1.45 * math.pi) + 67
	//		Lows: 20 * math.sin(x / 58 + 1.45 * math.pi) + 45
	// SH Temperate:
	//		Highs: 21 * math.sin(x / 58 + 0.52 * math.pi) + 67
	//		Lows: 20 * math.sin(x / 58 + 0.52 * math.pi) + 45
	let daynum = get_daynum(); 	// The x value
	// Variance Control for the random values
	let varhi = 5 + Math.floor(Math.random() * ((15 + 1) - 5));
	let varlo = 5 + Math.floor(Math.random() * ((10 + 1) - 5));
	let avghi;
	let avglo;
	// Hemisphere Based Averages in Fahrenheit as functions of the day number
	// Northern Hemisphere (tmax ~ july)
	if (prop.hemisphere == "N") {
		avghi = Math.round(21 * Math.sin(daynum / 58 + 1.45 * Math.PI) + 67);
		avglo = Math.round(20 * Math.sin(daynum / 58 + 1.45 * Math.PI) + 45);
	}
	// Southern Hemisphere (tmax ~ jan/dec)
	else {
		avghi = Math.round(21 * Math.sin(daynum / 58 + 0.52 * Math.PI) + 67);
		avglo = Math.round(20 * Math.sin(daynum / 58 + 0.52 * Math.PI) + 45);
	}
	// go ahead and convert to Celcius if needed
	if (prop.tempUnits == "C") {
		avghi = tempFtoC(avghi);
		avglo = tempFtoC(avglo);
	}

	for (dy=1; dy <= 7; dy++) {
		prop[`day${dy}`].hi = (avghi - varhi) + Math.floor(Math.random() * (((avghi + varhi) + 1) - (avghi - varhi)));

		while (true) {
			prop[`day${dy}`].lo = (avglo - varlo) + Math.floor(Math.random() * (((avglo + varlo) + 1) - (avglo - varlo)));
			if (
				(dy == 1 && prop[`day${dy}`].lo < prop[`day${dy}`].hi) ||
				(dy >= 2 && prop[`day${dy}`].lo < prop[`day${dy}`].hi
				&& prop[`day${dy}`].lo < prop[`day${dy-1}`].hi)
			) {
				document.getElementById(`tmax${dy}`).value = prop[`day${dy}`].hi;
				document.getElementById(`tmin${dy}`).value = prop[`day${dy}`].lo;
				break;
			}
		}
		prop[`day${dy}`].sky.src = skycast(prop[`day${dy}`].lo, prop[`day${dy}`].hi);
		
	}
	draw();
}

function tempFtoC(tempF) {
	return Math.ceil((tempF - 32) * 5 / 9);
}

function tempCtoF(tempC) {
	return Math.floor(9 / 5 * tempC + 32);
}

function dewpoint_depression(temp, dewp) {
	return temp - dewp;
}

function is_freezing(temp) {
	if ((prop.tempUnits == "C" && temp <= 0) || (prop.tempUnits == "F" && temp <= 32)) {
		return true;
	}
	else {
		return false;
	}
}

function supports_snow(temp) {
	if ((prop.tempUnits == "C" && temp <= 2) || (prop.tempUnits == "F" && temp <= 36)) {
		return true;
	}
	else {
		return false;
	}
}

function support_thunderstorms() {

}

function chg_bg(c=null) {
	prop.backgroundImage.src = document.getElementById("pre-made-bg-select").value;
	if (c) {
		prop.backgroundColor = c;
		let r = parseInt(prop.backgroundColor.slice(1,3), 16);
		let g = parseInt(prop.backgroundColor.slice(3,5), 16);
		let b = parseInt(prop.backgroundColor.slice(5), 16);
		prop.loColor = `rgb(${parseInt(r/4)}, ${parseInt(g/4)}, ${parseInt(b/4)})`;
	}
	draw();
}

function RANDOM_NUM(_min, _max) {
	return _min + Math.floor(Math.random() * (_max+1 - _min));
}

function RANDOM_ARG() {
	return arguments[
		RANDOM_NUM(0, arguments.length - 1)
	];
}

function random_bg_color() {
	// I used Mozilla's CSS color picker tool to help me map out thresholds and
	//     then y=mx+b to figure out the rest. That stuff you learn in math is
	//     beneficial!

	//     000------060------120------180------240------300------360
	//  R  255 ____ 255   >   0        0        0    >  255 ____ 255
	//  G   0   >   255 ____ 255 ____ 255   >   0        0        0
	//  B   0        0        0    >  255 ____ 255 ____ 255   >   0

	let h = RANDOM_NUM(0, 359);
	let s = 100; // in %
	let l = RANDOM_NUM(25, 42); // in %
	// let l = 50; // in %

	let r;
	let g;
	let b;

	if (h <= 120) {
		// h / 120 = x / 255
		// h == 30: h/120 = 0.25 .25 *
		if (h <= 60) {
			r = 255
			g = 255 / 60 * h;
		}
		else {
			r = -255 / 60 * h + 255 / 60 * 120;
			g = 255;
		}
		b = 0;
	}
	else if (h <= 240) {
		if (h <= 180) {
			g = 255;
			b = 255 / 60 * (h - 120);
		}
		else {
			g = -255 / 60 * h + 255 / 60 * 240;
			b = 255;
		}
		r = 0;
	}
	else {
		if (h <= 300) {
			r = 255 / 60 * (h - 240);
			b = 255;
		}
		else {
			r = 255;
			b = -255 / 60 * h + 255 / 60 * 360;
		}
		g = 0;
	}

	r = parseInt(r * l / 50);
	g = parseInt(g * l / 50);
	b = parseInt(b * l / 50);

	// Hex
	let hexr = r.toString(16).padStart(2,"0");
	let hexg = g.toString(16).padStart(2,"0");
	let hexb = b.toString(16).padStart(2,"0");
	document.getElementById("mainbgcolor").value = `#${hexr}${hexg}${hexb}`;
	canvas_portrait.style.backgroundColor = document.getElementById("mainbgcolor").value;
	chg_bg(`#${hexr}${hexg}${hexb}`);
}

function chg_logo(dir) {
	prop.logo.src = logo.at(
		(logo.currentIndex() + dir >= logo.length) ?
			0 :
			logo.currentIndex() + dir
	);
}

async function generate_custom_logo_data() {
	z = new FileReader();
	z.onloadend = () => {
		logo.push(z.result);
		prop.logo.src = logo.at(-1);
	}
	
	new_logo_url = URL.createObjectURL(
		custom_logo.files[0]
	);
	blob = await fetch(new_logo_url)
		.then(r => r.blob())
		.then(b => z.readAsDataURL(b));
}

function unlock_custom_logo_button() {
	if (Boolean(custom_logo.files[0])) {
		btn_custom_logo.disabled = false;
	}
	else {
		btn_custom_logo.disabled = true;
	}
}

function chg_imagery(type, dy, dir) {

	let SRC = prop[`day${dy}`][type].src.match(/5day\/.*\.svg/)[0];
	// Up (or backwards)
	if (dir < 0) {
		// if it's on the first element of the array (index 0)
		if (window[type].indexOf(SRC) == 0) {
			prop[`day${dy}`][type].src = window[type][window[type].length - 1];
		}
		else {
			prop[`day${dy}`][type].src = window[type][window[type].indexOf(SRC) - 1];
		}
	}
	// Dn (or forward)
	else {
		// if it's on the last element of the array
		if (window[type].indexOf(SRC) == window[type].length - 1) {
			prop[`day${dy}`][type].src = window[type][0];
		}
		else {
			prop[`day${dy}`][type].src = window[type][window[type].indexOf(SRC) + 1];
		}
	}

}

function validate_filename(fn) {

	fixedsave = fn.replace(
		/([^A-Z0-9\.\- ])/gi, ""
	);	
	return (fixedsave.length > 0) ?
		(fixedsave + ".png").replace(/\.{2,}/g, ".") : 
		""
	;
}

function delta_save_placeholder() {
	prop.dayImage.removeEventListener("load", delta_save_placeholder);
	clearTimeout(prop.dayImage.timeout);
	prop.dayImage.timeout = setTimeout(delta_save_placeholder, 60 * 1000);

	let z = new Date();
	// Change the autosave name
	savename.placeholder = "fc_generated_" + `${
		prop.dayQty
	}day_${
		z.getFullYear()
	}-${
		(z.getMonth() + 1).toString().padStart(2, "0")
	}-${
		(z.getDate()).toString().padStart(2,"0")
	}-${
		(z.getHours()).toString().padStart(2,"0")
	}${
		(z.getMinutes()).toString().padStart(2,"0")
	}_${
		savesize.value.split("x").at(-1)
	}p`;
}

function saveimg() {
	savename.fallbackPlaceholder = "fc_generated.png";

	let save = validate_filename(savename.value);
	save = (save.length > 0) ?
		save :
		savename.placeholder
	;
	// fallback placeholder if save length is still 0
	if (save.length == 0) {save = savename.fallbackPlaceholder}

	let orig_w7 = prop.width7;

	// Switch to image Canvas
	canvas = document.getElementById("forecast_img");
	ctx = canvas.getContext("2d");

	// Change dimensions
	[canvas.width, canvas.height] = savesize.value.split("x");

	prop.width7 = canvas.width * 1000 / prop.dayImage.naturalWidth;

	reparameterize();

	document.getElementById("saveimg").download = save;

	document.getElementById("saveimg").href = canvas.toDataURL("image/png");

	// Switch back to original Canvas
	canvas = document.getElementById("forecast");
	ctx = canvas.getContext("2d");
	prop.width7 = orig_w7;
	resize();
}

function respond(e) {
	e.preventDefault();
	// Canvas top-left coords
	let canvasX0 = canvas.getBoundingClientRect().x;
	let canvasY0 = canvas.getBoundingClientRect().y;

	// Canvas-Relative click coords
	let xclick = e.clientX-canvasX0;
	let yclick = e.clientY-canvasY0;
	//console.log(e);
	console.log(`
	canvas.width * ${(xclick / canvas.width).toFixed(3)}, canvas.height * ${(yclick / canvas.height).toFixed(3)}`);
	let oldStrokeStyle = ctx.strokeStyle;
	let oldFillStyle = ctx.FillStyle;
	let oldTextAlign = ctx.textAlign;
	let oldFont = ctx.font;
	ctx.font = `normal ${canvas.width * 0.01}pt sans-serif`;
	ctx.textAlign = "left";
	ctx.strokeStyle = "red";
	ctx.fillStyle = "red";
	// VERTICAL LINE
	ctx.beginPath();
	ctx.moveTo(xclick, 0);
	ctx.lineTo(xclick, canvas.height);
	ctx.stroke();
	// HORIZONTAL LINE
	ctx.beginPath();
	ctx.moveTo(0, yclick);
	ctx.lineTo(canvas.width, yclick);
	ctx.stroke();
	// Text
	ctx.fillText(
		`x  canvas.width * ${(xclick / canvas.width).toFixed(3)}`,
		xclick - 9,
		yclick - 2
	);
	ctx.fillText(
		`y  canvas.height * ${(yclick / canvas.height).toFixed(3)}`,
		xclick - 9,
		yclick + 13
	);
	// Change back to old style
	ctx.strokeStyle = oldStrokeStyle;
	ctx.fillStyle = oldFillStyle;
	ctx.textAlign = oldTextAlign;
	ctx.font = oldFont;

	
}






















