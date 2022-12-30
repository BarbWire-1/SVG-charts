/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */

/*
* Copyright (c) 2022 Barbara Kälin - https://github.com/BarbWire-1/SVG-charts
* All rights reserved.
* MIT License
*/
import { Data, Background } from "./Data.js";

export class Pie extends Data {
    constructor (id, data) {
        super(data)
        this.background = new Background(id);
        this.id = id + '_pie';
        this.layout = super.layout;
    }

    pie = {
        x: 180,
        y: 180,
        r: 200,
        strokeWidth: 150
    }
// TODO calc and append slices here
}
