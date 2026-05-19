/* ═══════════════════════════════════════════
   PAGE NAVIGATION
════════════════════════════════════════════ */
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
}

function goToMenu() { showPage("menuPage"); }

/* ═══════════════════════════════════════════
   STATE
════════════════════════════════════════════ */
let currentLanguage  = "";
let currentCategory  = "";
let currentLesson    = "";
let currentMode      = "words";
let progressData     = {};
let learnedWords     = [];
let learnedPhrases   = [];

/* ═══════════════════════════════════════════
   11 CATEGORIES  (icon · title · color)
════════════════════════════════════════════ */
const categories = [
    { key: "Greetings",           icon: "👋", color: "#e040fb" },
    { key: "Core Vocabulary",     icon: "🔤", color: "#00bcd4" },
    { key: "Objects & Numbers",   icon: "🔢", color: "#ff7043" },
    { key: "Family",              icon: "👨‍👩‍👧", color: "#66bb6a" },
    { key: "Food & Drinks",       icon: "🍜", color: "#ffa726" },
    { key: "Time & Calendar",     icon: "🗓️", color: "#26c6da" },
    { key: "Grammar",             icon: "📝", color: "#ab47bc" },
    { key: "Travel",              icon: "✈️", color: "#42a5f5" },
    { key: "School",              icon: "🏫", color: "#ec407a" },
    { key: "Animals",             icon: "🐾", color: "#8d6e63" },
    { key: "Sports",              icon: "⚽", color: "#26a69a" }
];

/* ═══════════════════════════════════════════
   LESSON DATA  (sub-lessons per category)
════════════════════════════════════════════ */
const lessonData = {
    "Greetings": [
        "Meeting People", "Greetings", "Introductions",
        "Farewells", "Polite Phrases", "How Are You?"
    ],
    "Core Vocabulary": [
        "Basic Words", "Please & Thank You", "May I...?",
        "I Need...", "At The Store", "Asking For Help"
    ],
    "Objects & Numbers": [
        "Valuables", "Everyday Objects", "Devices",
        "Numbers 1–10", "Numbers 11–100", "Counting Things"
    ],
    "Family": [
        "Parents & Children", "Family & Pets", "Grandparents",
        "Family & Friends", "Relatives", "My Family"
    ],
    "Food & Drinks": [
        "Fruit", "Drinks", "Food",
        "Vegetables", "Meals", "Shopping List"
    ],
    "Time & Calendar": [
        "What Time Is It?", "About Time", "Days of the Week 1",
        "Days of the Week 2", "Months 1", "Months 2"
    ],
    "Grammar": [
        "To Be", "To Have", "Possessives",
        "The Present", "Pronouns", "Where is..?"
    ],
    "Travel": [
        "Directions", "Around the City", "Exploring Nature",
        "At the Hotel", "At Reception", "Arrivals & Departures"
    ],
    "School": [
        "School Supplies", "Books", "At School",
        "Teamwork", "Extracurricular", "School Subjects"
    ],
    "Animals": [
        "Wild Animals", "Pets 1", "Pets 2",
        "Farm Animals", "At the Zoo 1", "At the Zoo 2"
    ],
    "Sports": [
        "Sports 1", "Sports 2", "A Football Match",
        "Staying Active", "Water Sports", "A Dance Competition"
    ]
};

