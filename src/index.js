// npx webpack --config webpack.config.js --watch
import style from '../assets/css/style.css';

window.addEventListener('load', function component() {

  const span = document.createElement('span');
  span.innerHTML = "ciaooooo";

  document.body.appendChild(span);

}, false )

