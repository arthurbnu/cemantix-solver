javascript: (async () => {

  const words = [
    "le",
    "la",
    "les",
    "un",
    "une",
    "des",
    "ce",
    "cet",
    "cette",
    "ces",
    "que",
    "qui",
    "quoi",
    "dont",
    "où",
    "quel",
    "quelle",
    "quels",
    "quelles",
    "quelque",
    "quelques",
    "et",
    "ou",
    "ni",
    "car",
    "donc",
    "or",
    "mais",
    "si",
    "sinon",
    "bien",
    "mal",
    "alors",
    "soit",
    "plus",
    "moins",
    "autant",
    "autre",
    "autres",
    "tout",
    "tous",
    "toute",
    "toutes",
    "chaque",
    "aucun",
    "aucune",
    "nul",
    "nulle",
  ];

  /*Mots obtenus en crawlant 100 articles wiki au hasard */
  const wikiWords = [
    "de",
    "est",
    "la",
    "le",
    "et",
    "à",
    "un",
    "en",
    "du",
    "une",
    "dans",
    "l",
    "d",
    "des",
    "au",
    "né",
    "les",
    "Le",
    "Il",
    "par",
    "commune",
    "située",
    "La",
    "sur",
    "qui",
    "a",
    "région",
    "ville",
    "Elle",
    "pour",
    "mort",
    "ou",
    "département",
    "il",
    "français",
    "son",
    "plus",
    "situé",
    "été",
    "province",
    "aux",
    "France",
    "s",
    "nom",
    "habitants",
    "avec",
    "L",
    "sa",
    "village",
    "famille",
    "États",
    "américain",
    "entre",
    "politique",
    "sous",
    "née",
    "sont",
    "se",
    "district",
    "depuis",
    "Unis",
    "comté",
    "Paris",
    "État",
    "également",
    "elle",
    "Saint",
    "homme",
    "Les",
    "février",
    "octobre",
    "que",
    "décembre",
    "avril",
    "comme",
    "mars",
    "septembre",
    "mai",
    "janvier",
    "poste",
    "ouest",
    "ancienne",
    "nord",
    "population",
    "août",
    "novembre",
    "C",
    "sud",
    "était",
    "juillet",
    "deux",
    "britannique",
    "siècle",
    "ses",
    "fut",
    "7",
    "En",
    "espèce",
    "1er",
    "«",
    "»",
    "groupe",
    "Sa",
    "même",
    "Nord",
    "centre",
    "2",
    "juin",
    "Parti",
    "américaine",
    "puis",
    "km",
    "dont",
    "partie",
    "joueur",
    "lieu",
    "3",
    "connu",
    "auteur",
    "ce",
    "6",
    "membre",
    "gare",
    "aussi",
    "ligne",
    "qu",
    "musée",
    "footballeur",
    "peintre",
    "26",
    "17",
    "Cette",
    "ainsi",
    "arrondissement",
    "acteur",
    "4",
    "premier",
    "Angleterre",
    "Est",
    "12",
    "14",
    "football",
    "Sud",
    "11",
    "allemande",
    "église",
    "fait",
    "première",
    "2010",
    "originaire",
    "agit",
    "national",
    "évolue",
    "ancien",
    "2011",
    "genre",
    "sorti",
    "municipalité",
    "années",
    "environ",
    "21",
    "avant",
    "anglais",
    "5",
    "allemand",
    "9",
    "2016",
    "monde",
    "près",
    "8",
    "film",
    "dit",
    "italien",
    "capitale",
    "10",
    "localité",
    "1",
    "Grand",
    "série",
    "ont",
    "Jean",
    "chef",
    "Canada",
    "20",
    "Italie",
    "être",
    "New",
    "origine",
    "Chine",
    "rivière",
    "île",
    "Japon",
    "Europe",
    "quartier",
    "mort", "territoire", "lac", "avoir", "écrire", "lire"];

  const countries = [
    "Afghanistan",
    "Afrique du Sud",
    "Albanie",
    "Algérie",
    "Allemagne",
    "Andorre",
    "Angola",
    "Anguilla",
    "Antarctique",
    "Antigua-et-Barbuda",
    "Antilles néerlandaises",
    "Arabie saoudite",
    "Argentine",
    "Arménie",
    "Aruba",
    "Australie",
    "Autriche",
    "Azerbaïdjan",
    "Bahamas",
    "Bahreïn",
    "Bangladesh",
    "Barbade",
    "Bélarus",
    "Belgique",
    "Belize",
    "Bénin",
    "Bermudes",
    "Bhoutan",
    "Bolivie",
    "Bosnie-Herzégovine",
    "Botswana",
    "Brésil",
    "Brunéi Darussalam",
    "Bulgarie",
    "Burkina Faso",
    "Burundi",
    "Cambodge",
    "Cameroun",
    "Canada",
    "Cap-Vert",
    "Ceuta et Melilla",
    "Chili",
    "Chine",
    "Chypre",
    "Colombie",
    "Comores",
    "Congo-Brazzaville",
    "Corée du Nord",
    "Corée du Sud",
    "Costa Rica",
    "Côte d’Ivoire",
    "Croatie",
    "Cuba",
    "Danemark",
    "Diego Garcia",
    "Djibouti",
    "Dominique",
    "Égypte",
    "El Salvador",
    "Émirats arabes unis",
    "Équateur",
    "Érythrée",
    "Espagne",
    "Estonie",
    "État de la Cité du Vatican",
    "États fédérés de Micronésie",
    "États-Unis",
    "Éthiopie",
    "Fidji",
    "Finlande",
    "France",
    "Gabon",
    "Gambie",
    "Géorgie",
    "Géorgie du Sud et les îles Sandwich du Sud",
    "Ghana",
    "Gibraltar",
    "Grèce",
    "Grenade",
    "Groenland",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernesey",
    "Guinée",
    "Guinée équatoriale",
    "Guinée-Bissau",
    "Guyana",
    "Guyane française",
    "Haïti",
    "Honduras",
    "Hongrie",
    "Île Bouvet",
    "Île Christmas",
    "Île Clipperton",
    "Île de l'Ascension",
    "Île de Man",
    "Île Norfolk",
    "Îles Åland",
    "Îles Caïmans",
    "Îles Canaries",
    "Îles Cocos - Keeling",
    "Îles Cook",
    "Îles Féroé",
    "Îles Heard et MacDonald",
    "Îles Malouines",
    "Îles Mariannes du Nord",
    "Îles Marshall",
    "Îles Mineures Éloignées des États-Unis",
    "Îles Salomon",
    "Îles Turks et Caïques",
    "Îles Vierges britanniques",
    "Îles Vierges des États-Unis",
    "Inde",
    "Indonésie",
    "Irak",
    "Iran",
    "Irlande",
    "Islande",
    "Israël",
    "Italie",
    "Jamaïque",
    "Japon",
    "Jersey",
    "Jordanie",
    "Kazakhstan",
    "Kenya",
    "Kirghizistan",
    "Kiribati",
    "Koweït",
    "Laos",
    "Lesotho",
    "Lettonie",
    "Liban",
    "Libéria",
    "Libye",
    "Liechtenstein",
    "Lituanie",
    "Luxembourg",
    "Macédoine",
    "Madagascar",
    "Malaisie",
    "Malawi",
    "Maldives",
    "Mali",
    "Malte",
    "Maroc",
    "Martinique",
    "Maurice",
    "Mauritanie",
    "Mayotte",
    "Mexique",
    "Moldavie",
    "Monaco",
    "Mongolie",
    "Monténégro",
    "Montserrat",
    "Mozambique",
    "Myanmar",
    "Namibie",
    "Nauru",
    "Népal",
    "Nicaragua",
    "Niger",
    "Nigéria",
    "Niue",
    "Norvège",
    "Nouvelle-Calédonie",
    "Nouvelle-Zélande",
    "Oman",
    "Ouganda",
    "Ouzbékistan",
    "Pakistan",
    "Palaos",
    "Panama",
    "Papouasie-Nouvelle-Guinée",
    "Paraguay",
    "Pays-Bas",
    "Pérou",
    "Philippines",
    "Pitcairn",
    "Pologne",
    "Polynésie française",
    "Porto Rico",
    "Portugal",
    "Qatar",
    "R.A.S. chinoise de Hong Kong",
    "R.A.S. chinoise de Macao",
    "régions éloignées de l’Océanie",
    "République centrafricaine",
    "République démocratique du Congo",
    "République dominicaine",
    "République tchèque",
    "Réunion",
    "Roumanie",
    "Royaume-Uni",
    "Russie",
    "Rwanda",
    "Sahara occidental",
    "Saint-Barthélémy",
    "Saint-Kitts-et-Nevis",
    "Saint-Marin",
    "Saint-Martin",
    "Saint-Pierre-et-Miquelon",
    "Saint-Vincent-et-les Grenadines",
    "Sainte-Hélène",
    "Sainte-Lucie",
    "Samoa",
    "Samoa américaines",
    "Sao Tomé-et-Principe",
    "Sénégal",
    "Serbie",
    "Serbie-et-Monténégro",
    "Seychelles",
    "Sierra Leone",
    "Singapour",
    "Slovaquie",
    "Slovénie",
    "Somalie",
    "Soudan",
    "Sri Lanka",
    "Suède",
    "Suisse",
    "Suriname",
    "Svalbard et Île Jan Mayen",
    "Swaziland",
    "Syrie",
    "Tadjikistan",
    "Taïwan",
    "Tanzanie",
    "Tchad",
    "Terres australes françaises",
    "Territoire britannique de l'océan Indien",
    "Territoire palestinien",
    "Thaïlande",
    "Timor oriental",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinité-et-Tobago",
    "Tristan da Cunha",
    "Tunisie",
    "Turkménistan",
    "Turquie",
    "Tuvalu",
    "Ukraine",
    "Union européenne",
    "Uruguay",
    "Vanuatu",
    "Venezuela",
    "Viêt Nam",
    "Wallis-et-Futuna",
    "Yémen",
    "Zambie",
    "Zimbabwe"
  ];

  const allWOrds = words.concat(wikiWords).concat(countries);

  const currentGame = document.querySelector('.tab.active').id;   /* cemantix ou pedantix */
  var lang = currentGame.endsWith("ix") ? "fr" : "en";            /* fr ou en : cemantix ou cemantle*/

  /*  submit(allWOrds);   */
  const popup = createPopup(allWOrds);
  await new Promise((resolve) => setTimeout(resolve, 50));
  popup?.classList.remove("beginning");

  addListeners();

  const error = document.querySelector("#pedantix-error, #pedantle-error");   /* to fix */

  /*fonctions */

  async function myFetch(url, json = true) {
    return await fetch(url)
      .then(response => json ? response.json() : response.text())
      .catch(error => console.error('Error:', error));
  }

  async function getWikiPage(key) {
    const content = await myFetch(`https://${lang}.wikipedia.org/api/rest_v1/page/html/${key}`, false);
    const textContent = new DOMParser().parseFromString(content, "text/html").body.textContent;
    return textContent;
  }

  async function getRandomWikiPage() {
    const res = await myFetch(`https://${lang}.wikipedia.org/api/rest_v1/page/random/summary`);
    return await getWikiPage(res.titles.canonical);
  }

  async function getWikiSuggestions(word, limit = 10) {
    const res = await myFetch(`https://${lang}.wikipedia.org/w/rest.php/v1/search/title?q=${word}&limit=${limit}`);
    return res;
  }


  function handleWikiFieldset(textArea) {
    const form = document.querySelector("#wiki-form");
    const input = form.search;
    const descButton = form.descriptions;
    const contButton = form.contents;

    descButton.onclick = async () => {
      descButton.disabled = true;
      const jsonResult = await getWikiSuggestions(input.value, form.maxPages.value);
      const wordsList = jsonResult.pages.map((page) => page.description);
      textArea.value = wordsList.join("\n");
      descButton.disabled = false;
    };

    contButton.onclick = async () => {
      contButton.disabled = true;
      const jsonResult = await getWikiSuggestions(input.value, form.maxPages.value);
      const keys = jsonResult.pages.map((page) => page.key);
      let wordsList = "";
      for (const key of keys) {
        const textContent = await getWikiPage(key);
        wordsList += textContent.substring(0, form.maxWords.value * 5);
      }
      textArea.value = wordsList;
      contButton.disabled = false;
    }
  }

  async function submit(wordsList, meter) {
    const currentGame = document.querySelector('.tab.active').id;   /* cemantix ou pedantix */
    const input = document.querySelector(`#${currentGame}-guess`);
    const button = document.querySelector(`#${currentGame}-guess-btn`);

    document.body.dataset.stop = false;
    meter.value = 0;
    let score = 0;
    let resultString = '';
    for (const word of wordsList) {
      if (document.body.dataset.stop === "true") break;
      input.value = word;
      /* attend remise à z de l'input pour être sûr que le mot est bien pris en compte */
      while (input.value !== '') {
        button.click();
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
      meter.value += 100 / wordsList.length;
      score += error.innerText.includes("🟩") ? 1 : 0;
      resultString += `${word} : ${error.innerText}\n`;
    }
    return { score, resultString };
  };

  /*  Remplit l'input au clic sur un des mots de l'article (pedantix) ou un des mots déjà tentés (cemantix) */
  function addListeners() {
    document.querySelectorAll('#cemantix-guesses, #cemantle-guesses, #article').forEach(el => el.addEventListener('click', e => {
      document.querySelector('#my-search').value = e.target.innerText;
    }));
  }

  async function getFetchArray(url, selector){
    const res = await myFetch(url, false);
    const nodes = new DOMParser().parseFromString(res, "text/html").body.querySelectorAll(selector);
    return Array.from(nodes).map(node => node.innerText).join("\n");
  }

  function createPopup(words) {
    const popup = document.querySelector("#pedantix-popup") ?? document.createElement("div");
    if (popup.id) {
      popup.style.display = "block";
      return;
    }
    popup.id = "pedantix-popup";
    popup.classList.add("beginning");

    popup.innerHTML = `
    <h1>🤑 HELPER 🤑</h1>
    <button id = "close-popup">X</button>
    <textarea id="pedantix-text" rows="10"></textarea>
    <div id = p-buttons>
        <button id="pedantix-submit">➤ Envoyer</button>
        <button id="pedantix-stop">❌ Arrêter</button>
    </div>
    <form id = "wiki-form">
      <fieldset id="wiki-fieldset">
        <button type="button" name = "random" class = "small" title = "Page Wikipédia au hasard">?</button>
        <!-- <button type = "button" name = "nextWord" class = "small" title = "Mot suivant">⇒</button> -->
        <button type="button" name = "synonyms" class = "small" title = "Synonymes">Syn</button>
        <input name = "search" id = "my-search" type = "text"> 
        <img src="https://logo.clearbit.com/wikipedia.org" alt="wikipedia logo" width="30" height="30">
        <label for = "maxPages">Pages</label>
        <input name = "maxPages" type="number" min="1" max="50" value="4">
        <label for = "maxWords"> Mots</label>
        <input name = "maxWords" type="number" min="100" max="10000" value="150">
        <button name = "descriptions" type="button" title = "Descriptions de pages Wikipédia pour le mot recherché">Descriptions </button>
        <button name = "contents" type="button" title = "Pages Wikipédia pour le mot recherché">Contenus </button>
      </fieldset>
    </form>
    <meter id="p-meter" value="0" min="0" max="100"></meter>
    `;
    document.body.appendChild(popup);
    const form = document.querySelector("#wiki-form");
    const textarea = document.querySelector("#pedantix-text");
    textarea.value = words.join("\n");
    form.random.onclick = async (e) => {
      const words = await getRandomWikiPage();
      textarea.value = words;
    };
    document.querySelector("#pedantix-submit").onclick = async () => {
      const text = document.querySelector("#pedantix-text").value;
      const words = text.replace(/[^a-zA-ZÀ-ÿ0-9]/g, " ").split(/\s+/).filter((w) => w.trim() !== "");
      const meter = document.querySelector("#p-meter");
      const { score, resultString } = await submit(words, meter);
      document.querySelector("#pedantix-text").value = resultString;
    };
    document.querySelectorAll("#close-popup, #close-popup-inner")
      .forEach(el => el.onclick = () => popup.remove());

    document.querySelector("#pedantix-stop").onclick = () => document.body.dataset.stop = true;

    form.synonyms.onclick = async () => {
      let url, selector;
      switch (lang) {
        case "en":
          url = "https://www.collinsdictionary.com/us/dictionary/english-thesaurus/";
          selector = ".headwordSense";
          break;
        case "fr":
          url = "https://www.cnrtl.fr/synonymie/";
          selector = ".syno_format";
          break;
      }
      textarea.value = await getFetchArray(url + form.search.value, selector);
    };

    handleWikiFieldset(textarea);

    /*
    form.nextWord.onclick = () => {
      const bestGuesses = document.querySelectorAll(".word.close");
      const bestGuessesText = Array.from(bestGuesses).map((el) => el.innerText);
      const nbWords = bestGuessesText.length;
      if (nbWords === 0) return;
      const currentIndex = form.search.value ? bestGuessesText.indexOf(form.search.value) : -1;
      form.search.value = bestGuessesText[(currentIndex + 1) % nbWords];
    };
    */

    const style = document.createElement("style");
    document.head.appendChild(style);
    style.id = "pedantix-popup-style";
    style.innerHTML = `
    #pedantix-popup {
        width: 650px;
        position: fixed;
        z-index: 9999;
        /*
        top: 25vh;
        right: calc(50vw - 300px); 
        */
       top: 3vh;
       right: 5vw;
        background-color: white;
        padding: 10px;
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        transition: all .5s ease;

        h1{
            color: teal;
            margin: 0 auto;
            background: aliceblue;
        }

        textarea{
            width: 70%;
            height: 135px;
            margin-top: 10px;
            border: 1px solid teal;
            border-radius: 5px;
            padding: 5px;
        }

        #close-popup{
            position: absolute;
            top: 10px;
            right: 10px;
            background: #ff000024;
            border: none;
            cursor: pointer;
            color: red;
            font-size: 20px;
            padding: 5px;
        }

        #p-buttons{
            display: flex;
            flex: 1;
            justify-content: space-between;
            width: 72%;
            margin: 5px auto 8px;
          }

          button{
            border: none;
            cursor: pointer;
            background: teal;
            color: white;
            border-radius: 5px;
            padding: 5px;
            min-width: 80px;
        }

        button.small{
          min-width: unset;
        }

        fieldset{
          display: flex;
          position: relative;
          height: 25px;
          place-content: space-between;
          align-items: center;
          color: black;
          border: none;
          background: #f0f0f0;

          select{
            position: absolute;
            left: 9px;
            top: -20px;
          }

          button:disabled{
            opacity: .5;
            cursor: not-allowed;
          }

          input{
          margin: 1;
            max-width: 80px;
            padding: 1px 3px;
          }

          input[name=maxWords]{
            width: 70px;
          }

          input[name=maxPages]{
            width: 40px;
          }

          img{
            border-radius: 50%;
          }

        }

        meter{
            position: absolute;
            top: -5px;
            left: 0;
            width: 100%;
            z-index: 50;
        }
    }
    #pedantix-popup.beginning{
        opacity: 0;
        top: 0;
        transform: scale(.2);
    }
    body:has(#pedantix-popup) > *:not(#pedantix-popup) {
        opacity: .6;
  }

  .word.close, article .w{
    display: inline-block !important;
    cursor: pointer;
  }
  .word.close:active, article .w:active{
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2) !important;
  }
  .word.close:hover, article .w:hover{
    scale: 1.2;
    outline: 1px solid #e96ac6;
  }

  body:has(article .w:active) #my-search,
  body:has(td.word.close:active) #my-search{
    scale: 1.2;
  }
 `;

    return popup;

  }


})();