/* ═══════════════════════════════════════════
   VOCABULARY DATA — per language · per lesson
   Structure: languageVocab[language][lessonKey] = { words:[], speaking:[] }
════════════════════════════════════════════ */
const languageVocab = {

    /* ─────────────── JAPANESE ─────────────── */
    Japanese: {
        "Meeting People": {
            words: [
                { foreign: "こんにちは",           romanized: "Konnichiwa",        english: "Hello" },
                { foreign: "ありがとう",           romanized: "Arigatou",          english: "Thank you" },
                { foreign: "はい",                 romanized: "Hai",               english: "Yes" },
                { foreign: "いいえ",               romanized: "Iie",               english: "No" },
                { foreign: "すみません",           romanized: "Sumimasen",         english: "Excuse me" },
                { foreign: "わかりません",         romanized: "Wakarimasen",       english: "I don't understand" }
            ],
            speaking: [
                { foreign: "おなまえは？",         romanized: "Onamae wa?",        english: "What is your name?" },
                { foreign: "わたしの なまえは…",   romanized: "Watashi no namae wa…", english: "My name is…" },
                { foreign: "はじめまして",         romanized: "Hajimemashite",     english: "Nice to meet you" }
            ]
        },
        "Greetings": {
            words: [
                { foreign: "おはようございます",   romanized: "Ohayou gozaimasu",  english: "Good morning" },
                { foreign: "こんばんは",           romanized: "Konbanwa",          english: "Good evening" },
                { foreign: "おやすみなさい",       romanized: "Oyasuminasai",      english: "Good night" },
                { foreign: "さようなら",           romanized: "Sayounara",         english: "Goodbye" },
                { foreign: "またね",               romanized: "Matane",            english: "See you later" }
            ],
            speaking: [
                { foreign: "おげんきですか？",     romanized: "Ogenki desu ka?",   english: "How are you?" },
                { foreign: "げんきです",           romanized: "Genki desu",        english: "I'm fine" }
            ]
        },
        "Introductions": {
            words: [
                { foreign: "なまえ",               romanized: "Namae",             english: "Name" },
                { foreign: "くに",                 romanized: "Kuni",              english: "Country" },
                { foreign: "しごと",               romanized: "Shigoto",           english: "Job / Work" },
                { foreign: "ねんれい",             romanized: "Nenrei",            english: "Age" },
                { foreign: "しゅみ",               romanized: "Shumi",             english: "Hobby" }
            ],
            speaking: [
                { foreign: "にほんごをべんきょうしています", romanized: "Nihongo wo benkyou shite imasu", english: "I am studying Japanese" }
            ]
        },
        "Farewells": {
            words: [
                { foreign: "じゃあね",             romanized: "Jaa ne",            english: "Bye!" },
                { foreign: "またあとで",           romanized: "Mata atode",        english: "See you later" },
                { foreign: "きをつけて",           romanized: "Ki wo tsukete",     english: "Take care" },
                { foreign: "いってらっしゃい",     romanized: "Itterasshai",       english: "Have a good trip" }
            ],
            speaking: [
                { foreign: "またあした",           romanized: "Mata ashita",       english: "See you tomorrow" }
            ]
        },
        "Polite Phrases": {
            words: [
                { foreign: "どうぞ",               romanized: "Douzo",             english: "Please / Go ahead" },
                { foreign: "ごめんなさい",         romanized: "Gomennasai",        english: "I'm sorry" },
                { foreign: "おねがいします",       romanized: "Onegaishimasu",     english: "Please (request)" },
                { foreign: "どういたしまして",     romanized: "Douitashimashite",  english: "You're welcome" }
            ],
            speaking: [
                { foreign: "もういちどおねがいします", romanized: "Mou ichido onegaishimasu", english: "Please say that again" }
            ]
        },
        "How Are You?": {
            words: [
                { foreign: "げんき",               romanized: "Genki",             english: "Fine / Energetic" },
                { foreign: "つかれた",             romanized: "Tsukareta",         english: "Tired" },
                { foreign: "ねむい",               romanized: "Nemui",             english: "Sleepy" },
                { foreign: "いそがしい",           romanized: "Isogashii",         english: "Busy" },
                { foreign: "たのしい",             romanized: "Tanoshii",          english: "Having fun" }
            ],
            speaking: [
                { foreign: "まあまあです",         romanized: "Maa maa desu",      english: "So-so" }
            ]
        },
        "Parents & Children": {
            words: [
                { foreign: "おかあさん",           romanized: "Okaasan",           english: "Mother" },
                { foreign: "おとうさん",           romanized: "Otousan",           english: "Father" },
                { foreign: "こども",               romanized: "Kodomo",            english: "Child" },
                { foreign: "むすこ",               romanized: "Musuko",            english: "Son" },
                { foreign: "むすめ",               romanized: "Musume",            english: "Daughter" },
                { foreign: "あかちゃん",           romanized: "Akachan",           english: "Baby" }
            ],
            speaking: [
                { foreign: "かぞくはなんにんですか？", romanized: "Kazoku wa nannin desu ka?", english: "How many people are in your family?" }
            ]
        },
        "Family & Pets": {
            words: [
                { foreign: "いぬ",                 romanized: "Inu",               english: "Dog" },
                { foreign: "ねこ",                 romanized: "Neko",              english: "Cat" },
                { foreign: "かぞく",               romanized: "Kazoku",            english: "Family" },
                { foreign: "ペット",               romanized: "Petto",             english: "Pet" },
                { foreign: "きょうだい",           romanized: "Kyoudai",           english: "Siblings" }
            ],
            speaking: [
                { foreign: "ペットはいますか？",   romanized: "Petto wa imasu ka?", english: "Do you have a pet?" }
            ]
        },
        "Grandparents": {
            words: [
                { foreign: "おじいさん",           romanized: "Ojiisan",           english: "Grandfather" },
                { foreign: "おばあさん",           romanized: "Obaasan",           english: "Grandmother" },
                { foreign: "まご",                 romanized: "Mago",              english: "Grandchild" }
            ],
            speaking: [
                { foreign: "そふはげんきです",     romanized: "Sofu wa genki desu", english: "My grandfather is well" }
            ]
        },
        "Family & Friends": {
            words: [
                { foreign: "ともだち",             romanized: "Tomodachi",         english: "Friend" },
                { foreign: "しんゆう",             romanized: "Shin'yuu",          english: "Best friend" },
                { foreign: "となり",               romanized: "Tonari",            english: "Neighbor" }
            ],
            speaking: [
                { foreign: "かれはわたしのともだちです", romanized: "Kare wa watashi no tomodachi desu", english: "He is my friend" }
            ]
        },
        "Relatives": {
            words: [
                { foreign: "おじさん",             romanized: "Ojisan",            english: "Uncle" },
                { foreign: "おばさん",             romanized: "Obasan",            english: "Aunt" },
                { foreign: "いとこ",               romanized: "Itoko",             english: "Cousin" },
                { foreign: "しんせき",             romanized: "Shinseki",          english: "Relatives" }
            ],
            speaking: [
                { foreign: "おじさんはいしゃです", romanized: "Ojisan wa isha desu", english: "My uncle is a doctor" }
            ]
        },
        "My Family": {
            words: [
                { foreign: "あに",                 romanized: "Ani",               english: "Older brother" },
                { foreign: "あね",                 romanized: "Ane",               english: "Older sister" },
                { foreign: "おとうと",             romanized: "Otouto",            english: "Younger brother" },
                { foreign: "いもうと",             romanized: "Imouto",            english: "Younger sister" }
            ],
            speaking: [
                { foreign: "あにはとうきょうにすんでいます", romanized: "Ani wa Toukyou ni sunde imasu", english: "My brother lives in Tokyo" }
            ]
        },
        "Fruit": {
            words: [
                { foreign: "りんご",               romanized: "Ringo",             english: "Apple" },
                { foreign: "バナナ",               romanized: "Banana",            english: "Banana" },
                { foreign: "みかん",               romanized: "Mikan",             english: "Mandarin" },
                { foreign: "いちご",               romanized: "Ichigo",            english: "Strawberry" },
                { foreign: "ぶどう",               romanized: "Budou",             english: "Grapes" },
                { foreign: "もも",                 romanized: "Momo",              english: "Peach" }
            ],
            speaking: [
                { foreign: "りんごをひとつください", romanized: "Ringo wo hitotsu kudasai", english: "One apple, please" }
            ]
        },
        "Drinks": {
            words: [
                { foreign: "みず",                 romanized: "Mizu",              english: "Water" },
                { foreign: "おちゃ",               romanized: "Ocha",              english: "Tea" },
                { foreign: "コーヒー",             romanized: "Koohii",            english: "Coffee" },
                { foreign: "ジュース",             romanized: "Juusu",             english: "Juice" },
                { foreign: "ぎゅうにゅう",         romanized: "Gyuunyuu",          english: "Milk" }
            ],
            speaking: [
                { foreign: "おちゃをいっぱいください", romanized: "Ocha wo ippai kudasai", english: "One cup of tea, please" }
            ]
        },
        "Food": {
            words: [
                { foreign: "ごはん",               romanized: "Gohan",             english: "Rice / Meal" },
                { foreign: "すし",                 romanized: "Sushi",             english: "Sushi" },
                { foreign: "ラーメン",             romanized: "Raamen",            english: "Ramen" },
                { foreign: "てんぷら",             romanized: "Tenpura",           english: "Tempura" },
                { foreign: "おにぎり",             romanized: "Onigiri",           english: "Rice ball" },
                { foreign: "みそしる",             romanized: "Misoshiru",         english: "Miso soup" }
            ],
            speaking: [
                { foreign: "これはおいしいです",   romanized: "Kore wa oishii desu", english: "This is delicious" }
            ]
        },
        "Vegetables": {
            words: [
                { foreign: "やさい",               romanized: "Yasai",             english: "Vegetables" },
                { foreign: "にんじん",             romanized: "Ninjin",            english: "Carrot" },
                { foreign: "たまねぎ",             romanized: "Tamanegi",          english: "Onion" },
                { foreign: "きゅうり",             romanized: "Kyuuri",            english: "Cucumber" },
                { foreign: "じゃがいも",           romanized: "Jagaimo",           english: "Potato" }
            ],
            speaking: [
                { foreign: "やさいがすきです",     romanized: "Yasai ga suki desu", english: "I like vegetables" }
            ]
        },
        "Meals": {
            words: [
                { foreign: "あさごはん",           romanized: "Asagohan",          english: "Breakfast" },
                { foreign: "ひるごはん",           romanized: "Hirugohan",         english: "Lunch" },
                { foreign: "ばんごはん",           romanized: "Bangohan",          english: "Dinner" },
                { foreign: "おやつ",               romanized: "Oyatsu",            english: "Snack" }
            ],
            speaking: [
                { foreign: "いただきます",         romanized: "Itadakimasu",       english: "Let's eat! (said before meal)" }
            ]
        },
        "Shopping List": {
            words: [
                { foreign: "かいもの",             romanized: "Kaimono",           english: "Shopping" },
                { foreign: "スーパー",             romanized: "Suupaa",            english: "Supermarket" },
                { foreign: "たまご",               romanized: "Tamago",            english: "Egg" },
                { foreign: "パン",                 romanized: "Pan",               english: "Bread" },
                { foreign: "バター",               romanized: "Bataa",             english: "Butter" }
            ],
            speaking: [
                { foreign: "いくらですか？",       romanized: "Ikura desu ka?",    english: "How much is it?" }
            ]
        },
        "Numbers 1–10": {
            words: [
                { foreign: "いち",   romanized: "Ichi",   english: "1" },
                { foreign: "に",     romanized: "Ni",     english: "2" },
                { foreign: "さん",   romanized: "San",    english: "3" },
                { foreign: "し・よん", romanized: "Shi / Yon", english: "4" },
                { foreign: "ご",     romanized: "Go",     english: "5" },
                { foreign: "ろく",   romanized: "Roku",   english: "6" },
                { foreign: "なな・しち", romanized: "Nana / Shichi", english: "7" },
                { foreign: "はち",   romanized: "Hachi",  english: "8" },
                { foreign: "きゅう・く", romanized: "Kyuu / Ku", english: "9" },
                { foreign: "じゅう", romanized: "Juu",    english: "10" }
            ],
            speaking: [
                { foreign: "なんさいですか？", romanized: "Nansai desu ka?", english: "How old are you?" }
            ]
        },
        "Numbers 11–100": {
            words: [
                { foreign: "じゅういち",   romanized: "Juuichi",  english: "11" },
                { foreign: "じゅうに",     romanized: "Juuni",    english: "12" },
                { foreign: "にじゅう",     romanized: "Nijuu",    english: "20" },
                { foreign: "さんじゅう",   romanized: "Sanjuu",   english: "30" },
                { foreign: "ひゃく",       romanized: "Hyaku",    english: "100" }
            ],
            speaking: [
                { foreign: "でんわばんごうはなんですか？", romanized: "Denwa bangou wa nan desu ka?", english: "What is your phone number?" }
            ]
        },
        "What Time Is It?": {
            words: [
                { foreign: "じかん",         romanized: "Jikan",       english: "Time" },
                { foreign: "いまなんじですか？", romanized: "Ima nanji desu ka?", english: "What time is it now?" },
                { foreign: "ごぜん",         romanized: "Gozen",       english: "AM" },
                { foreign: "ごご",           romanized: "Gogo",        english: "PM" },
                { foreign: "はん",           romanized: "Han",         english: "Half past" }
            ],
            speaking: [
                { foreign: "さんじはんです", romanized: "Sanji han desu", english: "It's 3:30" }
            ]
        },
        "Days of the Week 1": {
            words: [
                { foreign: "にちようび",   romanized: "Nichiyoubi",   english: "Sunday" },
                { foreign: "げつようび",   romanized: "Getsuyoubi",   english: "Monday" },
                { foreign: "かようび",     romanized: "Kayoubi",      english: "Tuesday" },
                { foreign: "すいようび",   romanized: "Suiyoubi",     english: "Wednesday" }
            ],
            speaking: [
                { foreign: "きょうはなんようびですか？", romanized: "Kyou wa nanyoubi desu ka?", english: "What day is today?" }
            ]
        },
        "Days of the Week 2": {
            words: [
                { foreign: "もくようび",   romanized: "Mokuyoubi",    english: "Thursday" },
                { foreign: "きんようび",   romanized: "Kin'youbi",    english: "Friday" },
                { foreign: "どようび",     romanized: "Doyoubi",      english: "Saturday" },
                { foreign: "しゅうまつ",   romanized: "Shuumatsu",    english: "Weekend" }
            ],
            speaking: [
                { foreign: "しゅうまつにかいものします", romanized: "Shuumatsu ni kaimono shimasu", english: "I shop on weekends" }
            ]
        },
        "Directions": {
            words: [
                { foreign: "みぎ",         romanized: "Migi",         english: "Right" },
                { foreign: "ひだり",       romanized: "Hidari",       english: "Left" },
                { foreign: "まっすぐ",     romanized: "Massugu",      english: "Straight ahead" },
                { foreign: "えき",         romanized: "Eki",          english: "Station" },
                { foreign: "ちかく",       romanized: "Chikaku",      english: "Near" }
            ],
            speaking: [
                { foreign: "えきはどこですか？", romanized: "Eki wa doko desu ka?", english: "Where is the station?" }
            ]
        },
        "Around the City": {
            words: [
                { foreign: "びょういん",   romanized: "Byouin",       english: "Hospital" },
                { foreign: "ぎんこう",     romanized: "Ginkou",       english: "Bank" },
                { foreign: "ゆうびんきょく", romanized: "Yuubinkyoku", english: "Post office" },
                { foreign: "こうえん",     romanized: "Kouen",        english: "Park" },
                { foreign: "レストラン",   romanized: "Resutoran",    english: "Restaurant" }
            ],
            speaking: [
                { foreign: "ちかくにコンビニはありますか？", romanized: "Chikaku ni konbini wa arimasu ka?", english: "Is there a convenience store nearby?" }
            ]
        },
        "At the Hotel": {
            words: [
                { foreign: "ホテル",       romanized: "Hoteru",       english: "Hotel" },
                { foreign: "へや",         romanized: "Heya",         english: "Room" },
                { foreign: "よやく",       romanized: "Yoyaku",       english: "Reservation" },
                { foreign: "チェックイン", romanized: "Chekku in",    english: "Check in" },
                { foreign: "チェックアウト", romanized: "Chekku auto", english: "Check out" }
            ],
            speaking: [
                { foreign: "よやくがあります", romanized: "Yoyaku ga arimasu", english: "I have a reservation" }
            ]
        },
        "Wild Animals": {
            words: [
                { foreign: "とら",         romanized: "Tora",         english: "Tiger" },
                { foreign: "ぞう",         romanized: "Zou",          english: "Elephant" },
                { foreign: "きりん",       romanized: "Kirin",        english: "Giraffe" },
                { foreign: "さる",         romanized: "Saru",         english: "Monkey" },
                { foreign: "くま",         romanized: "Kuma",         english: "Bear" },
                { foreign: "うさぎ",       romanized: "Usagi",        english: "Rabbit" }
            ],
            speaking: [
                { foreign: "どうぶつがすきです", romanized: "Doubutsu ga suki desu", english: "I like animals" }
            ]
        },
        "Pets 1": {
            words: [
                { foreign: "いぬ",         romanized: "Inu",          english: "Dog" },
                { foreign: "ねこ",         romanized: "Neko",         english: "Cat" },
                { foreign: "うさぎ",       romanized: "Usagi",        english: "Rabbit" },
                { foreign: "ハムスター",   romanized: "Hamusutaa",    english: "Hamster" }
            ],
            speaking: [
                { foreign: "いぬをかっています", romanized: "Inu wo katte imasu", english: "I have a dog" }
            ]
        },
        "Sports 1": {
            words: [
                { foreign: "サッカー",     romanized: "Sakkaa",       english: "Soccer" },
                { foreign: "やきゅう",     romanized: "Yakyuu",       english: "Baseball" },
                { foreign: "テニス",       romanized: "Tenisu",       english: "Tennis" },
                { foreign: "バスケ",       romanized: "Basuke",       english: "Basketball" },
                { foreign: "すいえい",     romanized: "Suiei",        english: "Swimming" }
            ],
            speaking: [
                { foreign: "スポーツがすきですか？", romanized: "Supootsu ga suki desu ka?", english: "Do you like sports?" }
            ]
        },
        "Sports 2": {
            words: [
                { foreign: "じゅうどう",   romanized: "Juudou",       english: "Judo" },
                { foreign: "からて",       romanized: "Karate",       english: "Karate" },
                { foreign: "たいそう",     romanized: "Taisou",       english: "Gymnastics" },
                { foreign: "マラソン",     romanized: "Marason",      english: "Marathon" }
            ],
            speaking: [
                { foreign: "まいにちれんしゅうします", romanized: "Mainichi renshuu shimasu", english: "I practice every day" }
            ]
        }
    },

    /* ─────────────── FRENCH ─────────────── */
    French: {
        "Meeting People": {
            words: [
                { foreign: "Bonjour",     english: "Hello" },
                { foreign: "Merci",       english: "Thank you" },
                { foreign: "Oui",         english: "Yes" },
                { foreign: "Non",         english: "No" },
                { foreign: "S'il vous plaît", english: "Please" }
            ],
            speaking: [
                { foreign: "Comment vous appelez-vous ?", english: "What is your name?" },
                { foreign: "Je m'appelle …",              english: "My name is …" }
            ]
        },
        "Greetings": {
            words: [
                { foreign: "Salut",       english: "Hi" },
                { foreign: "Bonsoir",     english: "Good evening" },
                { foreign: "Bonne nuit",  english: "Good night" },
                { foreign: "Au revoir",   english: "Goodbye" }
            ],
            speaking: [
                { foreign: "Comment ça va ?", english: "How are you?" },
                { foreign: "Ça va bien",      english: "I'm fine" }
            ]
        },
        "Parents & Children": {
            words: [
                { foreign: "Mère",        english: "Mother" },
                { foreign: "Père",        english: "Father" },
                { foreign: "Fils",        english: "Son" },
                { foreign: "Fille",       english: "Daughter" },
                { foreign: "Enfant",      english: "Child" }
            ],
            speaking: [
                { foreign: "J'ai deux enfants", english: "I have two children" }
            ]
        },
        "Fruit": {
            words: [
                { foreign: "Pomme",       english: "Apple" },
                { foreign: "Banane",      english: "Banana" },
                { foreign: "Fraise",      english: "Strawberry" },
                { foreign: "Raisin",      english: "Grapes" },
                { foreign: "Orange",      english: "Orange" }
            ],
            speaking: [
                { foreign: "Je voudrais une pomme", english: "I would like an apple" }
            ]
        }
    },

    /* ─────────────── GERMAN ─────────────── */
    German: {
        "Meeting People": {
            words: [
                { foreign: "Hallo",       english: "Hello" },
                { foreign: "Danke",       english: "Thank you" },
                { foreign: "Ja",          english: "Yes" },
                { foreign: "Nein",        english: "No" },
                { foreign: "Bitte",       english: "Please" }
            ],
            speaking: [
                { foreign: "Wie heißen Sie?",      english: "What is your name?" },
                { foreign: "Ich heiße …",           english: "My name is …" },
                { foreign: "Wie geht's?",           english: "How are you?" },
                { foreign: "Mir geht's gut",        english: "I am fine" }
            ]
        },
        "Greetings": {
            words: [
                { foreign: "Guten Morgen",    english: "Good morning" },
                { foreign: "Guten Abend",     english: "Good evening" },
                { foreign: "Gute Nacht",      english: "Good night" },
                { foreign: "Tschüss",         english: "Bye" },
                { foreign: "Auf Wiedersehen", english: "Goodbye" }
            ],
            speaking: [
                { foreign: "Wie geht es Ihnen?", english: "How are you? (formal)" }
            ]
        },
        "Numbers 1–10": {
            words: [
                { foreign: "eins",    english: "1" },
                { foreign: "zwei",    english: "2" },
                { foreign: "drei",    english: "3" },
                { foreign: "vier",    english: "4" },
                { foreign: "fünf",    english: "5" },
                { foreign: "sechs",   english: "6" },
                { foreign: "sieben",  english: "7" },
                { foreign: "acht",    english: "8" },
                { foreign: "neun",    english: "9" },
                { foreign: "zehn",    english: "10" }
            ],
            speaking: [
                { foreign: "Wie viel kostet das?", english: "How much does that cost?" }
            ]
        }
    },

    /* ─────────────── SPANISH ─────────────── */
    Spanish: {
        "Meeting People": {
            words: [
                { foreign: "Hola",          english: "Hello" },
                { foreign: "Gracias",       english: "Thank you" },
                { foreign: "Sí",            english: "Yes" },
                { foreign: "No",            english: "No" },
                { foreign: "Por favor",     english: "Please" }
            ],
            speaking: [
                { foreign: "¿Cómo te llamas?",   english: "What is your name?" },
                { foreign: "Me llamo …",          english: "My name is …" },
                { foreign: "¿Cómo estás?",        english: "How are you?" }
            ]
        },
        "Greetings": {
            words: [
                { foreign: "Buenos días",     english: "Good morning" },
                { foreign: "Buenas tardes",   english: "Good afternoon" },
                { foreign: "Buenas noches",   english: "Good night" },
                { foreign: "Adiós",           english: "Goodbye" },
                { foreign: "Hasta luego",     english: "See you later" }
            ],
            speaking: [
                { foreign: "¿Cómo estás?", english: "How are you?" },
                { foreign: "Estoy bien",   english: "I'm fine" }
            ]
        },
        "Fruit": {
            words: [
                { foreign: "Manzana",     english: "Apple" },
                { foreign: "Plátano",     english: "Banana" },
                { foreign: "Fresa",       english: "Strawberry" },
                { foreign: "Naranja",     english: "Orange" },
                { foreign: "Uva",         english: "Grapes" }
            ],
            speaking: [
                { foreign: "Me gustan las frutas", english: "I like fruit" }
            ]
        }
    },

    /* ─────────────── KOREAN ─────────────── */
    Korean: {
        "Meeting People": {
            words: [
                { foreign: "안녕하세요",   romanized: "Annyeonghaseyo",  english: "Hello" },
                { foreign: "감사합니다",   romanized: "Gamsahamnida",    english: "Thank you" },
                { foreign: "네",           romanized: "Ne",              english: "Yes" },
                { foreign: "아니요",       romanized: "Aniyo",           english: "No" },
                { foreign: "죄송합니다",   romanized: "Joesonghamnida",  english: "Sorry" }
            ],
            speaking: [
                { foreign: "이름이 뭐예요?",       romanized: "Ireumi mwoyeyo?",       english: "What is your name?" },
                { foreign: "제 이름은 …이에요",    romanized: "Je ireumeun … ieyo",    english: "My name is …" }
            ]
        },
        "Greetings": {
            words: [
                { foreign: "안녕히 계세요", romanized: "Annyeonghi gyeseyo", english: "Goodbye (to someone staying)" },
                { foreign: "안녕히 가세요", romanized: "Annyeonghi gaseyo",  english: "Goodbye (to someone leaving)" },
                { foreign: "반갑습니다",   romanized: "Bangapseumnida",      english: "Nice to meet you" }
            ],
            speaking: [
                { foreign: "잘 지내세요?", romanized: "Jal jinaeseyo?", english: "How are you?" }
            ]
        }
    },

    /* ─────────────── CHINESE ─────────────── */
    Chinese: {
        "Meeting People": {
            words: [
                { foreign: "你好",     romanized: "Nǐ hǎo",      english: "Hello" },
                { foreign: "谢谢",     romanized: "Xièxiè",      english: "Thank you" },
                { foreign: "是",       romanized: "Shì",          english: "Yes" },
                { foreign: "不",       romanized: "Bù",           english: "No" },
                { foreign: "请",       romanized: "Qǐng",         english: "Please" }
            ],
            speaking: [
                { foreign: "你叫什么名字？", romanized: "Nǐ jiào shénme míngzi?", english: "What is your name?" },
                { foreign: "我叫 …",         romanized: "Wǒ jiào …",               english: "My name is …" }
            ]
        },
        "Greetings": {
            words: [
                { foreign: "早上好",   romanized: "Zǎoshang hǎo",  english: "Good morning" },
                { foreign: "晚上好",   romanized: "Wǎnshang hǎo",  english: "Good evening" },
                { foreign: "晚安",     romanized: "Wǎn ān",        english: "Good night" },
                { foreign: "再见",     romanized: "Zàijiàn",       english: "Goodbye" }
            ],
            speaking: [
                { foreign: "你好吗？", romanized: "Nǐ hǎo ma?", english: "How are you?" }
            ]
        }
    }
};

