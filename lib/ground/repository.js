const fs = require('fs');
const dat = name => fs.readFileSync(`data/${name}.dat`).toString();

exports.apt_nav = () => dat('apt_nav');
exports.earth_astro = () => dat('earth_astro');
exports.earth_nav = () => dat('earth_nav');
exports.earth_fix = () => dat('earth_fix');
exports.earth_awy = () => dat('earth_awy');
exports.apt = () => dat('apt');

exports.apts_sliced = (lat, lng) => {
    const x = Math.floor(lat) + 180;
    const y = Math.floor(lng) + 180;
    return fs.readFileSync(`data/tiles/${x}/${y}.dat`).toString();
};

exports.apt_icao = icao => {
    return fs.readFileSync(`data/airports/${icao.toUpperCase()}.dat`).toString();
};



