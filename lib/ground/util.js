const fs = require('fs');

exports.last = arr => arr[arr.length - 1];

exports.dump = (name, obj) => fs.writeFileSync(`${name}.dump.json`, JSON.stringify(obj, null, 4));

const R = 6378.137; // Radius of earth in KM

exports.latLngDist = (lat1, lon1, lat2, lon2) => {
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // meters
};

exports.meterPerLatLng = (lat, lng) => {
    return [
        111132.954 - 559.822 * Math.cos(2 * lng) + 1.175 * Math.cos(4 * lng),
        111132.954 * Math.cos(lat)
    ];
};