/* ═══════════════════════════════════════════
   FALLBACK vocabulary for unsupported combos
════════════════════════════════════════════ */
function getFallbackVocab(lessonName) {
    return {
        words: [
            { foreign: "—", english: `No ${currentLanguage} data yet for "${lessonName}". More coming soon!` }
        ],
        speaking: []
    };
}

function getVocab(language, lessonName) {
    const langData = languageVocab[language];
    if (!langData) return getFallbackVocab(lessonName);
    const lessonData = langData[lessonName];
    if (!lessonData) return getFallbackVocab(lessonName);
    return lessonData;
}

/* ═══════════════════════════════════════════
   OTHER LANGUAGES LIST  (menu auto-generate)
════════════════════════════════════════════ */
const otherLanguages = [
    {name: "Arabic",     code: "sa"},
    {name: "Dutch",      code: "nl"},
    {name: "Finnish",    code: "fi"},
    {name: "Greek",      code: "gr"},
    {name: "Hebrew",     code: "il"},
    {name: "Hindi",      code: "in"},
    {name: "Hungarian",  code: "hu"},
    {name: "Indonesian", code: "id"},
    {name: "Norwegian",  code: "no"},
    {name: "Polish",     code: "pl"},
    {name: "Portuguese", code: "pt"},
    {name: "Romanian",   code: "ro"},
    {name: "Russian",    code: "ru"},
    {name: "Swedish",    code: "se"},
    {name: "Thai",       code: "th"},
    {name: "Turkish",    code: "tr"},
    {name: "Ukrainian",  code: "ua"},
    {name: "Vietnamese", code: "vn"}
];

