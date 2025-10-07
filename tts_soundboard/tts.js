let soundboard = document.getElementById("container-soundboard");
let voicequeue = [];
// let languages = new Set();
let languages = new Map();
languages.set("all", []);
let voice_master = document.getElementById("voice-master");
let pitch_master = document.getElementById("pitch-master");
let speed_master = document.getElementById("speed-master");
let lang_select = document.getElementById("lang-select");
let pause_play = document.getElementById("pause");
//used for rearranging
var drag = {
	start : null,
	end : null,
};
let default_phrases = [
	"Your tow truck drove my van off the road. I wanna know who was drivin' it.",
	"I'm on a real short leash here!",
	"Testing 1 2 3",
	"Four-Score and Twenty Years ago",
	"in 1492, Columbus sailed the ocean blue",
	"The dish ran away with the spoon.",
	"Everybody to the Limit.",
	"Testing 1 2 3",
	"Four-Score and Twenty Years ago",
	"in 1492, Columbus sailed the ocean blue",
	"Boot Scoot and Boogy",
	"The dish ran away with the spoon.",
	"Everybody to the Limit.",
	"What do you get when you email StrongBad? You get a world of hurt!",
  "Banana-powered space hamster says hello",
  "Toast with tiny sunglasses waves politely",
  "Dancing pickle negotiates nap time treaties",
  "Marshmallow mayor declares pajama day tomorrow",
  "Whispering tacos sing lullabies to moonbeams",
  "Sock puppet attends important broccoli meeting",
  "Glittery penguin offers you a paper hat",
  "Moonlight tea party for very polite slugs",
  "Cactus in a cardigan writes friendly postcards",
  "Squirrel in slippers solves gentle mysteries",
  "Flying pancakes deliver enthusiastic compliment packages",
  "Cloud with a moustache politely tips its hat",
  "Sneezing cupcakes apologize in three languages",
  "Elevator for ants hosts tiny talent shows",
  "Wobbly jellyboard invites everyone to slow dance",
  "Piano-playing llama wears a shiny bow tie",
  "Cheerful umbrella hums while waiting for rain",
  "Moonbeam borrows your favorite cozy blanket",
  "Whispering bookshelf tells bedtime stories slowly",
  "Skateboarding llama opens a lemonade stand nearby",
  "Polite dinosaur offers you a tiny cookie",
  "Curious teapot explores the neighbor’s garden gently",
  "Rainbow socks solve interstellar knitting disputes calmly",
  "Gentle robot waters imaginary houseplants every morning",
  "Paper boat organizes synchronized puddle races weekly",
  "Pancake astronaut plants syrup flags on moon",
  "Friendly ghost leaves sticky-note compliments everywhere",
  "Melting snowman composes cheerful farewell letters",
  "Toasted marshmallow sends a postcard from campfire",
  "Cloud librarian files giggles under the letter G",
  "Disco snail wears glittery roller skates proudly",
  "Cheeseburger choir practices harmony at dawn",
  "Balloon detective follows invisible trails of giggles",
  "Polka-dot whale joins the neighborhood parade quietly",
  "Time-traveling sandwich forgets lunch plans politely",
  "Pocket watch whispers gentle jokes at noon",
  "Sleepy comet asks the stars for a pillow",
  "Juggling tomato performs at the produce theater",
  "Stardust cat naps on improvised constellations",
  "Friendly broom offers complimentary hallway tidy-ups",
  "Button-eyed teddy hosts afternoon tea rituals",
  "Humming teacup solves tiny algebra problems thoughtfully",
  "Pancake mayor signs nap-time proclamations ceremoniously",
  "Bicycle with daisies pedals toward sunset politely",
  "Melodic mailbox delivers smiles every Tuesday morning",
  "Sunbeam receptionist schedules naps with cheerful efficiency",
  "Wistful sandwich writes poetry about the mustard",
  "Glitter snail leaves polite shimmering trails behind",
  "Accordion cloud plays gentle background music softly",
  "Smiling doorbell practices cheerful greetings daily",
  "Hopscotch moon invites jittery fireflies to play",
  "Tea kettle confesses it enjoys dramatic pauses",
  "Polite raccoon returns lost socks with notes",
  "Tiny submarine hosts tea parties for goldfish",
  "Button collection forms a tiny orchestral choir",
  "Whistling kettle dances on the stove politely",
  "Magnetic socks prefer walking on the refrigerator",
  "Sunflower librarian recommends books with fragrant bookmarks",
  "Skating teapot performs pirouettes at the rink",
  "Friendly dinosaur tutors clouds in gentle arithmetic",
  "Paper airplane delivers thoughtful weekend weather reports",
  "Cloud shaped like a cupcake drifts by slowly",
  "Mischievous spoon writes secret recipes in invisible ink",
  "Porcupine in a vest composes polite postcards",
  "Kite with pockets carries tiny forgotten wishes",
  "Knitted moonbeam mends lost dreams with thread",
  "Polite ghost waters the phantom garden every morning",
  "Singing mailbox hums arrival songs for all letters",
  "Mild-mannered dragon prefers tea over roaring contests",
  "Pajama-wearing raccoon organizes midnight snack symphonies",
  "Tiny mountain holds very serious pebble conferences",
  "Marzipan mouse opens a cozy bakery of smiles",
  "Buttoned-up cloud files weather reports in triplicate",
  "Whispering river carries lullabies to downstream towns",
  "Gentle giant reads comics to the neighborhood daisies",
  "Pocket-sized librarian stamps books with tiny stars",
  "Polite moon tiptoes so it does not wake people",
  "Sofa with slippers offers comfortable storytelling sessions",
  "Friendly owl tutors garden snails in polite reading",
  "Coconut bicycle rolls through the park singing softly",
  "Maple tree hosts evenings of polite shadow puppetry",
  "Rabbit barber gives tidy haircuts to dandelions",
  "Creaky bookshelf giggles when someone asks for riddles",
  "Marble moonlight plays hopscotch with sleepy shadows",
  "Singing sandwich hands out kindly written recipes",
  "Cozy hat whispers helpful hints about chilly days",
  "Friendly compass always points toward warm cookie shops",
  "Polite thunder knocks before the rain arrives",
  "Lemonade cloud offers free smiles on hot days",
  "Puddle mirror shows hopeful reflections and goofy faces",
  "Tiny lighthouse winks at passing paper boats",
  "Origami fox folds secret maps to hidden picnics",
  "Gentle toaster composes optimistic greeting cards each morning",
  "Silent violin practices polite bows between melodies",
  "Feathered mailbox naps under a pile of postcards",
  "Button moth stitches tiny quilts for weary stars",
];
let used_phrase_numbers = [];
let phraseblocks = [];

