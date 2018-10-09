const smoothing = 0.2;

const line = (pointA, pointB) => {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointA[1];
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX)
  };
};

const controlPoint = (current, previous, next, reverse) => {
  const p = previous || current;
  const n = next || current;
  const o = line(p, n);
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;
  const x = current[0] + Math.cos(angle) * length;
  const y = current[1] + Math.sin(angle) * length;
  return [x, y];
};

const bezierCommand = (point, i, a) => {
  const cps = controlPoint(a[i - 1], a[i - 2], point);
  const cpe = controlPoint(point, a[i - 1], a[i + 1], true);
  return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
};

export const svgPath = points => {
  const d = points.reduce((acc, point, i, a) => i === 0
    ? `M ${point[0]},${point[1]}`
    : `${acc} ${bezierCommand(point, i, a)}`
    , '');
  return d;
};

export const getStyle = (ilsPathColor, sepVialationCircleColor) => `text {
  font: 1em 'Helvetica';
  fill: #fff;
}
span.down {
  color: #f00;
}
span.up {
  color: #0f0;
}
.airplane circle {
  fill: #fff;
}
.airplane line, .airplane path {
  stroke: #fff;
  stroke-width: 1;
  fill: none;
}
.airplane.inbound line, .airplane.inbound path, .airplane.inbound rect {
  stroke: #bbf;
}
.airplane.outbound line, .airplane.outbound path, .airplane.outbound rect {
  stroke: #bfb;
}
.airplane.enroute line, .airplane.enroute path, .airplane.enroute rect {
  stroke: #ffb;
}
.airplane.vfr-closed-pattern-touch-and-go line, .airplane.vfr-closed-pattern-touch-and-go path, .airplane.vfr-closed-pattern-touch-and-go rect, 
.airplane.vfr-outbound line, .airplane.vfr-outbound path, .airplane.vfr-outbound rect,
.airplane.vfr-enroute line, .airplane.vfr-enroute path, .airplane.vfr-enroute rect, 
.airplane.vfr-inbound-full-stop line, .airplane.vfr-inbound-full-stop path, .airplane.vfr-inbound-full-stop rect,
.airplane.vfr-inbound-touch-and-go line, .airplane.vfr-inbound-touch-and-go path, .airplane.vfr-inbound-touch-and-go rect,
.airplane.vfr-closed-pattern-full-stop line, .airplane.vfr-closed-pattern-full-stop path, .airplane.vfr-closed-pattern-full-stop rect {
  stroke: rgb(194, 135, 80);
}
.airplane.inbound text, .airplane.inbound circle {
  fill: #bbf;
}
.airplane.outbound text, .airplane.outbound circle {
  fill: #bfb;
}
.airplane.enroute text, .airplane.enroute circle {
  fill: #ffb;
}
.airplane.vfr-closed-pattern-touch-and-go text, .airplane.vfr-closed-pattern-touch-and-go circle,
.airplane.vfr-outbound text, .airplane.vfr-outbound circle,
.airplane.vfr-enroute text, .airplane.vfr-enroute circle,
.airplane.vfr-inbound-full-stop text, .airplane.vfr-inbound-full-stop circle,
.airplane.vfr-inbound-touch-and-go text, .airplane.inbound-touch-and-go circle,
.airplane.vfr-closed-pattern-full-stop text, .airplane.vfr-closed-pattern-full-stop circle {
  fill: rgb(194, 135, 80);
}
.airplane tspan.up {
  fill: #0f0;
}
.airplane tspan.down {
  fill: #f00;
}
.waypoint circle {
  fill: #fff;
}
.waypoint path {
  stroke: #fff;
}
.rwy-line {
  stroke: #fff;
  stroke-width: 3;
  opacity: 0.7;
}
.ils-line {
  stroke: ${ilsPathColor};
  stroke-width: 1;
}
.background path {
  fill: #1e606b;
}
.airplane circle.sep {
  fill: ${sepVialationCircleColor};
  fill-opacity: 0.2;
  stroke: #f00;
}
.rwy-name {
  text-anchor: middle;
}
`;