const allLangContainer = document.getElementById("allLanguages");
otherLanguages.forEach(lang => {
    const div = document.createElement("div");
    div.className = "lang-item";
    div.innerHTML = `<img src="https://flagcdn.com/w40/${lang.code}.png"><span>${lang.name}</span>`;
    div.onclick = () => selectLanguage(lang.name, lang.code);
    allLangContainer.appendChild(div);
});

/* ═══════════════════════════════════════════
   RENDER 11 CATEGORY TILES
════════════════════════════════════════════ */
function renderCategoryGrid() {
    const grid = document.getElementById("categoryGrid");
    grid.innerHTML = "";
    categories.forEach(cat => {
        const done   = getCategoryDone(cat.key);
        const total  = lessonData[cat.key] ? lessonData[cat.key].length : 0;
        const pct    = total ? Math.floor((done / total) * 100) : 0;

        const div = document.createElement("div");
        div.className = "category-tile";
        div.style.setProperty("--cat-color", cat.color);
        div.innerHTML = `
            <div class="cat-icon">${cat.icon}</div>
            <div class="cat-name">${cat.key}</div>
            <div class="cat-mini-bar"><div class="cat-mini-fill" style="width:${pct}%"></div></div>
            <div class="cat-pct">${pct}%</div>
        `;
        div.onclick = () => openCategory(cat.key);
        grid.appendChild(div);
    });
}

