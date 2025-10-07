var footer = document.getElementById("footer");
let _vis = "hidden";

// [tag, label, attr]
let links = [
	{"tag": "a", "label": "HOME",
	 "attr": {"href": "index.html"}},
	// {"tag": "a", "label": "iR&#233;sume",
	// "attr": {"href": "iresume/iresume.html"}},
	{"tag": "a", "label": "Digital Portfolio",
	"attr": {"href": "iresume/digiport.html"}},
	{"tag": "a", "label": "Contact (GitHub Login Required)",
	"attr": {"href": "https://github.com/ksgwxfan/ksgwxfan.github.io/issues"}},
	{"tag": "span", "label": "<u>Contact (email)</u>",
	"attr": {"title": "Click to reveal email",
			    "id": "c_email",
		   "onClick": "toggle_email()"}},
	{"tag": "a", "label": "Echo Tops Weather Blog",
	"attr": {"href": "https://echotops.blogspot.com/"}}
];

function createLink(tag, label, attrs, last=false) {
	element = document.createElement(tag);
	element.innerHTML = label;
	for (attr in attrs) {
		element.setAttribute(attr, attrs[attr]);
	};
	footer.appendChild(element);
	footer.innerHTML += "<span class='footer-bullet'> &bull; </span>";
}

// Build Links
for (link of links) {
	createLink(
		link.tag,
		link.label,
		link.attr
	);
}

function toggle_email() {

	let pre1 = "Kyle";
	let pre3 = "Gentry";
	let pre2 = "S";
	let pre5 = ".com";
	let pre4 = "@outlook";
	let emailid = document.getElementById("c_email");

	if (_vis == "hidden") {
		_vis = "show";
		let email_addy = pre1 + pre2 + pre3 + pre4 + pre5;
		emailid.innerHTML = [
			"<a href='mailto:",
			email_addy.toLowerCase(),
			"'>",
			email_addy,
			"</a>"
		].join("");
		emailid.title = "";
	}
}

function nothing_to_see_here_01() {
	let parts = [
		"rd",
		"oa",
		"db",
		"un",
		"so",
		"s_",
		"tt",
	];
	document.getElementById("hidden-a-01").href = parts.slice().reverse().join("");
	document.getElementById("hidden-a-01").innerText = parts.slice().reverse().join("");
	document.getElementById("hidden-span-01").innerText = parts.slice().reverse().join("");
	document.getElementById("hidden-01").style.display = "block";
}
try {
	document.getElementById("activate-hidden-01").onclick = nothing_to_see_here_01;
} catch (err) {console.log(err);}















