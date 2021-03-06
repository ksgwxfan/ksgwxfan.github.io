var desc = ["5day/desc_blank.svg",
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

var sky = [ "5day/sky_sun_clr.svg",
			"5day/sky_sun_clr_smile.svg",
			"5day/sky_sun_mostly.svg",
			"5day/sky_sun_partly.svg",
			"5day/sky_cloudy_mostly.svg",
			"5day/sky_cloudy_overcast.svg",
			"5day/sky_cloudy_rain_partly_sunny.svg",
			"5day/sky_cloudy_rain_mostlycloudy.svg",
			"5day/sky_cloudy_rain.svg",
			"5day/sky_cloudy_rain_catsdogs.svg",
			"5day/sky_cloudy_partly_sunny_tstorm.svg",
			"5day/sky_cloudy_mostly_sunny_tstorm.svg",
			"5day/sky_cloudy_tstorm.svg",
			"5day/sky_cloudy_partly_sunny_tstorm_only.svg",
			"5day/sky_cloudy_mostly_sunny_tstorm_only.svg",
			"5day/sky_cloudy_tstorm_only.svg",
			"5day/sky_hurricane.svg",
			"5day/sky_cloudy_snow.svg",
			"5day/sky_cloudy_snow2.svg",
			"5day/sky_cloudy_snra.svg",
			"5day/sky_cloudy_wintrymix2.svg",
			"5day/sky_cloudy_wintrymix.svg"];

var logo = [
	"5day/logo_echotops.svg",
	"5day/logo_channel99.svg",
	"5day/logo_wxbonanza.svg",
	"5day/logo_weather01.svg",
	"5day/logo_weather02.svg",
	"5day/logo_weather03.svg",
	"5day/logo_weather04.svg"
];

var canvas = document.getElementById("forecast");
var ctx = canvas.getContext("2d");


function EventListeners() {}
// Dynamic Window Resize
window.addEventListener("orientationchange", resize);

// Canvas Event Listener
canvas.addEventListener(
	"contextmenu",
	event => respond(event)
);
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
	}
	prop[`day${dy}`].sky.src = "5day/sky_sun_clr.svg";
	prop[`day${dy}`].sky.onload = draw;
	prop[`day${dy}`].desc.src = "5day/desc_blank.svg";
	prop[`day${dy}`].desc.onload = draw;
}

// Set day
load_day_select();


// Set global image sources
prop.dayImage.src = "5day/TEMPLATE_7day.svg";
prop.logo.src = "5day/logo_echotops.svg";
prop.uvi.src = "5day/uvi.svg";

// Due to image objects being loaded async
// Don't resize until image is loaded

// preload global imagery & other listeners
prop.logo.onload = draw;
prop.uvi.onload = draw;
prop.dayImage.onload = resize;


function forecastDayQty(n) {
	prop.dayQty = parseInt(n);
	// Because of onload (i think it acts as a listener), it runs resize autom.
	prop.dayImage.src = `5day/TEMPLATE_${prop.dayQty}day.svg`;
	// Show / Hide options for applicable days
	if (prop.dayQty == 7) {
		document.getElementById("day6").style.display = "flex";
		document.getElementById("day7").style.display = "flex";
	}
	else {
		document.getElementById("day6").style.display = "none";
		document.getElementById("day7").style.display = "none";
	}
}