/* ═══════════════════════════════════════════
   LANGUAGE SELECTION
════════════════════════════════════════════ */
function selectLanguage(lang, code) {
    currentLanguage = lang;
    if (!progressData[lang]) {
        progressData[lang] = { lessonsDone: {}, totalDone: 0 };
    }
    document.getElementById("selectedLang").innerText = lang;
    renderCategoryGrid();
    updateCourseStats();
    showPage("coursePage");
}

/* ═══════════════════════════════════════════
   PROGRESS HELPERS
════════════════════════════════════════════ */
function getCategoryDone(catKey) {
    if (!progressData[currentLanguage]) return 0;
    const done = progressData[currentLanguage].lessonsDone;
    if (!done[catKey]) return 0;
    return Object.keys(done[catKey]).length;
}

function markLessonDone(catKey, lessonName) {
    if (!progressData[currentLanguage]) return;
    const done = progressData[currentLanguage].lessonsDone;
    if (!done[catKey]) done[catKey] = {};
    done[catKey][lessonName] = true;
    updateCourseStats();
}

function updateCourseStats() {
    if (!progressData[currentLanguage]) return;
    const data = progressData[currentLanguage];

    let totalLessons = 0;
    let doneLessons  = 0;
    categories.forEach(cat => {
        const subCount = lessonData[cat.key] ? lessonData[cat.key].length : 0;
        totalLessons += subCount;
        doneLessons  += getCategoryDone(cat.key);
    });

    const pct = totalLessons ? Math.floor((doneLessons / totalLessons) * 100) : 0;
    document.getElementById("progress").innerText    = pct + "%";
    document.getElementById("lessonCount").innerText = doneLessons + "/" + totalLessons;
    document.getElementById("progressBar").style.width = pct + "%";
}

