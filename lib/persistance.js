import LZString from './lz-string';

export const loadState = function () {
  const val = typeof window !== 'undefined' ? localStorage.getItem('game-persistance') : null;
  if (val) {
    const json = LZString.decompress(val);
    return JSON.parse(json);
  }
  return {
    games: {},
  }
}

export const saveState = function (state) {
  const str = JSON.stringify(state, function (key, val) {
    return val !== null && val !== undefined && val.toFixed ? +val.toFixed(3) : val;
  });
  const data = LZString.compress(str);
  localStorage.setItem('game-persistance', data);
}

