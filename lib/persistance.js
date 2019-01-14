const name = 'atc-manager-2-game-persistance-v4';
let val = null;

const nullOrUndefined = x => x === undefined || x === null;

export const loadState = function () {
  if (val === null) {
    if (typeof window !== 'undefined' && localStorage.getItem(name)) migrate();

    const gamesJson =
      (typeof window !== 'undefined' &&
        localStorage.getItem(name + '-games')) ||
      '{}';
    const introTutorialJson =
      (typeof window !== 'undefined' &&
        localStorage.getItem(name + '-intro-tutorial')) ||
      'false';
    const timelapsesJson =
      (typeof window !== 'undefined' &&
        localStorage.getItem(name + '-timelapses')) ||
      '{}';
    const settingsJson =
      (typeof window !== 'undefined' &&
        localStorage.getItem(name + '-settings')) ||
      '{}';
    return {
      games: JSON.parse(gamesJson),
      introTutorial: JSON.parse(introTutorialJson),
      timelapses: JSON.parse(timelapsesJson),
      settings: JSON.parse(settingsJson)
    };
  } else {
    return val;
  }
};

export const saveState = function (state) {
  val = state;
  const gamesStr = JSON.stringify(state.games || {});
  const introTutorialStr = JSON.stringify(!!state.introTutorial);
  const timelapsesStr = JSON.stringify(state.timelapses || {});
  const settingsStr = JSON.stringify(state.settings || {});

  localStorage.setItem(name + '-games', gamesStr);
  localStorage.setItem(name + '-intro-tutorial', introTutorialStr);
  localStorage.setItem(name + '-timelapses', timelapsesStr);
  localStorage.setItem(name + '-settings', settingsStr);
};

export const decimalFormatter = decimals => (key, val) =>
  !nullOrUndefined(val) && val.toFixed ? +val.toFixed(decimals) : val;

const migrate = () => {
  const json = localStorage.getItem(name);
  const state = JSON.parse(json);
  const gamesStr = JSON.stringify(state.games || {});
  const introTutorialStr = JSON.stringify(!!state.introTutorial);
  const timelapsesStr = JSON.stringify(state.timelapses || {});
  const settingsStr = JSON.stringify(state.settings || {});

  localStorage.setItem(name + '-games', gamesStr);
  localStorage.setItem(name + '-intro-tutorial', introTutorialStr);
  localStorage.setItem(name + '-timelapses', timelapsesStr);
  localStorage.setItem(name + '-settings', settingsStr);
  localStorage.removeItem(name);
};

export const wipeServiceWorkerCache = async () => {
  if (typeof window !== 'undefined' && 'caches' in window) {
    const keys = await window.caches.keys();
    for(let i = 0; i < keys.length; i++) {
      if (keys[i].includes('atc-manager-2')) {
        await caches.delete(keys[i]);
      }
    }
  }
};
