const name = 'atc-manager-2-game-persistance-v3';
let val = null;

export const loadState = function () {
  if (val === null) {
    const json = typeof window !== 'undefined' ? localStorage.getItem(name) : null;
    if (json) {
      val = JSON.parse(json);
      return val;
    } else {
      return {
        games: {},
      };
    }
  } else {
    return val;
  }
};

export const saveState = function (state) {
  val = state;
  const str = JSON.stringify(state, decimalFormatter(2));
  localStorage.setItem(name, str);
};

export const decimalFormatter = decimals => (key, val) => val !== undefined && val.toFixed ? +val.toFixed(decimals) : val;