/* ═══════════════════════════════════════════
   OPEN CATEGORY → lessonDetailPage
════════════════════════════════════════════ */
function openCategory(catKey) {
    currentCategory = catKey;
    showPage("lessonDetailPage");
    document.getElementById("detailTitle").innerText = catKey;

    const subLessons = lessonData[catKey] || [];

    // count total words + phrases in this category
    let wCount = 0, pCount = 0;
    subLessons.forEach(lesson => {
        const v = getVocab(currentLanguage, lesson);
        wCount += v.words.length;
        pCount += (v.speaking || []).length;
    });
    document.getElementById("wordCount").innerText   = wCount;
    document.getElementById("phraseCount").innerText = pCount;

    const done  = getCategoryDone(catKey);
    const total = subLessons.length;
    const pct   = total ? Math.floor((done / total) * 100) : 0;
    document.getElementById("detailProgressFill").style.width = pct + "%";

    const list = document.getElementById("lessonList");
    list.innerHTML = "";

    subLessons.forEach((lesson, index) => {
        const isDone   = progressData[currentLanguage] &&
                         progressData[currentLanguage].lessonsDone[catKey] &&
                         progressData[currentLanguage].lessonsDone[catKey][lesson];
        const stars    = isDone ? "⭐⭐⭐" : "☆☆☆";
        const doneTag  = isDone ? '<span class="done-badge">✓ Done</span>' : '';

        const div = document.createElement("div");
        div.className = "lesson-card" + (isDone ? " lesson-done" : "");
        div.innerHTML = `
            <div>
                <h4>Lesson ${index + 1} ${doneTag}</h4>
                <p>${lesson}</p>
            </div>
            <div class="stars">${stars}</div>
        `;
        div.onclick = () => openVocabPage(lesson);
        list.appendChild(div);
    });
}