speechSynthesis.onvoiceschanged = build;

function build() {
	for (let i=0; i < 5; i++) {
		add_phrase();
	}
	speechSynthesis.onvoiceschanged = null;
	build_languages();
	reset_speech_params();
}

function reset_speech_params() {
	// needed for page reloads and returns
	speechSynthesis.cancel();	// clears any remaining queue
	speechSynthesis.resume();	// just in case it was stuck on paused
	// ^^^ for some reason it can get stuck on paused even between page loads and not read properly
}

// separates language just by language, ignoring country
function build_languages() {
	let lname;
	let vlist;

	// builds master list of voices (has language codes built-in)
	for (let voice of speechSynthesis.getVoices()) {
		let key = voice.lang.slice(0,2);
		if (!languages.has(key)) {
			languages.set(key, []);
		}
		languages.get("all").push(voice);
		languages.get(key).push(voice);
	}
	// build html select language input
	for ([lname, vlist] of languages.entries()) {
		// console.log(lname, typeof lname);

		// create a drop-down menu option for the language
		let lang_opt = document.createElement("option");
		// console.log(lname);
		lang_opt.setAttribute("value", lname);
		// define visible names
		if (lname != "all") {
			lang_opt.innerText = codes_languages[lname];
		}
		else {
			lang_opt.innerText = "* All Languages *";
		}

		lang_select.appendChild(lang_opt);
		if (lname == "en-US") {
			lang_select.selectedIndex = lang_select.length - 1;
		}
	}
	change_language();
}

// separates languages by language and country
function build_languages_ORIG() {
	let lname;
	let vlist;

	for (let voice of speechSynthesis.getVoices()) {
		// console.log(voice);
		if (!languages.has(voice.lang)) {
			languages.set(voice.lang, []);
		}
		languages.get("all").push(voice);
		languages.get(voice.lang).push(voice);
	}

	// build html select language input
	for ([lname, vlist] of languages.entries()) {
		// console.log(lname, typeof lname);

		// create a drop-down menu option for the language
		let lang_opt = document.createElement("option");
		lang_opt.setAttribute("value", lname);
		// define visible names
		if (lname != "all") {
			lang_opt.innerText = `${
					codes_languages[lname.split("-")[0]]
				} - ${
					codes_countries[lname.split("-")[1]]
			}`;
		}
		else {
			lang_opt.innerText = "* All Languages *";
		}

		lang_select.appendChild(lang_opt);
		if (lname == "en-US") {
			lang_select.selectedIndex = lang_select.length - 1;
		}
	}
	change_language();
}

