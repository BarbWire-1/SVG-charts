/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */

/*
* Copyright (c) 2022 Barbara Kälin - https://github.com/BarbWire-1/SVG-charts
* All rights reserved.
* MIT License
*/
//import { pieChart } from "./pieChart";

let defaultColors = [ '#4a4e4d', '#0e9aa7', '#3da4ab', '#f6cd61', '#fe8a71' ];
let defaultData = [ { value: 1 }, { value: 1 }, { value: 2 }, { value: 2 }, { value: 3 } ];
// pieChart(pieObj3);
export class Pie {
    constructor (
        id = undefined,
        // bg-dimensions
        width= 600,
        height= 600,
        // pie-settings
        x= 180,
        y= 180,
        r= 200,
        strokeWidth= 150,
        data= defaultData,
        colors= defaultColors,
        // legend
        legend= 1,
        percentage= 1,
        color= 'white',
        fontSize= 18
    )
    {
        this.id = id;
        this.width = width;
    }
    
    getId() { return this.id };
    setId(newValue) { this.id = newValue };
    getWidth() { return this.width };
    setId(newValue) { this.width = newValue; pieChart(this) }
    
}




