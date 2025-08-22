const _version = 1.02;

let call_buffer_time = document.getElementById("call-buffer-input");
let _optbar = document.getElementById("option-bar");
let _optexpand = document.getElementById("button-expand");
let _optcollapse = document.getElementById("button-collapse");

let _optnewgame= document.getElementById("button-newgame");
let _optrestore= document.getElementById("button-restore");
let _button_full = document.getElementById("button-fs");

// expand/collapse button listeners
_optexpand.addEventListener(
	"click",
	zxcv => {
		_optexpand.style.display = "none";
		_optbar.style.display = "flex";
	}
);
_optcollapse.addEventListener(
	"click",
	zxcv => {
		_optbar.style.display = "none";
		_optexpand.style.display = "inline-block";
	}
);

// new game button
_optnewgame.onclick = new_game;
_optrestore.onclick = restore_last_game;
_button_full.onclick = try_fullScreen;
document.getElementById("kbd-c").onclick = new_call;

const bingo = {
	min : 1,
	max : 75,
	possibilities : [],
	called : [],
	callready : true,
	calltimer : null,
	restore_calls : 3,
}
// let the doc show how many calls are allowed before restore is disabled
document.getElementById("restore-calls").innerText = bingo.restore_calls;

let _categories = [
	"Meals On Wheels",
	"Line Dance",
	"Painting ",
	"Congregate Meals",
	"Quilting",
	"Yoga",
	"Health Screenings",
	"Quarter Bingo",
	"Garden Workshops",
	"VITA",
	"Health Fairs",
	"Insurance Counseling",
	"Fitness & Health Promotion",
	"Disaster Preparedness",
	"Durable Equipment",

	"Senior Games",
	"Bowling",
	"Tai Chi",
	"Writers' Group",
	"Weight Watchers",
	"Book Club",
	"Crafts",
	"Shag",
	"Knitting/Crocheting Group",
	"Plays",
	"Concerts",
	"Nutrition Class",
	"Safety Class",
	"BP Checks",
	"Prize Bingo",

	"Sing Alongs",
	"Dances",
	"Chair Volleyball",
	"Quilting ",
	"Volunteer Opps",
	"Rook",
	"Farmers Market Vouchers",
	"Senior Tar Heel Card",
	"Puzzles",
	"Support Groups",
	"Chair Exercise",
	"Birthday Celebrations",
	"Cornhole",
	"Trivia",
	"Coloring",

	"Flexercise",
	"Scam Prevention",
	"Walking To Music",
	"Cardio Drumming",
	"Senior Suppers",
	"Senior Chorus",
	"Card Games",
	"Crime Prevention",
	"Trivia Bingo",
	"Community Garden",
	"Meals On Wheels",
	"Prayer Shawl Ministry",
	"Scrapbooking",
	"Special Events",
	"Games",

	"Housing Assistance",
	"Legal Services",
	"Reverse Mortgage Counseling",
	"Home Health\nServices",
	"In Home Aid Services",
	"Medicaid Benefits",
	"Social Security Benefits",
	"Long-Term Care Facilities",
	"Rehabilitation Services",
	"Respite",
	"Energy Assistance",
	"Food Distribution",
	"Adult Day Care",
	"Mental Health",
	"Hospice Care",
];

//  *************    INITIALIZATION    ***********************
build_board();
rebuild_bingo_possibilities();
document.body.addEventListener("keyup", new_call);

function build_board() {
	// console.log("here");
	let _name = "bingo";
	for (let r=1; r<=15; r++) {
		for (let n=0; n<5; n++) {
			let curr_row = "r" + r;
			let tr = document.getElementById(curr_row);
			let td = document.createElement("td");
			let curr_ltr = _name[n]
			let curr_num = r+n*15;
			let curr_block = `${curr_ltr}-${curr_num}`;

			td.setAttribute("id", curr_block);
			td.setAttribute("class", "bingo-cell");

			let div = document.createElement("div");

			let cell_num = document.createElement("span");
			cell_num.setAttribute("class", "bingo-cell-number");
			cell_num.innerText = curr_num;			

			let cell_cat = document.createElement("span");
			cell_cat.setAttribute("class", "bingo-cell-category");
			cell_cat.innerText = "  " + _categories[curr_num-1];


			div.appendChild(cell_num);
			div.appendChild(cell_cat);
			td.appendChild(div);
			tr.appendChild(td);
		}
	}
	if (localStorage.getItem("bingoyv.lastGame")) {
		_optrestore.disabled = false;
	}
}

// Test to see if localStorage is available
// if not available...create a placeholding variable
if (!"localStorage" in window) {
	class STRG {
		constructor() {}

		setItem(k, v) {
			this[k] = v;
		}

		getItem(k) {
			return this[k];
		}

		clear() {

		}

		removeItem(i) {

		}
	}
	localStorage = new STRG();
	// const localStorage = {};
}