/* ═══════════════════════════════════════════
   VOCAB PAGE
════════════════════════════════════════════ */
let currentVocabData = { words: [], speaking: [] };
let quizIndex = 0;
let quizScore = 0;

function openVocabPage(lessonName) {
    currentLesson    = lessonName;
    currentMode      = "words";
    currentVocabData = getVocab(currentLanguage, lessonName);

    document.getElementById("vocabTitle").innerText = lessonName;

    // reset tabs
    document.querySelectorAll(".mode-tab")
        .forEach(t => t.classList.remove("active-tab"));
    document.querySelectorAll(".mode-tab")[0].classList.add("active-tab");

    renderVocabWords();
    markLessonDone(currentCategory, lessonName);
    renderCategoryGrid(); // refresh stars
    showPage("vocabPage");

    // Track for results
    currentVocabData.words.forEach(w => {
        if (!learnedWords.find(x => x.foreign === w.foreign)) learnedWords.push(w);
    });
    (currentVocabData.speaking || []).forEach(p => {
        if (!learnedPhrases.find(x => x.foreign === p.foreign)) learnedPhrases.push(p);
    });
}

function switchMode(mode, btn) {
    currentMode = mode;
    document.querySelectorAll(".mode-tab").forEach(t => t.classList.remove("active-tab"));
    btn.classList.add("active-tab");

    if (mode === "words")    renderVocabWords();
    if (mode === "speaking") renderVocabSpeaking();
    if (mode === "quiz")     startQuiz();
}

/* ── Words list ── */
function renderVocabWords() {
    const content = document.getElementById("vocabContent");
    content.innerHTML = "";

    if (!currentVocabData.words.length) {
        content.innerHTML = "<p style='text-align:center;opacity:.7'>No words yet.</p>";
        return;
    }

    currentVocabData.words.forEach(word => {
        const romanized = word.romanized
            ? `<span class="word-romanized">${word.romanized}</span>` : "";
        const div = document.createElement("div");
        div.className = "vocab-card";
        div.innerHTML = `
            <div class="vocab-left">
                <div class="word-foreign">${word.foreign}</div>
                ${romanized}
            </div>
            <div class="vocab-right">
                <div class="word-english">${word.english}</div>
                <button class="speak-btn" onclick="speakWord('${word.foreign}')">🔊</button>
            </div>
        `;
        content.appendChild(div);
    });
}

/* ── Speaking / Phrases ── */
function renderVocabSpeaking() {
    const content = document.getElementById("vocabContent");
    content.innerHTML = "";

    const phrases = currentVocabData.speaking || [];
    if (!phrases.length) {
        content.innerHTML = "<p style='text-align:center;opacity:.7'>No phrases for this lesson yet.</p>";
        return;
    }

    phrases.forEach(phrase => {
        const romanized = phrase.romanized
            ? `<span class="word-romanized">${phrase.romanized}</span>` : "";
        const div = document.createElement("div");
        div.className = "vocab-card phrase-card";
        div.innerHTML = `
            <div>
                <div class="word-foreign">${phrase.foreign}</div>
                ${romanized}
                <div class="word-english">${phrase.english}</div>
            </div>
            <button class="speak-btn" onclick="speakWord('${phrase.foreign}')">🔊</button>
        `;
        content.appendChild(div);
    });
}

/* ── Quiz ── */
function startQuiz() {
    quizIndex = 0;
    quizScore = 0;
    renderQuiz();
}

