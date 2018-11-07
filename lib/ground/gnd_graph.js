const { parseAptNav, parseApt } = require('./spec');
const { apt_nav, apts_sliced } = require('./repository');
const AStar = require('./pathfinding');

exports.findPath = apt => {
  // console.log(apt);

  const nodes = apt.taxiRoutingNetwork.nodes;
  const edges = apt.taxiRoutingNetwork.edges;

  console.log(JSON.stringify({ nodes, edges }, null, 4))
};



