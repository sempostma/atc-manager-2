
let val = null;

export const loadState = function () {
  if (val === null) {
    const json = typeof window !== 'undefined' ? localStorage.getItem('atc-manager-2-game-persistance-v2') : null;
    if (json) {
      val = JSON.parse(json);
      return val;
    } else {
      return {
        games: {},
      }
    }
  } else {
    return val;
  }
}

export const saveState = function (state) {
  val = state;
  const str = JSON.stringify(state, function (key, val) {
    return val !== null && val !== undefined && val.toFixed ? +val.toFixed(3) : val;
  });
  localStorage.setItem('atc-manager-2-game-persistance-v2', str);
}

