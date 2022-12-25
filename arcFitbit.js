/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */

function polarToCartesian(centerX, centerY, radiusX, radiusY, angleDegrees) {
    let angleRadians = (angleDegrees - 90) * Math.PI / 180.0;

    return {
        x: (centerX + (radiusX * Math.cos(angleRadians))),
        y: (centerY + (radiusY * Math.sin(angleRadians)))
    };
}

// a is the object containg fake settings to calculate and pass d to path
export function calcArc(a = null) {

    // need to type-cast all atr, as they get returned as string!!!
    let width = +a?.[ 'data-width' ] || 200;
    let height = +a?.[ 'data-height' ] || 200;
    let x = +a?.[ 'data-x' ] || 68;
    let y = +a?.[ 'data-y' ] || 68;
    let startAngle = +a?.[ 'start-angle' ] || 0;
    let sweepAngle = +(a?.[ 'sweep-angle' ]) || 90;
    sweepAngle = Math.abs(sweepAngle) >= 360 ? 359.99 : sweepAngle;
    let strokeWidth = +a?.[ 'stroke-width' ] || 20;


    const center = {
        cx: (x + (width / 2)),
        cy: (y + (height / 2))
    }

    const innerRadiusX = (width - strokeWidth) / 2;
    const innerRadiusY = (height - strokeWidth) / 2;

    const start = (polarToCartesian(center.cx, center.cy, innerRadiusX, innerRadiusY, startAngle));
    const end = (polarToCartesian(center.cx, center.cy, innerRadiusX, innerRadiusY, startAngle + sweepAngle));

    const dir = sweepAngle > 0 ? 1 : 0;
    const swap = Math.abs(sweepAngle) % 360 < 180 ? 0 : 1;
    const close = (Math.abs(Math.ceil(sweepAngle)) >= 360) ? 'z' : ''

    const d =
        `M ${+start.x} ${+start.y} A ${+innerRadiusX} ${+innerRadiusY}  0 ${+swap} ${+dir}  ${+end.x} ${+end.y} ${close}`
    return d;
};


const parser = new DOMParser();

export function createArc() {

    const customShapes = document.getElementById('customShapes');
    // here all relevant properties are set in the svg mainly as data-* (switch all to data?)
    // TODO this could later be transformed to a valid fitbit-syntax for arc-tag
    const arcString =
        `<svg id="none"  class="arc" x="0" data-x="68" data-y="68" y="0"  width="100%"  height="100%"  data-width="200" data-height="200" stroke-width="20" start-angle="0" sweep-angle="90" stroke="none" opacity="1" data-tag="arc"><path id="arc-path" fill="none" stroke="inherit" stroke-width="20" opacity="1" d="M 168 78 A 90 90 0 0 1 258 168"></path></svg>`

    //d="M 168 78 A 90 90 0 0 1 258 168"

    const newArc = parser.parseFromString(arcString, 'text/html').body.childNodes[ 0 ];
    customShapes.appendChild(newArc);
    newArc.setAttribute('id', `arc${numShapes}`);

    // TODO do I really need to get handle on it here? go on node and childElement directly?
    let myNewArc = document.getElementById(`arc${numShapes}`)
    let path = myNewArc.getElementById('arc-path')
    myNewArc.setAttribute('stroke', randomFill());
    path.setAttribute('stroke', myNewArc.getAttribute('stroke'));
    path.setAttribute('id', `arc-path${numShapes}`);
    activeElement = settings(myNewArc);


    active = path.id

    numShapes++

}
