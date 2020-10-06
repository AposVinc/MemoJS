// npx webpack --config webpack.config.js --watch
const unicodeEmoji = require("unicode-emoji");

const omitWhere = { category: ['flags'], version: ['12.1', '13.0'] };
const emojis = unicodeEmoji.getEmojis(omitWhere);

// console.log(emojis);

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
    let card;
    this.focus = false;

    let init = (function() {

      card = document.createElement('div');
      this.setStyle(card, {
        position: 'relative',
        width: '15%',
        height: '15%',

        display: 'inline-block',
        padding: '16px',
        margin: '2px',
        // minHeight: '120px',
        boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
        backgroundColor: '#1c1c1c'
      });

      // let card_title = createElementAttachedToParent('h5', card);
      // card_title.innerHTML = emojis[this.id].description;

      let card_emoji = createElementAttachedToParent('p', card);
      card_emoji.innerHTML = emojis[this.id].emoji;
      this.setStyle(card_emoji, {
        margin: '10px',
        fontSize: 'xx-large',
        display: 'none'
      });

      card.addEventListener('click', () => {
        let e = new Event('selectCard'); //tutte le op sul div le gestiamo sul div tranne quella della creazione
        card.dispatchEvent(e);
      });


    }).bind(this);

    this.attach = function(parentElement){
      parentElement.appendChild(card);
    };

    this.detach = function() {
      card.parentElement.removeChild(card); //a causa della closure ha il binding con la vaiabile interna, percio se fuori dall oggetto faccio " pippo = square.detach() " funziona comunque
    };

    this.handleEvent = function (eventType, callback) {
      card.addEventListener(eventType, callback);
    }.bind(this);

    init();

  };
  Card.prototype.setStyle = setStyle;

  let CardManager = function (context) {
    let cardlist = [];
    let flag = true;
    let selectedCard = {
      card: null,
      target: null
    };

    this.newCard = function() {
      let id = randomInt_MaxExcluded(emojis.length);
      let card1 = new Card(id);
      let card2 = new Card(id);

      card1.handleEvent('selectCard', (event) => {
        this.handleClick(card1, event)
      });
      card2.handleEvent('selectCard', (event) => {
        this.handleClick(card2, event)
      });

      cardlist.push(card1, card2);
    };

    this.handleClick = function(card, event) {
      if (flag) {
        if (!selectedCard.card && !card.focus) { //selecteCard = null e focus = false
          this.discoverCard(event.target);

          card.focus = !card.focus;
          selectedCard.card = card;
          selectedCard.target = event.target;
          flag = true;
          return ;
        }
        if (selectedCard.card && card.focus) { //selecteCard = OK e focus = t
          this.coverCard(event.target);

          card.focus = !card.focus;
          selectedCard.card = null;
          selectedCard.target = null;
          flag = true;
          return ;
        }

        if (selectedCard.card && !card.focus) { //selecteCard = OK e focus = f
          this.discoverCard(event.target);

          if (selectedCard.card.id === card.id){
            console.log("hanno lo stesso id");

            setTimeout(function() {
              selectedCard.card.detach();
              card.detach();

              //togli anche dalla lista

            }.bind(this), 2500);

          } else {
            console.log("le due card non hanno stesso id, coprili di nuovo");

            setTimeout(function() {
              this.coverCard(event.target);
              this.coverCard(selectedCard.target);
            }.bind(this), 2500);

            card.focus = false;
            selectedCard.card.focus = false;
          }

          setTimeout(function() {
            selectedCard.card = null;
            selectedCard.target = null;

            flag = true;
          }.bind(this), 2500);

        }

        flag = false;
      }
    };

    this.generateCards = () => {
      let list = [...cardlist];
      let index_max = list.length;

      while (list.length){
        let index = randomInt_MaxExcluded(index_max);
        list[index].attach(context);
        list.splice(index,1);
        index_max--;
      }
    }
    this.list = cardlist;
  };
  CardManager.prototype.setStyle = setStyle;
  CardManager.prototype.coverCard = function(target) {
    this.setStyle(target, {
      backgroundColor: '#1c1c1c'
    });
    this.setStyle(target.firstChild, {
      display: 'none'
    });
  }
  CardManager.prototype.discoverCard = function(target) {
    this.setStyle(target, {
      backgroundColor: '#fff'
    });
    this.setStyle(target.firstChild, {
      display: ''
    });
  }


  let cm = new CardManager(content);

  let i = 0;
  while (i < 15){
    cm.newCard();
    i++;
  }

  cm.generateCards();

  cardmanager = cm;







}, false )

