
export const loadState = function () {
  const val = typeof window !== 'undefined' ? localStorage.getItem('atc-manager-2-game-persistance') : null;
  if (val) {
    return JSON.parse(val);
  }
  return {
    games: {},
  }
}

export const saveState = function (state) {
  const str = JSON.stringify(state, function (key, val) {
    return val !== null && val !== undefined && val.toFixed ? +val.toFixed(3) : val;
  });
  localStorage.setItem('atc-manager-2-game-persistance', str);
}

