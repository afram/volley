function isBrowser() {
  return typeof window !== 'undefined';
}

function isSupported() {
  return window.getComputedStyle;
}

function readPseudo(pseudo) {
  pseudo = ':' + pseudo;
  return window.getComputedStyle(document.querySelector('body'), pseudo)
  .getPropertyValue('content')
  .replace(/(\"|\')/g, '');
}

function fire(fn) {
  setTimeout(fn, 0); // fire on next tick;
}

module.exports.isBrowser = isBrowser;
module.exports.isSupported = isSupported;
module.exports.readPseudo = readPseudo;
module.exports.fire = fire;
