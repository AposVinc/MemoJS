"use strict";


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

export { randomInt_MaxExcluded, setStyle, createElementAttachedToParent }

