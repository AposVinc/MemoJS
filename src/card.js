"use strict";

import {createElementAttachedToParent, setStyle} from './utility';

const unicodeEmoji = require("unicode-emoji");
const omitWhere = { category: ['flags'], version: ['12.1', '13.0'] };
const emojis = unicodeEmoji.getEmojis(omitWhere);
// console.log(emojis);

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

    let card_emoji = createElementAttachedToParent('p', card);
    card_emoji.innerHTML = emojis[this.id].emoji;
    this.setStyle(card_emoji, {
      margin: '10px',
      fontSize: 'xx-large',
      display: 'none'
    });

    card.addEventListener('click', () => {
      let e = new Event('selectCard');
      card.dispatchEvent(e);
    });


  }).bind(this);

  this.attach = function(parentElement){
    parentElement.appendChild(card);
  };

  this.detach = function() {
    card.parentElement.removeChild(card);
  };

  this.handleEvent = function (eventType, callback) {
    card.addEventListener(eventType, callback);
  }.bind(this);

  init();

};

Card.prototype.setStyle = setStyle;

export { Card }
