// npx webpack --config webpack.config.js --watch
import { setStyle, createElementAttachedToParent } from './utility';
import { CardManager } from './card_manager';

window.addEventListener('load', function component() {

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



  let cm = new CardManager(content);
  cm.generateCards(15);



}, false )

