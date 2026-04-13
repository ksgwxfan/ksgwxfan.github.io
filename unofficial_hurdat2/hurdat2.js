let hd2 = {
	basin: "atl",
	year: 2025,
};

let basin_switch = document.getElementById("basin-switch");

let tab_cont = document.getElementById("tab-container");
let page_current = document.getElementById("page-current");
let page_stats = document.getElementById("page-season-stats");
let page_hd2changes = document.getElementById("page-hurdat2-changes");

let box_season_stats = document.getElementById("season-stats");

function change_tab(clicked_tab) {
	let newpage_id = clicked_tab.id.replace("tab-", "page-");
	let newele = document.getElementById(newpage_id);

	// change bg colors back to neutral
	for (let _tab of document.querySelectorAll(".notebook-tab")) {
		// removes the inline style (according to AI)
		_tab.style.backgroundColor = "";
	}
	// hide each page element
	for (let _ele of [page_current, page_stats, page_hd2changes]) {
		_ele.style.display = "none";
	}

	// change bg and reveal clicked page
	clicked_tab.style.backgroundColor = "darkslategrey";
	newele.style.display = "block";
	
	
}

function load_data() {
	// return null;
	// LOAD HURDAT2 DATA FROM FILES
	for (let _basin of ["atl", "pac"]) {
		// HD2 data
		fetch(`unofficial_hurdat2/current_hurdat2_${_basin}.dat`)
			.then(resp => resp.text())
			.then(txt => {
				if (txt.length > 0) {
					document.getElementById(`current-season-${_basin}`).innerText = txt;
					document.getElementById(`download-${_basin}`).style.display = "inline";
				}
				else {
					document.getElementById(`current-season-${_basin}`).innerText =
					"* NO TROPICAL CYCLONE DATA TO SHOW AT THIS TIME *";
				}
			});
		// HD2 changes
		fetch(`unofficial_hurdat2/hd2_changes_${_basin}.dat`)
			.then(resp => resp.text())
			.then(txt => {
				if (txt.length > 0) {
					document.getElementById(`hd2-changes-${_basin}`).innerText = txt;
				}
			});
	}

	// LOAD CURRENT SEASON DATA FROM FILE
	load_season_stats(hd2.year);
}

function load_basin(new_basin) {
	if (new_basin != hd2.basin) {
		// Hide previous basin data
		document.getElementById(`current-season-${hd2.basin}`).style.display = "none";
		document.getElementById(`hd2-changes-${hd2.basin}`).style.display = "none";

		// Change and display new basin
		hd2.basin = new_basin;
		document.getElementById(`current-season-${hd2.basin}`).style.display = "inline";

		// Load season stats
		load_season_stats(hd2.year);

		// load basin-specific hd2 changes
		document.getElementById(`hd2-changes-${hd2.basin}`).style.display = "inline";
	}
}

function load_season_stats(yr) {
	hd2.year = yr;
	fetch(
		`unofficial_hurdat2/season_stats_${yr}_${hd2.basin}.dat`
	).then(resp => resp.text())
	.then(txt => {
		box_season_stats.innerText = txt;
	});
}














