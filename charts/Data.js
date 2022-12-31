/*
* Copyright (c) 2022 Barbara Kälin - https://github.com/BarbWire-1/SVG-charts
* All rights reserved.
* MIT License
*/
let defaultColors = [ '#4a4e4d', '#0e9aa7', '#3da4ab', '#f6cd61', '#fe8a71' ];
const defaultData = [ {text: 'A', value: 3 }, {text: 'B', value: 1 }, { value: 2 }, { value: 3 }, { value: 1 } ];

export class Background {
    constructor (
        id,
        x,
        y,
        width,
        height,
        backgroundColor)
    {
        this.id = id +'_bg'
        this.style = {
            x: x || 0,
            y: y || 0,
            width: width || 600,
            height: height || 600,
            backgroundColor: backgroundColor || '#f6f4f4'
        }
    }
    
    // TODO create background here once chart gets instantiated
};


// PREPARE DATA FOR SEVERAL USES
export class Data {
   
    constructor (arr) {
        // set input data to private
        
        // anotherTest.data[ 0 ].value = 1.11111
        // this gets applied at instance, but not here at data
        this.data = arr || defaultData;
        this.values = this.data.map(item => item.value);
        this.total = this.values.reduce((a, b) => a + b);
        this.sortedValues = this.values.sort((a, b) => a - b);
        this.percent = this.values.map(val => Math.round(val * 100 / this.total))
        
       
            
       
    };
    
    
};

// export class Pie extends Data {
//     constructor (id, data) {
//         super(data)
//         this.background = new Background(id);
//         this.id = id + '_pie';
//         this.layout = super.layout;
//     }
//  
//     pie = {
//         x: 180,
//         y: 180,
//         r: 200,
//         strokeWidth: 150
//     }
//     
// }
