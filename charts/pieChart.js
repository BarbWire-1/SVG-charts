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

    // CREATE HOLDING DIV AND SVG VIEWBOX

    let container = Object.assign(document.createElement('div'), { id: obj.id });
    document.body.appendChild(container);

    container.style.width = `${obj.width}px`;
    container.style.height = obj.height + 'px';
    container.className = 'pie';


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
                value: sortedValues[i]
            }

        )
    };



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
        let sort = sliceCount;
        //VARIABLES FOR PATH
        const a = s.startAngle;
        const o = a + s.sweepAngle;
        const start = getCoords(cx, cy, _radius, a);
        const charCoords = getCoords(cx, cy, _radius, a + s.sweepAngle / 2)
        const end = getCoords(cx, cy, _radius, o);
        const dir = s.sweepAngle > 0 ? 1 : 0;
        const swap = Math.abs(s.sweepAngle) % 360 < 180 ? 0 : 1;
        const close = (Math.abs(Math.ceil(s.sweepAngle)) >= 360) ? 'z' : ''
        const d =
            `M ${start.x} ${start.y} ` +
            `A ${_radius} ${_radius} ` +
            `0 ${swap} ${dir} ` +
            `${end.x} ${end.y} ` +
            `${close}`;

        const path = {
            'type': 'path',
            'options': {
                id: `slice${pieCount}_${sliceCount}`,
                class: "slice tooltip",
                d: d,
                stroke: s.stroke,
                strokeWidth: strokeWidth,

            }
        };
        function createInfo() {
            let ringR = obj.r + 8;
            let start = getCoords(cx, cy, ringR, a);
            let end = getCoords(cx, cy, ringR, o);
            const ringD =
                `M ${start.x} ${start.y} ` +
                `A ${ringR} ${ringR} ` +
                `0 ${swap} ${dir} ` +
                `${end.x} ${end.y} ` +
                `${close}`;
                
            const ring = {
                'type': 'path',
                'options': {
                    id: `ring${pieCount}_${sliceCount}`,
                    class: "ring",
                    d: ringD,
                    stroke: s.stroke,
                    strokeWidth: 6,
                    opacity: .6,
                    strokeLinecap: 'round'
        
                }
            };
            
            const newRing = createSVG(ring.type, ring.options);
            newPie.appendChild(newRing);
            const toolTipString =
                `<svg  id="toolTip${pieCount}_${sliceCount}" width="150px" height="100px" x ="${charCoords.x -75}px" y="${charCoords.y-40}px">
                    <rect width="100%" height="100%" fill="black" opacity="0.5" rx="5px" ry="5px"></rect>
                    <text class="tooltiptext" ` +
                    `x ="50%" y="50%" `+
                    `font-size="22" text-anchor="middle" fill = "white" dominant-baseline="central">
                    <tspan x="50%" y="30px">DATA</tspan>
                    <tspan x="50%" y="60px">${s.value}</tspan>
                    </text >
                 </svg >`
            // CREATE DOM PERCENTAGE
            let newToolTip = parser.parseFromString(toolTipString, 'text/html').body.childNodes[ 0 ];
            newPie.appendChild(newToolTip);
            perc.style.opacity = 0;

        };
        
        
        function removeInfo() {
            document.getElementById(`ring${pieCount}_${sliceCount}`)?.remove();
            document.getElementById(`toolTip${pieCount}_${sliceCount}`)?.remove();
            perc.style.opacity = 1;
            
        }

        // CREATE DOM ELS
        const newSlice = createSVG(path.type, path.options);
        newPie.appendChild(newSlice);




        // PERCENTAGE 
        if (obj.percentage) {
           
            let percString =
                // TODO why does this need to be wrapped in an additional svg in order to get rendered???
                // and text doesn't get applied if created different than using parser????
                `<svg>
                    <text id="perc${pieCount}_${sliceCount}" class="perc" ` +
                    `x="${charCoords.x}" y="${charCoords.y}" `+
                `font-size="${obj.fontSize}px"  fill="${obj.color}" dominant-baseline="central">${s.percent}</text>
                </svg>`

            // CREATE DOM PERCENTAGE
            const newPerc = parser.parseFromString(percString, 'text/html').body.childNodes[ 0 ];
            newPie.appendChild(newPerc);


        };
        let perc = document.getElementById(`perc${pieCount}_${sliceCount}`);
       
        let shownData = [ sortedValues[ sort ], s.percent, ]
        let slice = document.getElementById(`slice${pieCount}_${sliceCount}`);
        console.log(slice)
        
        // // CREATE on click???
        // function myFunction() {
        //     var popup = document.getElementById("myPopup");
        //     popup.classList.toggle("show");
        // }
     
        // TODO Why do values sometimes disappear on mouseleave???
        
       perc.addEventListener('click', (e) => {
            perc.style.opacity = 1;
            // isClicked = document.getElementById(e.target.id)
            //removeInfo();
            createInfo();
       });
        slice.addEventListener('click', (e) => {
            perc.style.opacity = 1;
            // isClicked = document.getElementById(e.target.id)
            //removeInfo();
            createInfo();
        });
             
          
        slice.addEventListener('mouseleave', () => {
           
            removeInfo();
            perc.style.opacity = 1;
            
        });
       
           
       

       
        
        sliceCount++;
    });

    pieCount++;
};


// TODO decide whether to make it a custom-component or just palce setters here

