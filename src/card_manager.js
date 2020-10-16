import {randomInt_MaxExcluded, setStyle} from './utility';
import {Card} from './card';

const unicodeEmoji = require("unicode-emoji");
const omitWhere = { category: ['flags'], version: ['12.1', '13.0'] };
const emojis = unicodeEmoji.getEmojis(omitWhere);
// console.log(emojis);

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

          }.bind(this), 1500);

        } else {
          console.log("le due card non hanno stesso id, coprili di nuovo");

          setTimeout(function() {
            this.coverCard(event.target);
            this.coverCard(selectedCard.target);
          }.bind(this), 1500);

          card.focus = false;
          selectedCard.card.focus = false;
        }

        setTimeout(function() {
          selectedCard.card = null;
          selectedCard.target = null;

          flag = true;
        }.bind(this), 1500);

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

export { CardManager }
