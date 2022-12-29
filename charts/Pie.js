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
export class PieData {
    testcounter = 0
    constructor (
        id = `tesPie`,
       
        width = 600,
        height = 600,
       
        x = 180,
        y = 180,
        r = 200,
        strokeWidth = 150,
        data = defaultData,
        colors = defaultColors,
       
        legend = 1,
        percentage = 1,
        color = 'white',
        fontSize = 24
        
    ) {
        
        this.id = id
           
        this.width = width,
            this.height = height,
            // pie-settings
            this.x = x,
            this.y = y,
            this.r = r,
            this.strokeWidth = strokeWidth,
            this.data = data,
            this.colors = colors,
            // legend
            this.legend = legend,
            this.percentage = percentage,
            this.color = color,
            this.fontSize = fontSize
            
       
    
        // 
        // getId() { return this.id };
        // setId(newValue) { this.id = newValue};
        // getWidth() { return this.width };
        // setWidth(newValue) { this.width = newValue ; pieChart(this) }
        // getHeight() { return this.height };
        // setHeight(newValue) { this.height = newValue ; pieChart(this) }
        // getX() { return this.x };
        // setX(newValue) { this.x = newValue;}
    
    
   

    }
}

