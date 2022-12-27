/*
* Copyright (c) 2022 Barbara Kälin
* All rights reserved.
* MIT License
*/

import { createSVG } from "../helpers/createSVG.js";
import { getCoords } from "../helpers/getCoords.js";
import { randomHex } from "../helpers/randomHex.js";

    // TODO delete unneeded ONLY TESTING
    const parser = new DOMParser();
    const SVG = "http://www.w3.org/2000/svg";

    let pieCount = 0;
    export function pieChart(obj) {

        // colors
        // legend

        let total = 0;
        let vals = [];
        let sliceCount = 0;

        // PREPARE DATA
        obj.data.sort((a, b) => b.value - a.value)
            .forEach(el => vals.push(el.value));

        obj.data.forEach(el => total += el.value);

        let strokeW = Math.min(obj.strokeWidth, obj.r);
        let data = vals;//???

        //TODO create this dynamically - IF AT ALL
        // else set shadow on svg-container
        const container = document.getElementById(obj.id);
        container.style.width = obj.width + 'px';
        container.style.height = obj.height + 'px';

        let slices = [];
        // does this array make any sense?
        const degPercent = 360 / total
        for (let i = 0; i < obj.data.length; i++) {
            slices.push(
                {   // start at end of previous
                    sweepAngle: degPercent * data[ i ],
                    startAngle: slices[ i - 1 ]?.startAngle + slices[ i - 1 ]?.sweepAngle || 0,
                    percent: `${Math.round(degPercent * data[ i ] / 3.6)}%`,
                    stroke: obj.colors[ i ] || randomHex(),
                    opacity: 1,
                }

            )
        };

        const cx = obj.x + obj.r;
        const cy = obj.y + obj.r;

        // calculate to move stroke inside chosen radius
        const _radius = obj.r - strokeW / 2;

        const newPie = document.createElementNS(SVG, 'svg')
        newPie.setAttribute('id', 'pieContainer' + pieCount);
        //TODO ev get own x,y for container
        // add dropShadow here to remove outer div for responsiveness https://www.w3docs.com/snippets/css/how-to-create-an-svg-drop-shadow.html
        // newPie.setAttribute('x', obj.x);
        // newPie.setAttribute('y', obj.y);
        newPie.setAttribute('width', '100%');
        newPie.setAttribute('height', '100%');
        newPie.setAttribute('class', 'pie');




        container.appendChild(newPie);

        const pie = document.getElementById('pieContainer' + pieCount)

        slices.forEach(s => {
            console.log(s.stroke)

            //TODO assign end of slice i-1 to start of slice i directly!!
            //SLICES
            const a = s.startAngle;
            const o = a + s.sweepAngle;
            const charRadius = _radius
            const start = getCoords(cx, cy, _radius, a);
            const char = getCoords(cx, cy, charRadius, a + s.sweepAngle / 2)

            const end = getCoords(cx, cy, _radius, o);
            const dir = s.sweepAngle > 0 ? 1 : 0;
            const swap = Math.abs(s.sweepAngle) % 360 < 180 ? 0 : 1;
            const close = (Math.abs(Math.ceil(s.sweepAngle)) >= 360) ? 'z' : ''

            const d =
                `M ${start.x} ${start.y} A ${_radius} ${_radius}  0 ${swap} ${dir} ${end.x} ${end.y} ${close}`;

            const path = {
                'type': 'path',
                'options': {
                    id: `slice${pieCount}${sliceCount}`,
                    class: "slice",
                    d: d,
                    stroke: s.stroke,
                    strokeWidth: strokeW,
                    opacity: 1,
                    fill: 'none'
                }
            };

            // CREATE DOM Slices
            const newSlice = createSVG(path.type, path.options);
            // newSlice.setAttribute('stroke', randomFill());
            pie.appendChild(newSlice);



            // PERCENTAGE 
            if (obj.percentage) {
                let percString =
                    // TODO why does this need to be wrapped in an additional svg in order to get rendered???
                    // and text doesn't get applied if created different than using parser????
                    `<svg><text id="perc${pieCount}${sliceCount}" class="perc" x="${char.x}" y="${char.y}"  font-size="${obj.fontSize}px" font-weight="bolder" text-anchor="middle" alignment-baseline="central" fill="${obj.color}" opacity="1" text-content="${s.percent}">${s.percent}</text></svg>`

                // CREATE DOM PERCENTAGE
                const newTest = parser.parseFromString(percString, 'text/html').body.childNodes[ 0 ];
                pie.appendChild(newTest);
            }
            sliceCount++;
        });

        pieCount++;
    };