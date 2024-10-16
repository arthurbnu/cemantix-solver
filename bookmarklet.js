javascript: (async () => {

  const lang = document.documentElement.lang;

  /* synonymes */
  const synConfig = {
    en: {
      url: "https://www.collinsdictionary.com/us/dictionary/english-thesaurus/",
      selector: ".headwordSense"
    },
    fr: {
      url: "https://www.cnrtl.fr/synonymie/",
      selector: ".syno_format"
    }
  };
  /* mots sémantiquement proches */
const semanticallyCloseconfig = {
    en: {
      url: "https://corsproxy.io/?https://relatedwords.org/relatedto/",
      selector: ".words li"
    },
    fr: {
      url : "https://corsproxy.io/?https://www.autourdumot.fr/champ-lexical/",
      selector : "#res li"
    }
  };
  const [synAPI, semanticallyCloseAPI] = [synConfig[lang], semanticallyCloseconfig[lang]];

  /* liste initiale (mots fréquents + pays) */
  const gitUrl = "https://raw.githubusercontent.com/arthurbnu/cemantix-solver/refs/heads/main";
  const fileName = lang === "fr" ? "mots" : "words";
  const wordsList = await myFetch(`${gitUrl}/liste%20initiale/${fileName}.json`);

  const allCountries = await myFetch('https://restcountries.com/v3.1/all');
  const countries = (lang === "fr") ? allCountries.map(c => c.translations.fra.common) : allCountries.map(c => c.name.common);

  const script = await myFetch(`${gitUrl}/script.js`, false);
  document.body.appendChild(document.createElement("script")).textContent = script;

  createPopup([...wordsList, ...countries]);

  addListeners();

  /* fonctions */

  function mySelector(...arr) {
    return arr.map(selector => document.querySelector(selector));
  }

  async function myFetch(url, json = true) {
    return await fetch(url)
      .then(response => json ? response.json() : response.text())
      .catch(error => console.error('Error:', error));
  }

  async function getWikiPage(key) {
    const content = await myFetch(`https://${lang}.wikipedia.org/api/rest_v1/page/html/${key}`, false);
    const parser = new DOMParser().parseFromString(content, "text/html");
    parser.querySelectorAll('script, style').forEach(e => e.remove());
    return parser.body.innerText;
  }

  async function getRandomWikiPage() {
    const res = await myFetch(`https://${lang}.wikipedia.org/api/rest_v1/page/random/summary`);
    return await getWikiPage(res.titles.canonical);
  }

  async function getWikiSuggestions(word, limit = 10) {
    return await myFetch(`https://${lang}.wikipedia.org/w/rest.php/v1/search/title?q=${word}&limit=${limit}`);
  }

  function handleWikiFieldset(textArea) {
    const form = document.querySelector("#wiki-form");
    const [input, btnDesc, btnCont] = [form.search, form.descriptions, form.contents];

    btnDesc.onclick = async () => {
      btnDesc.disabled = true;
      const jsonResult = await getWikiSuggestions(input.value, form.maxPages.value);
      const wordsList = jsonResult.pages.map((page) => page.description);
      textArea.value = wordsList.join("\n");
      btnDesc.disabled = false;
    };

    btnCont.onclick = async () => {
      btnCont.disabled = true;
      const jsonResult = await getWikiSuggestions(input.value, form.maxPages.value);
      const keys = jsonResult.pages.map((page) => page.key);
      let wordsList = "";
      for (const key of keys) {
        const textContent = await getWikiPage(key);
        wordsList += textContent.substring(0, form.maxWords.value * 5);
      }
      textArea.value = wordsList;
      btnCont.disabled = false;
    }
  }

  /* soumet tous les mots de la textarea et affiche le résultat pour chaque mot */
  async function submit() {
    const currentGame = document.querySelector('.tab.active').id;   /* cemantix | cemantle ou pedantix | pedantle */
    const [textarea, meter, guessInput, guessButton, error, drawNode] =
      mySelector("#pedantix-text", "#p-meter", `#${currentGame}-guess`, `#${currentGame}-guess-btn`, `#${currentGame}-error`, "#success-draw");
    const wordsList = textarea.value.replace(/[^a-zA-ZÀ-ÿ0-9]/g, " ").split(/\s+/).filter((w) => w.trim() !== "");

    document.body.dataset.stop = false;
    meter.value = 0;
    let resultString = '';
    for (const word of wordsList) {
      if (document.body.dataset.stop === "true") break;
      guessInput.value = word;
      /* attend remise à z de l'input pour être sûr que le mot est bien pris en compte */
      let tries = 0;
      while (guessInput.value !== '' && tries < 10) {
        guessButton.click();
        await new Promise(resolve => setTimeout(resolve, 20));
        tries++;
      }
      meter.value += 100 / wordsList.length;
      if (currentGame.startsWith('pedant'))    /* pedantix | pedantle : résultat au fur et à m */
        resultString += `${word} : ${error.innerText}\n`;
    }

    /* cemantix | cemantle : résultat déterminé à la fin */
    if (currentGame.startsWith('cemant')) {
      const wordNodes = document.querySelectorAll('.word.close');
      for (node of wordNodes) {
        if (wordsList.includes(node.innerText)) {
          node.classList.add('animating');
          const emoji = node.nextElementSibling.nextElementSibling.innerText;
          resultString += `${node.innerText} : ${emoji}\n`;

          setTimeout(() => {
            for (animatingNode of document.querySelectorAll('.word.animating'))
              animatingNode.classList.remove('animating')
          }
            , 1800);
        }
      }
    }
    textarea.value = resultString;

    const gameWon = document.querySelector(`#${currentGame}-success`).style.display === 'block';

    if (gameWon)
      draw(textarea, drawNode.innerText);

    textarea.classList.toggle('p-success', gameWon);
  }

  function draw(textarea, drawContent) {
    textarea.value = '';
    for (let i = 0; i < drawContent.length; i++)
      setTimeout(() => textarea.value += drawContent[i], i * 7);
  }

  /* Remplit l'input au clic sur un des mots de l'article (pedantix) ou un des mots déjà tentés (cemantix) */
  /* Soumet la recherche de synonymes au double clic ou clic droit */
  function addListeners() {
    const [searchInput, synButton] = mySelector("#my-search", '[title="Synonymes"]');
    const wordsZoneSelector = "#cemantix-guesses, #cemantix-guessed, #cemantle-guesses, #cemantle-guessed, #article";
    const clickOnSynButton = e => synButton.click();
    const fillSearch = e => {
      e.preventDefault();
      textClicked = e.target.innerText.trim();
      if (isNaN(textClicked))
        searchInput.value = textClicked;
    };
    document.querySelectorAll(wordsZoneSelector).forEach(zone => {
      zone.addEventListener('click', fillSearch);
      zone.addEventListener('dblclick', clickOnSynButton);
      zone.addEventListener('contextmenu', e => { fillSearch(e); clickOnSynButton(e); });
    });
  }

  async function getFetchArray(url, selector, max = 50) {
    const res = await myFetch(url, false);
    const nodes = new DOMParser().parseFromString(res, "text/html").body.querySelectorAll(selector);
    const arr = Array.from(nodes).map(node => node.innerText).slice(0, max);
    return arr.join("\n");
  }

  function createPopup(words) {
    const popup = document.querySelector("#pedantix-popup") ?? document.createElement("div");
    if (popup.id)
      return alert("Script déjà appelé.. Réactualiser la page pour éviter les confits.");

    popup.id = "pedantix-popup";
    popup.classList.add("beginning");

    popup.innerHTML = `
    <meter id="p-meter" value="0" min="0" max="100"></meter>
    <h1>🤑 HELPER 🤑</h1>
    <pre id = "success-draw" style = "display: none">
           \n                xx xxxxxx x x xx\n      xxx                      xx \n  xx         xxxxx    xxxxx      x \n  x          x   x   xx   xx      x\n  x          xxxxx    xxxxxx       x\n  x                                  x\n x              xxxxx               xx\n x             xxxxx       x       x\n x       xx               xx      x\n  x       xxx           xx      xx \n  xx        xxxxxx xxxxxx     xxx \n     xx            xx       xxx \n        xxx                xxx \n              xxx          xxx \n                 x x xxxxx\n   
    </pre>
    <button id = "close-popup">X</button>
    <textarea id="pedantix-text" rows="10"></textarea>
    <div id = p-buttons>
        <button id="pedantix-submit">➤ Envoyer</button>
        <button id="pedantix-stop">❌ Arrêter</button>
    </div>
    <form id = "wiki-form">
      <fieldset id="wiki-fieldset">
        <button type="button" name = "synonyms" class = "small" title = "Synonymes">Syn</button>
        <input name = "search" id = "my-search" type = "text"> 
        <img src="https://logo.clearbit.com/wikipedia.org" alt="wikipedia logo" width="30" height="30">
        <button type="button" name = "random" class = "small" title = "Page Wikipédia au hasard">?</button>
        <label>Pages</label>
        <input name = "maxPages" type="number" min="1" max="50" value="4">
        <label> Mots</label>
        <input name = "maxWords" type="number" min="100" max="10000" value="150">
        <button name = "descriptions" type="button" title = "Descriptions de pages Wikipédia pour le mot recherché">Descriptions </button>
        <button name = "contents" type="button" title = "Pages Wikipédia pour le mot recherché">Contenus </button>
      </fieldset>
    </form>
    `;

    document.body.appendChild(popup);
    const [form, textarea, btnSubmit, btnClose, btnStop] = mySelector("#wiki-form", "#pedantix-text", "#pedantix-submit", "#close-popup", "#pedantix-stop");
    const setText = text => textarea.value = text;
    setText(words.join("\n"));

    form.random.onclick = async () => setText(await getRandomWikiPage());
    btnSubmit.onclick = submit;
    btnClose.onclick = () => popup.remove();
    btnStop.onclick = () => document.body.dataset.stop = true;

    form.synonyms.onclick = async () => {
      const synonyms = await getFetchArray(synAPI.url + form.search.value, synAPI.selector);
      const semanticallyClose = await getFetchArray(semanticallyCloseAPI.url + form.search.value, semanticallyCloseAPI.selector);
      setText(synonyms + semanticallyClose);
      submit();
    };

    handleWikiFieldset(textarea);

    const style = document.createElement("style");
    document.head.appendChild(style);
    style.id = "pedantix-popup-style";
    style.innerHTML = `
    #pedantix-popup {
        position: fixed;
        z-index: 9999;
        width: 650px;
        top: 3vh;
        right: 5vw;
        background-color: #ffffffbf;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        transition: opacity,top,transform .5s ease;
        resize: vertical;
        overflow: hidden;
        max-height: fit-content;

        h1{
            color: teal;
            margin: 0 auto;
        }

        textarea{
            width: 70%;
            height: 135px;
            margin-top: 5px;
            border: 1px solid teal;
            border-radius: 5px;
            padding: 5px;
            transition: height 4s;
        }

        textarea.p-success{
          height: 260px;
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
          padding-top: 8px;
          place-content: space-between;
          align-items: center;
          color: black;
          border: none;
          background: linear-gradient(to top, #0096881a 0%, #ffffff3b 100%);

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
  .word.close.animating{
    animation: highlight 1s infinite
  }

  @keyframes highlight {
    0% {
      background-color: violet;
    }
    100% {
      background-color: transparent;
    }
  }

  body:has(article .w:active) #my-search,
  body:has(td.word.close:active) #my-search{
    scale: 1.2;
  }

  #pedantix-popup:has(#pedantix-submit:hover) textarea,
  #pedantix-popup:has([name=synonyms]:hover) #my-search,
  #pedantix-popup:has([name=descriptions]:hover) #my-search,
  #pedantix-popup:has([name=contents]:hover) #my-search{
    text-shadow: 0 0 5px #ffee10;
  }

 `;

    setTimeout(() => popup.classList.remove("beginning"), 50);  /* pour l'animation */

  }


})();
