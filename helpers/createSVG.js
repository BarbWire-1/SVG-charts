/*
* Copyright (c) 2022 Barbara Kälin - https://github.com/BarbWire-1/SVG-charts
* All rights reserved.
* MIT License
*/

const SVG = "http://www.w3.org/2000/svg";
export function createSVG(elTag, elProps) {

    elTag = document.createElementNS(SVG, elTag);
    for (const prop in elProps) {
        elTag.setAttributeNS(null, prop.replace(/[A-Z]/g, function (upper) {
            return "-" + upper.toLowerCase();
        }), elProps[ prop ]);
    }
    return elTag
};