// npx webpack --config webpack.config.js --watch
"use strict";
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

  /*
  SETTINGS -----------------------------------------------------------------------------
  */
  // let settings = createElementAttachedToParent('form', content);
  let settings = createElementAttachedToParent('div', content);
  setStyle(settings, {
    paddingTop: '60px',
    paddingBottom: '60px',
  });

  let form_title = createElementAttachedToParent('h2', settings);
  form_title.innerHTML = "Impostazioni";
  setStyle(form_title, {
    fontWeight: 400,
    fontSize: '30px'
  });

  let section_form = createElementAttachedToParent('div', settings);
  setStyle(section_form, {
    marginTop: '16px',
    marginBottom: '16px'
  });

  let label = createElementAttachedToParent('label', section_form);
  label.innerHTML = "Numero di coppie da generare:";
  label.setAttribute('for', 'numberOfPair');

  let input = createElementAttachedToParent('input', section_form);
  input.setAttribute("id", "numberOfPair");
  input.setAttribute('type', "number");
  input.setAttribute('min', 1);
  input.setAttribute('max', 15);
  // input.setAttribute('required', "required");
  input.setAttribute("placeholder", 15);
  setStyle(input, {
    padding: '8px'
  });

  let startButton = createElementAttachedToParent('button', settings);
  label.setAttribute('type', 'submit');
  startButton.innerHTML = "START";
  setStyle(startButton, {
    fontWeight: 900,
    fontSize: '24px',
    padding: '8px 16px',
    border: 'none',
    color: '#fff',
    backgroundColor: '#1c1c1c',
  });

  /*
  END SETTINGS -------------------------------------------------------------------------
  */

  let cm = new CardManager(content);

  startButton.addEventListener('click', () => {
    let number = input.value;
    if(number){
      cm.generateCards(number);
    } else {
      cm.generateCards();
    }
    content.removeChild(settings);
  });



}, false )

