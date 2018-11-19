
export const loadCSS = url => {
  if (typeof window === 'undefined') return;
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
};


export const loadJS = url => {
  if (typeof window === 'undefined') return;
  var link = document.createElement('script');
  link.type = 'text/javascript';
  link.src = url;
  document.body.appendChild(link);
};


