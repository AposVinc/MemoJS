// npx webpack --config webpack.config.js --watch
const unicodeEmoji = require("unicode-emoji");

const omitWhere = { category: ['flags'], version: ['12.1', '13.0'] };
const emojis = unicodeEmoji.getEmojis(omitWhere);

console.log(emojis);

window.addEventListener('load', function component() {

  // let randomIntFromInterval = function (min, max) { // min and max included
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // }
  let randomInt_MaxExcluded = function (max) {
    return Math.floor(Math.random() * max);
  }

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

  let h1 = createElementAttachedToParent('h1', header);
  h1.innerHTML = 'MemoJS';
  setStyle(h1, {
    textAlign: 'center',
    fontSize: '48px'
  });

  let content = createElementAttachedToParent('div', app);
  setStyle(content, {
    position: 'absolute',
    top: '15%',
    bottom: 0,
    left: 0,
    right: 0,

    textAlign: 'center',
    backgroundColor: '#d1d1d1',
    padding: '8px'
  });

  let Card = function(id) {
    this.id = id;
    this.count = 0;
    let card;

    let init = (function() {

      card = document.createElement('div');
      setStyle(card, {
        position: 'relative',
        width: '15%',
        height: '15%',

        display: 'inline-block',
        padding: '16px',
        margin: '2px',
        // minHeight: '120px',
        boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
        backgroundColor: '#fff'
      });

      // let card_title = createElementAttachedToParent('h5', card);
      // card_title.innerHTML = emojis[this.id].description;

      let card_emoji = createElementAttachedToParent('p', card);
      card_emoji.innerHTML = emojis[this.id].emoji;
      setStyle(card_emoji, {
        margin: '10px',
        fontSize: 'xx-large'
      });

    }).bind(this);

    this.attach = function(parentElement){
      parentElement.appendChild(card);
    };

    init();

  };


  let CardManager = function (context) {
    let cardlist = [];

    this.newCard = function() {
      let id = randomInt_MaxExcluded(emojis.length);
      let card1 = new Card(id);
      let card2 = new Card(id);
      cardlist.push(card1, card2);
    };

    this.generateCards = () => {
      let list = [...cardlist];
      let index_max = list.length;

      while (list.length){
        let index = randomInt_MaxExcluded(index_max);
        list[index].attach(context);
        list[index].count++;
        if (list[index].count > 1){
          list.splice(index,1);
          index_max--;
        }
      }

    }

    this.list = cardlist;
  };

  let cm = new CardManager(content);

  let i = 0;
  while (i < 15){
    cm.newCard();
    i++;
  }

  cm.generateCards();

  cardmanager = cm;







}, false )