function change_language() {
	// console.log("changing to", lang_select.value);
	voice_master.innerHTML = "";

	for (let [indx, voice] of languages.get(lang_select.value).entries()) {
		// let dialect = voice.lang.slice(-2);
		// console.log(indx, voice);
		let opt = document.createElement("option");
		opt.innerText = `${voice.lang} - ` + voice.name;
		opt.value = voice.name;
		opt.dataset.index = indx;
		voice_master.add(opt);
	}
}

function change_language_orig() {
	let vlists = document.querySelectorAll(".voice-list");
	console.log("changing to", lang_select.value);

	for (let li of vlists) {
		// clear the list of prior voice options
		li.innerHTML = "";

		// repopulate
		for (let voice of languages.get(lang_select.value)) {
			let opt = document.createElement("option");
			opt.innerText = voice.name;
			opt.value = voice.name;
			li.add(opt);
		}
		li.selectedIndex = RANDOM_NUM(0, languages.get(lang_select.value).length - 1);
		li.setAttribute("list", lang_select.value);
	}

}

function add_phrase(spoken_word=null) {
	if (!spoken_word) {
		spoken_word = RANDOM_ARG(default_phrases);
	}
	// Phrase container
	let phrase_container = document.createElement("div");
	phrase_container.setAttribute("class", "container-phrase");

	// generate and assign phrase number
	let phrase_num;
	do {
		phrase_num = RANDOM_NUM(0, 999999);
	} while (used_phrase_numbers.includes(phrase_num));
	used_phrase_numbers.push(phrase_num);

	phrase_container.dataset.phraseNum = phrase_num.toString();

	// Add Text Box
	let text_box = document.createElement("div");
	text_box.setAttribute("id", `phrase-${phrase_num}`);
	text_box.dataset.phraseNum = phrase_num.toString();
	text_box.setAttribute("class", "phrase");
	text_box.setAttribute("title", "Click/Tap to edit text");
	text_box.contentEditable = true;
	text_box.innerText = spoken_word;

	phrase_container.appendChild(text_box);

	// individual phrase controls
	let box_voice_play = document.createElement("div");
	box_voice_play.setAttribute("class", "box-voice-play");

	phrase_container.appendChild(box_voice_play);

	// Play button
	let play_btn = document.createElement("button");
	play_btn.setAttribute("id", `play-${phrase_num}`);
	play_btn.dataset.phraseNum = phrase_num.toString();
	play_btn.setAttribute("class", `play-button`);
	play_btn.setAttribute("title", `Play`);
	play_btn.setAttribute("onclick", "play_voice(this.dataset.phraseNum)");
	play_btn.innerHTML = "&rtrif;";

	box_voice_play.appendChild(play_btn);

	// Add a close button
	let closer = document.createElement("div");
	closer.setAttribute("id", `close-${phrase_num}`);
	closer.setAttribute("class", "close-phrase");
	closer.setAttribute("title", "Click to delete this phrase");
	closer.setAttribute("onclick", "soundboard.removeChild(this.parentNode);");
	closer.textContent = "\u2716";
	phrase_container.appendChild(closer);

	// Add phrase container to the page
	// soundboard.appendChild(phrase_container);
	soundboard.prepend(phrase_container);
}

