import config from './config';

export const rndArr = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const upcase = str => {
  return str[0].toUpperCase() + str.slice(1);
};

export const logErr = err => {
  console.error(err);
  window.setTimeout(() => { throw err; }, 0);
};

export const debounce = (func, wait, immediate) => {
  var timeout;
  return () => {
    var context = this,
      args = arguments;
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
  while (str.length < length) str = padChar + str;
  return str;
};

export const getParameterByName = (name, url) => {
  if (typeof window === 'undefined') return;
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const gamestoreFramesTimeFmt = time => {
  const minutes = Math.floor(((time / 1000) * config.updateInterval) / 60);
  const seconds = Math.floor(((time / 1000) * config.updateInterval) % 60);
  return `${lpad('' + minutes, '0', 2)}:${lpad('' + seconds, '0', 2)}`;
};

export const polyBounds = polygon => {
  const xmin = Math.min(...polygon.map(x => x[0]));
  const ymin = Math.min(...polygon.map(x => x[1]));
  const xmax = Math.max(...polygon.map(x => x[0]));
  const ymax = Math.max(...polygon.map(x => x[1]));
  return [ymax, xmax, ymin, xmin];
};

export const average = values => values.reduce((a, b) => a + b) / values.length;

export const polygonInside = (point, vs) => {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

  var x = point[0],
    y = point[1];

  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i][0],
      yi = vs[i][1];
    var xj = vs[j][0],
      yj = vs[j][1];

    var intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};

export const dist = (pos1, pos2) =>
  Math.sqrt(
    Math.pow(Math.abs(pos2.x - pos1.x), 2) +
    Math.pow(Math.abs(pos2.y - pos1.y), 2)
  );

export const distSq = (pos1, pos2) =>
  Math.pow(Math.abs(pos2.x - pos1.x), 2) +
  Math.pow(Math.abs(pos2.y - pos1.y), 2);
