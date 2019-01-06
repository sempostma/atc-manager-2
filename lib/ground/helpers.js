const deg_to_dms = (exports.deg_to_dms = deg => {
  var d = Math.floor(deg);
  var minfloat = (deg - d) * 60;
  var m = Math.floor(minfloat);
  var secfloat = (minfloat - m) * 60;
  var s = Math.round(secfloat);
  // After rounding, the seconds might become 60. These two
  // if-tests are not necessary if no rounding is done.
  if (s == 60) {
    m++;
    s = 0;
  }
  if (m == 60) {
    d++;
    m = 0;
  }
  return [d, m, s];
});

const deg_to_dms_fmt = (exports.deg_to_dms_fmt = (lat, lng) => {
  const [latd, latm, lats] = deg_to_dms(lat);
  const latdir = lat > 0 ? 'N' : 'S';
  const [lngd, lngm, lngs] = deg_to_dms(lng);
  const lngdir = lat > 0 ? 'E' : 'W';
  return `${latd}° ${latm}' ${lats}'' ${latdir}, ${lngd}° ${lngm}' ${lngs}'' ${lngdir}`;
});
