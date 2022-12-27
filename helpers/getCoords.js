/*
* Copyright (c) 2022 Barbara Kälin - https://github.com/BarbWire-1/SVG-charts
* All rights reserved.
* MIT License
*/

export function getCoords(cx, cy, r, deg) {
    let radians = (deg - 90) * Math.PI / 180.0;

    return {
        x: cx + (r * Math.cos(radians)),
        y: cy + (r * Math.sin(radians))
    };
};