function resize() {
	let numdays = document.getElementById("numdays");
	// console.log(innerWidth, innerHeight, document.documentElement.clientWidth, document.documentElement.clientHeight, document.documentElement.offsetWidth, document.documentElement.offsetHeight);
	largest = Math.max(
		document.documentElement.clientWidth,
		document.documentElement.clientHeight
	);
	smallest = Math.min(
		document.documentElement.clientWidth,
		document.documentElement.clientHeight
	);
	// console.log(largest, smallest);
	// 7 Days
	if (prop.dayQty == 7) {
		//LANDSCAPE
		if ("orientation" in window == false || Math.abs(window.orientation) == 90) {
			// console.log("landscape");
			canvas.width = largest-20;
			canvas.height = canvas.width / 2;
		}
		// PORTRAIT
		else {
			// console.log("portrait");
			canvas.width = smallest-20;
			canvas.height = canvas.width / 2;
		}
		
		prop.width7 = canvas.width;
	}
	// 5 Days
	else {
		//LANDSCAPE
		if ("orientation" in window == false || Math.abs(window.orientation) == 90) {
			canvas.width = (largest-20) * 0.715715;
			canvas.height = canvas.width * 0.6986;
			prop.width7 = (largest-20);
		}
		// PORTRAIT
		else {
			canvas.width = (smallest-20) * 0.715715;
			canvas.height = canvas.width * 0.6986;
			prop.width7 = (smallest-20);
		}
	}

	reparameterize();
}