function renderQuiz() {
    const content = document.getElementById("vocabContent");
    const words   = currentVocabData.words;

    if (!words.length) {
        content.innerHTML = "<p style='text-align:center;opacity:.7'>No words to quiz.</p>";
        return;
    }
    if (quizIndex >= words.length) {
        content.innerHTML = `
            <div class="quiz-result">
                <h2>Quiz Done! 🎉</h2>
                <p>Score: ${quizScore} / ${words.length}</p>
                <button class="start-btn" onclick="startQuiz()">Try Again</button>
            </div>`;
        return;
    }

    const current = words[quizIndex];
    // build 4 options (1 correct + 3 random)
    const pool    = words.filter((_, i) => i !== quizIndex);
    const options = shuffle([current, ...pool.slice(0, 3)]);

    content.innerHTML = `
        <div class="quiz-card">
            <p class="quiz-progress">${quizIndex + 1} / ${words.length}</p>
            <div class="quiz-word">${current.foreign}</div>
            ${current.romanized ? `<div class="quiz-romanized">${current.romanized}</div>` : ""}
            <p class="quiz-prompt">What does this mean?</p>
            <div class="quiz-options">
                ${options.map(opt => `
                    <button class="quiz-btn" onclick="checkAnswer(this,'${opt.english}','${current.english}')">
                        ${opt.english}
                    </button>`).join("")}
            </div>
            <div id="quizFeedback"></div>
        </div>`;
}

function checkAnswer(btn, chosen, correct) {
    const allBtns = document.querySelectorAll(".quiz-btn");
    allBtns.forEach(b => b.disabled = true);

    if (chosen === correct) {
        btn.classList.add("correct");
        document.getElementById("quizFeedback").innerHTML = "<p class='feedback-correct'>✅ Correct!</p>";
        quizScore++;
    } else {
        btn.classList.add("wrong");
        allBtns.forEach(b => { if (b.innerText.trim() === correct) b.classList.add("correct"); });
        document.getElementById("quizFeedback").innerHTML = `<p class='feedback-wrong'>❌ Answer: ${correct}</p>`;
    }
    setTimeout(() => { quizIndex++; renderQuiz(); }, 1200);
}

function shuffle(arr) {
    return arr.slice().sort(() => Math.random() - 0.5);
}

/* ═══════════════════════════════════════════
   SPEAK
════════════════════════════════════════════ */
const langCodes = {
    Japanese: "ja-JP", French: "fr-FR", German: "de-DE",
    Spanish: "es-ES",  Korean: "ko-KR", Chinese: "zh-CN",
    English: "en-US"
};

function speakWord(text) {
    const u  = new SpeechSynthesisUtterance(text);
    u.lang   = langCodes[currentLanguage] || "en-US";
    speechSynthesis.speak(u);
}

function speakAll() {
    const words = currentVocabData.words;
    let i = 0;
    function next() {
        if (i >= words.length) return;
        const u = new SpeechSynthesisUtterance(words[i].foreign);
        u.lang  = langCodes[currentLanguage] || "en-US";
        u.onend = () => { i++; setTimeout(next, 500); };
        speechSynthesis.speak(u);
    }
    next();
}

/* ═══════════════════════════════════════════
   GRAMMAR PAGE
════════════════════════════════════════════ */
const grammarData = {
    present: [
        { foreign: "Ich bin",      english: "I am"      },
        { foreign: "Du bist",      english: "You are"   },
        { foreign: "Er/Sie ist",   english: "He/She is" },
        { foreign: "Wir sind",     english: "We are"    },
        { foreign: "Ihr seid",     english: "You are"   },
        { foreign: "Sie sind",     english: "They are"  }
    ],
    past: [
        { foreign: "Ich war",      english: "I was"      },
        { foreign: "Du warst",     english: "You were"   },
        { foreign: "Er/Sie war",   english: "He/She was" },
        { foreign: "Wir waren",    english: "We were"    },
        { foreign: "Ihr wart",     english: "You were"   },
        { foreign: "Sie waren",    english: "They were"  }
    ],
    future: [
        { foreign: "Ich werde sein",    english: "I will be"      },
        { foreign: "Du wirst sein",     english: "You will be"    },
        { foreign: "Er/Sie wird sein",  english: "He/She will be" },
        { foreign: "Wir werden sein",   english: "We will be"     },
        { foreign: "Ihr werdet sein",   english: "You will be"    },
        { foreign: "Sie werden sein",   english: "They will be"   }
    ]
};

let currentTense = "present";

function renderGrammar() {
    const list = document.getElementById("conjugationList");
    list.innerHTML = "";
    const card = document.createElement("div");
    card.className = "conjugation-card";
    grammarData[currentTense].forEach(item => {
        const div = document.createElement("div");
        div.className = "conjugation-item";
        div.innerHTML = `
            <div class="foreign-text">${item.foreign}</div>
            <div class="english-text">${item.english}</div>
        `;
        div.onclick = () => speakWord(item.foreign);
        card.appendChild(div);
    });
    list.appendChild(card);
}

function changeTense(tense, btn) {
    currentTense = tense;
    document.querySelectorAll(".tense-btn")
        .forEach(b => b.classList.remove("active-tense"));
    btn.classList.add("active-tense");
    renderGrammar();
}

/* ═══════════════════════════════════════════
   RESULTS PAGE
════════════════════════════════════════════ */
function openResults() {
    showPage("resultsPage");

    document.getElementById("totalWords").innerText   = learnedWords.length;
    document.getElementById("totalPhrases").innerText = learnedPhrases.length;

    let total    = learnedWords.length + learnedPhrases.length;
    let progress = Math.min(total * 5, 100);
    document.getElementById("totalProgress").innerText = progress + "%";

    const list = document.getElementById("learnedList");
    list.innerHTML = "";

    learnedWords.forEach(word => {
        const div = document.createElement("div");
        div.className = "learned-card";
        const rom = word.romanized ? `<span class="word-romanized">${word.romanized}</span>` : "";
        div.innerHTML = `<h3>${word.foreign}</h3>${rom}<p>${word.english}</p>`;
        list.appendChild(div);
    });
}
