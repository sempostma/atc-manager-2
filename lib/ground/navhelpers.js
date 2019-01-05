const R = 6378.137; // Radius of earth in KM

export const latLngDist = (lat1, lon1, lat2, lon2) => {
  var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d * 1000; // meters
};

export const meterPerLatLng = (lat, lng) => {
  lat *= 0.0174532925;
  lng *= 0.0174532925;
  return [
    111132.954 - 559.822 * Math.cos(2 * lng) + 1.175 * Math.cos(4 * lng),
    111132.954 * Math.cos(lat)
  ];
};

export const bearing = (lat1, lng1, lat2, lng2) => {
  var dLon = lng2 - lng1;
  var y = Math.sin(dLon) * Math.cos(lat2);
  var x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  var brng = toDeg(Math.atan2(y, x));
  return 360 - ((brng + 360) % 360);
};

export const toDeg = rad => (rad * 180) / Math.PI;
export const toRad = deg => (deg * Math.PI) / 180;
