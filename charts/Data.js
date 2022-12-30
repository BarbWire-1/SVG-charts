/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */


/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
let defaultColors = [ '#4a4e4d', '#0e9aa7', '#3da4ab', '#f6cd61', '#fe8a71' ];
const defaultData = [ {text: 'A', value: 3 }, {text: 'B', value: 1 }, { value: 2 }, { value: 3 }, { value: 1 } ];
// console.log(defaultData.reduce((acc, obj) => {
//     return acc + obj.value;
// }, 0))


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


// PREPARE DAT FOR SEVERAL USES
export class Data {
    constructor (arr) { 
        this.data = arr || defaultData;
        this.total = this.data.reduce((acc, obj) => {
            return acc + obj.value;
        }, 0);
        this.values = this.data.map(item => item.value);
        this.sortedValues = this.values.sort((a, b) => a - b);
    };
   
};

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
    
}
