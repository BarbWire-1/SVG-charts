/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
let defaultColors = [ '#4a4e4d', '#0e9aa7', '#3da4ab', '#f6cd61', '#fe8a71' ];
let defaultData = [ { value: 1 }, { value: 1 }, { value: 2 }, { value: 2 }, { value: 3 } ];

class Background {
    constructor (
        id,
        x,
        y,
        width,
        height,
        backgroundColor)
    {
        this.id = id 
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


export class Data{
   
    constructor ( data, id) { 
        this.layout = {
            colors: defaultColors,
            legend: 1,
            percentage: 1,
            color: 'white',
            fontSize: 24
        };
        this.data = data;
        this.id = id;
        this.layout = {
            colors: defaultColors,
            legend: 1,
            percentage: 1,
            color: 'white',
            fontSize: 24
        };
    }
}

export class Pie extends Data {
    constructor (id) {
        super()
        this.data = super.data;
        this.background = new Background(id);
        this.id = id;
        this.layout = super.layout;
    }
    pie = {
        x: 180,
        y: 180,
        r: 200,
        strokeWidth: 150
    }
    
}
