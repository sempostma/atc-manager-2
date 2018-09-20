
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