function rebuild_bingo_possibilities() {

	bingo.called = [];
	bingo.possibilities = [];
	for (n=1; n <= 75; n++) {
		let letter = (n >= 1 && n <= 15) ? "b" :
			(n >= 16 && n <= 30) ? "i" :
			(n >= 31 && n <= 45) ? "n" :
			(n >= 46 && n <= 60) ? "g" : "o";
		bingo.possibilities.push(`${letter}-${n}`);
	}

}

function try_fullScreen() {
	// Go Full Screen
	if (! Boolean(parseInt(_button_full.dataset.full))) {
		document.body.requestFullscreen({"navigationUI": "hide"})
		.then(
			blah => {
				_button_full.dataset.full = "1";
				console.log("success! :: enter fullscreen");
			}
		)
		.catch(err => {
			console.log("entering of fullscreen mode failed!");
			throw err;
		});
	}
	// Exit Full Screen
	else {
		document.exitFullscreen()
		.then(blah => {
			_button_full.dataset.full = "0";
			console.log("success! :: exit of fullScreen");
		})
		.catch(err => {
			console.log("exiting of fullscreen mode failed!");
			throw err;
		});
	}
}

function call_protect(seconds=1) {
	if (Boolean(seconds)) {
		bingo.callready = false;
		bingo.calltimer = setTimeout(
			re_enable => {bingo.callready = true},
			seconds * 1000
		);
	}
}

function new_call(ev=null, testspace=null) {
	// ----------------------------------------------------------
	// Initiate a new call
	// 
	// @param {null} ev - the event that triggered this method
	// @param {null} testspace - optional string to pass to test
	//						     specific placement
	// ---------------------------------------------------------- 

	// clear/reset/re-write ls if a new game has 3+ calls
	if (bingo.called.length > bingo.restore_calls) {
		localStorage.removeItem("bingoyv.lastGame");
		localStorage.setItem("bingoyv.lastGame", bingo.called.toString());
		_optrestore.disabled = true;
	}
	else {
		
	}

	let r;
	// console.log(ev);
	// Make a new call
	if (
		bingo.possibilities.length > 0
		&& (testspace || ev)
		&& Boolean(bingo.callready)
	) {
		if (testspace) {
			r = bingo.possibilities.indexOf(testspace);
		}
		else if (
			["KeyC", "PageUp", "PageDown"].includes(ev.code) ||
			ev.target.id == "kbd-c"
		) {
			// console.log(MIN + Math.floor(Math.random() * (MAX-MIN+1)));
			r = Math.floor(Math.random() * bingo.possibilities.length);
		}
		else {
			return null;
		}

		// Remove current status from currently called
		try {
			document.getElementById(bingo.called[0]).classList.remove("current");
		} catch(err) {};

		// add newly-called number to the list
		bingo.called.unshift(bingo.possibilities[r]);

		// add to ls conditionally
		if (bingo.called.length > bingo.restore_calls) {
			localStorage.setItem("bingoyv.lastGame", bingo.called.toString());
		}

		// change the class of the newly called
		document.getElementById(bingo.called[0]).classList.add("chosen", "current");

		// temporarily disable ability to make a new call (unless restoring game)
		if (! testspace) {
			call_protect(
				parseInt(call_buffer_time.value)
			);
		}

		// narrow possibilities array
		bingo.possibilities = bingo.possibilities.filter(
			sp => sp != bingo.possibilities[r]
		);

		if (bingo.called.length != 0) {
			_optnewgame.disabled = false;
		}
		
	}
	else {

	}

}

function new_game() {
	// clear formatting of called items
	for (let _called of document.querySelectorAll(".chosen")) {
		_called.classList.remove("chosen", "current");
	}
	rebuild_bingo_possibilities();
	_optcollapse.click();
	_optnewgame.disabled = true;
	if (Boolean(localStorage.getItem("bingoyv.lastGame"))) {
		_optrestore.disabled = false;
	}
}

function restore_last_game() {
	new_game();
	for (let space of localStorage.getItem("bingoyv.lastGame").split(",").reverse()) {
		new_call(ev=null, testspace=space);
	}
}

function restore_last_game_ORIG() {
	let STEP = 50;    //ms

	if (Boolean(localStorage.getItem("lastGame"))) {
		// as previous game is likely being loaded, disable the button
		newcall_btn.disabled = true;
		appendLog(new Date(), "restore_last_game() called");
		help_dialog.style.display = "none";
		let last_game_calls = localStorage.getItem("lastGame").split(",").reverse();

		// timer to re-enable new-call button
		if (last_game_calls.length < 75) {
			setTimeout(
				re_enable => {newcall_btn.disabled = false},
				STEP * last_game_calls.length
			)
		}

		// iterate and re-highlight called spaces
		for (let [indx, each] of last_game_calls.entries()) {
			setTimeout(
				new_call,
				STEP * indx,
				each
			);
		}
	}
}

