// npx webpack --config webpack.config.js --watch

window.addEventListener('load', function component() {

  let setStyle = function (element, style) {
    for (let property in style) {
      element.style[property] = style[property];
    }
  };

  let createElementWithClasses = function (tag, classes = []){
    let element = document.createElement(tag);
    classes.forEach( c => element.classList.add(c));
    return element;
  };

  let app = document.createElement('div');
  app.id = 'app';
  document.body.appendChild(app);

  let header = createElementWithClasses('header', ['w3-container', 'w3-theme']);
  setStyle(header, {
    padding: '15px'
  });

  let div = createElementWithClasses('div', ['w3-center']);
  header.appendChild(div);
  let h1 = createElementWithClasses('h1', ['w3-xxxlarge', 'w3-animate-bottom']);
  h1.innerHTML = 'MemoJS';
  div.appendChild(h1);

  app.appendChild(header);

  let container = createElementWithClasses('div', ['w3-container']);
  setStyle(container, {
    backgroundColor: '#d1d1d1'
  })
  app.appendChild(container);

  let row = createElementWithClasses('div', ['w3-row-padding', 'w3-center,', 'w3-margin-top']);
  container.appendChild(row);




}, false )

