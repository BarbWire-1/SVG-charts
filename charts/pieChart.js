/*
* Copyright (c) 2022 Barbara Kälin - https://github.com/BarbWire-1/SVG-charts
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

    let total = 0;
    let sortedValues = [];
    let slices = [];
    let sliceCount = 0;

    const cx = obj.x + obj.r;
    const cy = obj.y + obj.r;

    const strokeWidth = Math.min(obj.strokeWidth, obj.r);
    const _radius = obj.r - strokeWidth / 2;


    // PREPARE DATA
    obj.data.sort((a, b) => b.value - a.value)
        .forEach(el => {
            sortedValues.push(el.value);
            total += el.value;
        }
        );
    const degPercent = 360 / total;

    for (let i = 0; i < obj.data.length; i++) {
        slices.push(
            {   // start at end of previous
                sweepAngle: degPercent * sortedValues[ i ],
                startAngle: slices[ i - 1 ]?.startAngle + slices[ i - 1 ]?.sweepAngle || 0,
                percent: `${Math.round(degPercent * sortedValues[ i ] / 3.6)}%`,
                stroke: obj.colors[ i ] || randomHex(),
                opacity: 1,
            }

        )
    };

    // CREATE HOLDING DIV AND SVG VIEWBOX
    const container = document.getElementById(obj.id);
    container.style.width = obj.width + 'px';
    container.style.height = obj.height + 'px';
    container.className = 'pie'

    const pieSVG = {
        'type': 'svg',
        'options': {
            id: `pieContainer${pieCount}`,
            // class: 'pie',
            x: obj.x,
            y: obj.y,
            width: '100%',
            height: '100%',
        }
    };
    const newPie = createSVG(pieSVG.type, pieSVG.options)
    container.appendChild(newPie);

    // CALCULATE AND APPEND SLICES
    // TODO check wether to do this in the initial for loop
    slices.forEach(s => {

        //VARIABLES FOR PATH
        const a = s.startAngle;
        const o = a + s.sweepAngle;
        const charRadius = _radius
        const start = getCoords(cx, cy, _radius, a);
        const charCoords = getCoords(cx, cy, charRadius, a + s.sweepAngle / 2)
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
                strokeWidth: strokeWidth,
                opacity: 1,
                fill: 'none'
            }
        };

        // CREATE DOM ELS
        const newSlice = createSVG(path.type, path.options);
        newPie.appendChild(newSlice);

        // PERCENTAGE 
        if (obj.percentage) {
            let percString =
                // TODO why does this need to be wrapped in an additional svg in order to get rendered???
                // and text doesn't get applied if created different than using parser????
                `<svg><text id="perc${pieCount}${sliceCount}" class="perc" x="${charCoords.x}" y="${charCoords.y}"  font-size="${obj.fontSize}px" font-weight="bolder" text-anchor="middle" alignment-baseline="central" fill="${obj.color}" opacity="1" text-content="${s.percent}">${s.percent}</text></svg>`

                // CREATE DOM PERCENTAGE
                const newPerc = parser.parseFromString(percString, 'text/html').body.childNodes[ 0 ];
                newPie.appendChild(newPerc);

        };
        sliceCount++;
    });

    pieCount++;
};

 
// TODO decide whether to make it a custom-component or just palce setters here

