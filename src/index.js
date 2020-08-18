// npx webpack --config webpack.config.js --watch
const emojiList = require("unicode-emoji");

window.addEventListener('load', function component() {

  let setStyle = function (element, style) {
    for (let property in style) {
      element.style[property] = style[property];
    }
  };

  let createElementWithClasses = function (tag, classes = [], parent = null){
    let element = document.createElement(tag);
    classes.forEach( c => element.classList.add(c));
    if (parent !== null){
      parent.appendChild(element);
    }
    return element;
  };

  let app = document.createElement('div');
  app.id = 'app';
  document.body.appendChild(app);

  let header = createElementWithClasses('header', ['w3-container', 'w3-theme'], app);
  setStyle(header, {
    padding: '15px'
  });

  let div_w3center = createElementWithClasses('div', ['w3-center'], header);
  let h1 = createElementWithClasses('h1', ['w3-xxxlarge', 'w3-animate-bottom'],div_w3center);
  h1.innerHTML = 'MemoJS';

  let container = createElementWithClasses('div', ['w3-container'],app);
  setStyle(container, {
    backgroundColor: '#d1d1d1'
  });

  let row = createElementWithClasses('div', ['w3-row-padding', 'w3-center,', 'w3-margin-top'],container);

  let Card = function(title) {
    let w3Third, card;

    let init = (function() {
      w3Third = createElementWithClasses('div', ['w3-third']);
      card = createElementWithClasses('div', ['w3-card', 'w3-container'], w3Third);

      setStyle(card, {
        'min-height': '120px'
      });

      let card_title = createElementWithClasses('h3', ['w3-margin-bottom', 'w3-text-theme'], card);
      card_title.innerHTML = emojiList.getEmojis()[690].description;

      let card_emoji = createElementWithClasses('p', [], card);
      card_emoji.innerHTML = emojiList.getEmojis()[690].emoji;
      setStyle(card_emoji, {
        margin: '20px',
        'font-size': '80px'
      });

    }).bind(this);

    this.attach = function(parentElement){
      parentElement.appendChild(w3Third);
    };

    init();

  };

  var card1 = new Card();
  card1.attach(row)







}, false )