function reparameterize() {
	// px = (3/4)*pt
	// pt = (4/3)*px
	// the above conversions don't work for the canvas!
	prop.dayHeaderFont = (prop.dayQty == 7) ? `bold ${canvas.width * 0.032}pt sans-serif` : `bold ${canvas.width * 0.04}pt sans-serif`;
	// 7 Day Title Font
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
	//console.log("draw() called");
	//ctx.clearRect(0, 0, prop.width7, canvas.height); //clear
	// Handle Phones in Portrait Mode
	if (canvas.width < 500) {
		// console.log("asdf");
		ctx.clearRect(0, 0, prop.width7, canvas.height);
		ctx.fillStyle = prop.backgroundColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.textAlign = "center";
		ctx.font = "bold 30px sans-serif";
		ctx.strokeStyle = "black";
		ctx.lineWidth = 3;
		ctx.strokeText(
			"Please Use in",
			canvas.width / 2,
			canvas.height / 2 - 20
		);
		ctx.strokeText(
			"Landscape Mode",
			canvas.width / 2,
			canvas.height / 2 + 20
		);
		ctx.fillStyle = "white";
		ctx.fillText(
			"Please Use in",
			canvas.width / 2,
			canvas.height / 2 - 20
		);
		ctx.fillText(
			"Landscape Mode",
			canvas.width / 2,
			canvas.height / 2 + 20
		);
		return null;
	}
	// BACKGROUND
	ctx.fillStyle = prop.backgroundColor;
	ctx.fillRect(0, 0, prop.width7, canvas.height);
	// TEMPLATE
	ctx.drawImage(
		prop.dayImage,
		0, 0,
		canvas.width,
		canvas.height
	);
	// DAY NAMES
	ctx.font = prop.dayHeaderFont;
	ctx.fillStyle = prop.titleColor;
	ctx.textAlign = "center";
	for (dy=1; dy <= prop.dayQty; dy++) {
		ctx.fillText(
			prop.weekArray[dy-1],
			prop.borderSpace + (dy-1) * prop.dayOffset + prop.dayWidth / 2,
			(prop.dayQty == 7) ? canvas.height * 0.0946 : canvas.height * 0.091
		);
	}
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
		// Disable EchoTops logo for custom mode
		if (prop.logo.src.includes("echotops")) {
			prop.logo.src = logo[1];
		}
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

function drawTitle() {
	let name = document.getElementById("nameentry").value;
	let city = document.getElementById("cityentry").value;
	if (name.length == 0) {name = "<NAME>";}
	if (city.length == 0) {city = "<CITY>";}
	// Standard
	if (prop.titleMode == "both") {
		var title = prop.lang_packs[prop.language].title;
	}
	// Exclude City
	else if (prop.titleMode == "name") {
		var title = prop.lang_packs[prop.language].title_exclude_city;
	}
	// Exclude Name
	else if (prop.titleMode == "city") {
		var title = prop.lang_packs[prop.language].title_exclude_name;
	}
	// CUSTOM
	else if (prop.titleMode == "custom") {
		var title = document.getElementById("customentry").value;
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
	if (title.length < 45) {
		ctx.font = prop.titleFont;
	}
	else if (title.length < 55) {
		ctx.font = (prop.dayQty == 7) ? `bold ${canvas.width * 0.025}pt sans-serif` : `bold ${canvas.width * 0.024}pt sans-serif`;
	}
	else {
		ctx.font = (prop.dayQty == 7) ? `bold ${canvas.width * 0.022}pt sans-serif` : `bold ${canvas.width * 0.021}pt sans-serif`;
	}
	ctx.textAlign = "left";
	ctx.fillText(
		title,
		prop.width7 * 0.095,
		(prop.dayQty == 7) ? canvas.height * 0.915 : canvas.height * 0.91
	);
}

function titleUnderline() {
	//console.log(prop.backgroundColor);
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
		prop.borderSpace,
		canvas.height * 0.97,
		(prop.dayQty == 7) ? canvas.width * 0.99 : canvas.width * 0.987,
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
		document.getElementById("tempC").checked = true;
		prop.tempUnits = "C";
		convert();
	}
	// else if (prop.language == "en" && prop.tempUnits != "F") {
		// document.getElementById("tempF").checked = true;
		// prop.tempUnits = "F";
		// convert();
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
	//console.log(prop.language);
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

	//console.log(prop.weekArray);
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
	// if tmrw is Sunday (index 0)

	if (z.getDay() == 6) {
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

	// Change the autosave name
	document.getElementById("savename").placeholder = "fc_generated_" + `${z.getFullYear()}-${ZFILL(z.getMonth() + 1)}-${z.getDate()}`;
}

function canvas_click(e) {
	//console.log(e);

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
				//console.log((yclick < canvas.height * 0.89) ? "up":"down");
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
		//console.log(xticks[segment]);
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
		//console.log(`Day ${dy} UVI OFF`)
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
		//console.log(`Day ${dy} wind OFF`)
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

function convert() {
	// This function will NOT be called unless a change has occurred in the tempUnits
	for (dy=1; dy<=7; dy++) {
		// Convert to Fahrenheit
		if (prop.tempUnits == "F") {
			prop[`day${dy}`].hi = Math.floor(9 / 5 * prop[`day${dy}`].hi + 32);
			prop[`day${dy}`].lo = Math.floor(9 / 5 * prop[`day${dy}`].lo + 32);
		}
		// Convert to Celsius
		else if (prop.tempUnits == "C") {
			prop[`day${dy}`].hi = Math.ceil((prop[`day${dy}`].hi - 32) * 5 / 9);
			prop[`day${dy}`].lo = Math.ceil((prop[`day${dy}`].lo - 32) * 5 / 9);
		}
	}
	draw();
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
	// Hemisphere Based Averages as functions of the day number
	// Northern Hemisphere (tmax ~ july)
	if (prop.hemisphere == "N") {
		var avghi = Math.round(21 * Math.sin(daynum / 58 + 1.45 * Math.PI) + 67);
		var avglo = Math.round(20 * Math.sin(daynum / 58 + 1.45 * Math.PI) + 45);
	}
	// Southern Hemisphere (tmax ~ jan/dec)
	else {
		var avghi = Math.round(21 * Math.sin(daynum / 58 + 0.52 * Math.PI) + 67);
		var avglo = Math.round(20 * Math.sin(daynum / 58 + 0.52 * Math.PI) + 45);
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
				break;
			}
		}
	}

	// Changing the canvas itself
	for (dy=1; dy <= 7; dy++) {
		// Celsius Conversion
		if (prop.tempUnits == "C") {
			prop[`day${dy}`].hi = Math.ceil((prop[`day${dy}`].hi - 32) * 5 / 9);
			prop[`day${dy}`].lo = Math.ceil((prop[`day${dy}`].lo - 32) * 5 / 9);
		}
		document.getElementById(`tmax${dy}`).value = prop[`day${dy}`].hi;
		document.getElementById(`tmin${dy}`).value = prop[`day${dy}`].lo;
	}

	draw();
}

function ZFILL(n, targetlength=2) {
	let nstr = n.toString();
	while (nstr.length < targetlength) {
		nstr = "0" + nstr;
		if (nstr.length >= targetlength) {break;}
	}
	return nstr
}

function chg_bg(c) {
	prop.backgroundColor = c;
	let r = parseInt(prop.backgroundColor.slice(1,3), 16);
	let g = parseInt(prop.backgroundColor.slice(3,5), 16);
	let b = parseInt(prop.backgroundColor.slice(5), 16);
	prop.loColor = `rgb(${parseInt(r/4)}, ${parseInt(g/4)}, ${parseInt(b/4)})`;
	draw();
}

function random_bg_color() {

	var r = 20 + Math.floor(Math.random() * ((192 + 1) - 20));
	if (r > 128) {
		var g = 20 + Math.floor(Math.random() * ((64 + 1) - 20));
	}
	else {
		var g = 20 + Math.floor(Math.random() * ((192 + 1) - 20));
	}
	if (g > 128) {
		var b = 20 + Math.floor(Math.random() * ((64 + 1) - 20));
	}
	else {
		var b = 20 + Math.floor(Math.random() * ((192 + 1) - 20));
	}

	// Hex
	let hexr = ZFILL(r.toString(16));
	let hexg = ZFILL(g.toString(16));
	let hexb = ZFILL(b.toString(16));
	document.getElementById("mainbgcolor").value = `#${hexr}${hexg}${hexb}`;
	chg_bg(`#${hexr}${hexg}${hexb}`);
}


function chg_logo(dir) {
	let SRC = prop.logo.src.match(/5day\/\w+\.svg/)[0];
	// UP
	if (dir < 0) {
		if (logo.indexOf(SRC) == 0) {
			prop.logo.src = logo[logo.length-1];
		}
		else {
			prop.logo.src = logo[logo.indexOf(SRC) - 1];
		}
		// Disable EchoTops logo for custom mode
		if (prop.logo.src.includes("echotops") && prop.titleMode == "custom") {
			prop.logo.src = logo[logo.length - 1];
		}
	}
	// DOWN
	else {
		if (logo.indexOf(SRC) == logo.length - 1) {
			prop.logo.src = logo[0];
		}
		else {
			prop.logo.src = logo[logo.indexOf(SRC) + 1];
		}
		// Disable EchoTops logo for custom mode
		if (prop.logo.src.includes("echotops") && prop.titleMode == "custom") {
			prop.logo.src = logo[1];
		}
	}
}

function chg_imagery(type, dy, dir) {
	//console.log(type, dy, dir);
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
	//console.log(prop[`day${dy}`][type].src);
}

function validate_filename(fn) {

	fixedsave = fn.replace(/([^\w^\.])|^\./g,"").replace(/(\.\.)|(\.$)/g, "");
	return (fixedsave.length > 0) ? fixedsave + ".png" : "";
}

function saveimg() {
	var savename = document.getElementById("savename");

	var save = validate_filename(savename.value);
	var save = (save.length > 0) ? save : savename.placeholder;

	var dims = document.getElementById("savesize").value;
	let orig_w7 = prop.width7;

	// Switch to image Canvas
	canvas = document.getElementById("forecast_img");
	ctx = canvas.getContext("2d");

	// Change dimensions
	canvas.height = parseInt(dims.split("x")[1]);
	canvas.width = (prop.dayQty == 7) ? parseInt(dims.split("x")[0]) : canvas.height * 1.43143;

	prop.width7 = parseInt(dims.split("x")[0]);
	//redefine();
	reparameterize();

	document.getElementById("saveimg").download = save;
	//console.log(document.getElementById("saveimg"));
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






















