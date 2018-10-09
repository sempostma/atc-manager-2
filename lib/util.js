import config from './config';

export const rndArr = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const upcase = str => {
  return str[0].toUpperCase() + str.slice(1);
};

export const debounce = (func, wait, immediate) => {
  var timeout;
  return () => {
    var context = this, args = arguments;
    var later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const lpad = (str, padChar, length) => {
  while (str.length < length)
    str = padChar + str;
  return str;
};

export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const gamestoreFramesTimeFmt = time => `${lpad('' + Math.floor(time / 1000 * config.updateInterval / 60), '0', 2)}:\
${lpad('' + Math.floor(time / 1000 * config.updateInterval % 60), '0', 2)}`;