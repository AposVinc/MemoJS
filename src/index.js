// npx webpack --config webpack.config.js --watch

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






}, false )

