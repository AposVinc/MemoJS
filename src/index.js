// npx webpack --config webpack.config.js --watch
const unicodeEmoji = require("unicode-emoji");

const omitWhere = { category: ['flags'], version: ['12.1', '13.0'] };
const emojis = unicodeEmoji.getEmojis(omitWhere);

window.addEventListener('load', function component() {

  let setStyle = function (element, style) {
    for (let property in style) {
      element.style[property] = style[property];
    }
  };

  let createElementAttachedToParent = function (tag, parent = null){
    let element = document.createElement(tag);
    if (parent !== null){
      parent.appendChild(element);
    }
    return element;
  };

  let app = document.createElement('div');
  app.id = 'app';
  setStyle(app,{
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });
  document.body.appendChild(app);

  let header = createElementAttachedToParent('header', app);
  setStyle(header, {
    position: 'absolute',
    top: 0,
    bottom: '85%',
    left: 0,
    right: 0,

    padding: '15px',
    color: '#fff',
    backgroundColor: '#000'
  });

  let div_w3center = createElementAttachedToParent('div', header);
  setStyle(div_w3center, {
    textAlign: 'center'
  });

  let h1 = createElementAttachedToParent('h1', div_w3center);
  h1.innerHTML = 'MemoJS';
  setStyle(h1, {
    fontSize: '48px'

  });


  let row = createElementAttachedToParent('div', app);
  setStyle(row, {
    position: 'absolute',
    top: '15%',
    bottom: 0,
    left: 0,
    right: 0,

    textAlign: 'center',
    backgroundColor: '#d1d1d1',
    padding: '8px'
  });

  let Card = function() {
    this.id = Math.floor(Math.random() * (emojis.length));
    let card;

    let init = (function() {

      card = createElementAttachedToParent('div', row);
      setStyle(card, {
        position: 'relative',
        width: '15%',

        display: 'inline-block',
        padding: '16px',
        margin: '2px',
        // minHeight: '120px',
        boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
        backgroundColor: '#fff'
      });

      let card_title = createElementAttachedToParent('h3', card);
      card_title.innerHTML = emojis[this.id].description;

      let card_emoji = createElementAttachedToParent('p', card);
      card_emoji.innerHTML = emojis[this.id].emoji;
      setStyle(card_emoji, {
        display: 'inline-block',

        margin: '10px',
        fontSize: '50px'
      });

    }).bind(this);

    this.attach = function(parentElement){
      parentElement.appendChild(card);
    };

    init();

  };

  let card1 = new Card();
  card1.attach(row);

  let card2 = new Card(1);
  card2.attach(row);

  let card3 = new Card();
  card3.attach(row);

  let card4 = new Card();
  card4.attach(row);

  let card5 = new Card();
  card5.attach(row);

  let card6 = new Card();
  card6.attach(row);








}, false )