function add_phrase_orig(spoken_word=null) {

	if (!spoken_word) {
		spoken_word = RANDOM_ARG(default_phrases);
	}
	// Phrase container
	let phrase_container = document.createElement("div");
	phrase_container.setAttribute("class", "container-phrase");
	// phrase_container.setAttribute("draggable", true);
	phrase_container.ondragstart = zxcv => {
		console.log(event);
		console.log(event.target.phrase_num, event.toElement.phrase_num);
	};
	phrase_container.ondragenter = zxcv =>  {
		console.log(event);
		console.log(event.target.phrase_num, event.toElement.phrase_num);
	};

	// generate phrase number
	var phrase_num;
	do {
		phrase_num = RANDOM_NUM(0, 999999);
		if (used_phrase_numbers.includes(phrase_num) == false) {
			used_phrase_numbers.push(phrase_num);
		}
	} while (used_phrase_numbers.includes(phrase_num) == false);
	used_phrase_numbers.push(phrase_num);
	phrase_container.phrase_num = phrase_num
	phrase_container.setAttribute("id", `container-${phrase_num}`);

	// Add Text Box
	let text_box = document.createElement("div");
	text_box.setAttribute("id", `phrase-${phrase_num}`);
	text_box.num = phrase_num;
	text_box.setAttribute("class", "phrase");
	text_box.setAttribute("title", "Click/Tap to edit text");
	text_box.contentEditable = true;
	text_box.innerText = spoken_word;

	phrase_container.appendChild(text_box);

	// voice and play container
	let box_voice_play = document.createElement("div");
	box_voice_play.setAttribute("class", "box-voice-play");

	// voice select
	let voice_sel = document.createElement("select");
	voice_sel.setAttribute("id", `voice-${phrase_num}`);
	voice_sel.setAttribute("class", "voice-list");
	// populate if ready
	try {
		for (let voice of languages.get(lang_select.value)) {
			let opt = document.createElement("option");
			opt.innerText = voice.name;
			opt.value = voice.name;
			voice_sel.add(opt);
		}
		voice_sel.selectedIndex = RANDOM_NUM(
			0,
			languages.get(lang_select.value).length - 1
		);
		voice_sel.setAttribute("list", lang_select.value);
	} catch {};

	let play_btn = document.createElement("button");
	play_btn.setAttribute("id", `play-${phrase_num}`);
	play_btn.setAttribute("class", `play-button`);
	play_btn.setAttribute("title", `Play`);
	play_btn.setAttribute("onclick", "play_voice(this.id)");
	play_btn.innerHTML = "&rtrif;";

	box_voice_play.appendChild(voice_sel);
	box_voice_play.appendChild(play_btn);

	phrase_container.appendChild(box_voice_play);

	// PITCH and SPEED
	let box_modify = document.createElement("div");
	box_modify.setAttribute("class", "box-modify-sound");

	let label_pitch = document.createElement("label");
	label_pitch.innerHTML = `Pitch: <input id="pitch-${phrase_num}" type="range" min="0" max="2" step="0.25" value="1" />`;
	let label_speed = document.createElement("label");
	label_speed.innerHTML = `Speed: <input id="speed-${phrase_num}" type="range" min="0.1" max="2.1" step="0.25" value="1.1" />`;

	box_modify.appendChild(label_pitch);
	box_modify.appendChild(label_speed);

	// Add a close button
	let closer = document.createElement("div");
	closer.setAttribute("id", `close-${phrase_num}`);
	closer.setAttribute("class", "close-phrase");
	closer.setAttribute("title", "Click to delete this phrase");
	closer.setAttribute("onclick", "soundboard.removeChild(this.parentNode);");
	closer.innerText = "X";
	phrase_container.appendChild(closer);

	phrase_container.appendChild(box_modify);

	soundboard.appendChild(phrase_container);	
}



function play_voice(pnum) {
	let utter = new SpeechSynthesisUtterance(
		document.getElementById(`phrase-${pnum}`).innerText
	);
	utter.voice = languages.get(lang_select.value)[
		voice_master.selectedIndex
	];

	utter.pitch = pitch_master.value;
	utter.rate = speed_master.value;

	utter.onend = voicequeue.shift;

	voicequeue.push(utter);
	speechSynthesis.speak(utter);
}

function play_voice_orig(id) {
	let phrase_num = /\d+/.exec(id);
	// What the text-to-speech button will say
	let utter = new SpeechSynthesisUtterance(
		document.getElementById(`phrase-${phrase_num}`).innerText
	);
	utter.voice = languages.get(lang_select.value)[
		document.getElementById(`voice-${phrase_num}`).selectedIndex
	];
	utter.pitch = document.getElementById(`pitch-${phrase_num}`).value;
	utter.rate = document.getElementById(`speed-${phrase_num}`).value;

	utter.onend = remove_the_utterance => {
		voicequeue.shift();
		console.log(voicequeue);
	};

	voicequeue.push(utter);
	speechSynthesis.speak(utter);
}

function play_all() {
	for (let phrase of document.querySelectorAll(".phrase")) {
		play_voice(phrase.dataset.phraseNum);
	}
}

function pause_resume() {
	if (pause_play.dataset.currentState == "ready") {
		pause_play.dataset.currentState = "paused";
		speechSynthesis.pause();
		pause_play.innerHTML = pause_play.dataset.play;
	}
	else if (pause_play.dataset.currentState == "paused") {
		pause_play.dataset.currentState = "ready";
		speechSynthesis.resume();
		pause_play.innerHTML = pause_play.dataset.pause;
	}
}

function stop_current() {
	voicequeue.shift();
	speechSynthesis.cancel();
	for (let utterance of voicequeue) {
		speechSynthesis.speak(utterance);
	}
}

function stop_all() {
	voicequeue = [];
	speechSynthesis.cancel();
}

function RANDOM_NUM(_min, _max) {
	return _min + Math.floor(Math.random() * (_max+1 - _min));
}

function RANDOM_ARG() {
	return arguments[0][
		RANDOM_NUM(0, arguments[0].length - 1)
	];
}

function ZFILL(n, targetlength=2) {
	let nstr = n.toString();
	while (nstr.length < targetlength) {
		nstr = "0" + nstr;
		if (nstr.length >= targetlength) {break;}
	}
	return nstr
}