/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */

window.onload = function () {
    
    //HELPERS
   function getCoords(cx, cy, r, deg) {
        let radians = (deg - 90) * Math.PI / 180.0;

        return {
            x: cx + (r * Math.cos(radians)),
            y: cy + (r * Math.sin(radians))
        };
    };
    function randomFill() {
        let randomFill = (`#${(`000000${(Math.floor(Math.random() * 16777215)).toString(16)}`).slice(-6)}`)
        return randomFill;
    };
    
    
    
    const SVG = "http://www.w3.org/2000/svg";
    function getNode(elTag, elProps) {

        elTag = document.createElementNS(SVG, elTag);
        for (const prop in elProps) {
            elTag.setAttributeNS(null, prop.replace(/[A-Z]/g, function (upper) {
                return "-" + upper.toLowerCase();
            }), elProps[ prop ]);
        }
        return elTag
    };
   
        
    
    
    
    
    
    let pieCount = 0;
    function createPie(obj) {
        
        
    
        //TODO data as obj.value
        // add params to function
        // colors
        // legend
       
        let total = 0;
        let vals = [];
        // sort values in descending order and push
        obj.data.sort((a, b) => b.value - a.value).forEach(el => vals.push(el.value))
            
        console.log(vals)
        //total = obj.data.reduce((a, b) => a + b);
        
        obj.data.forEach(el => total += el.value)
        let sliceCount = 0;
        
        strokeW = Math.min(obj.strokeWidth, obj.r);
        data = vals;
        
        //TODO create this dynamically
        const container = document.getElementById(obj.id);
        container.className = 'pie';
        container.style.width = obj.width+'px';
        container.style.height = obj.height+'px';
    
        let slices = [];
        for (let i = 0; i < obj.data.length; i++) {
        
            slices.push(
                {
                    startA: slices[ i - 1 ]?.startA + slices[ i - 1 ]?.sweepA || 0,
                    sweepA: 360 / total * data[ i ],
                    stroke: randomFill(),
                    opacity: 1,
                }
            
            )
        };
       
        const cx = obj.x + obj.r;
        const cy = obj.y + obj.r;
       
        // calculate to move stroke inside chosen radius
        const _radius = obj.r - strokeW / 2;
        
        /*
        const path = {
                'type': 'path', 'options': {
                    id: null, class: "slice", d: d, stroke: null, strokeWidth: strokeW, opacity: 1, fill: 'none'
                }
            };

            const newSlice = getNode(path.type, path.options);
            newSlice.setAttribute('stroke', randomFill());
            newSlice.setAttribute('id', `slice${sliceCount}`)
            document.getElementById('pieContainer' + pieCount).appendChild(newSlice);
        */
        // TODO perhaps replace with the function from editor...
        const newPie = document.createElementNS(SVG, 'svg')
        newPie.setAttribute('id', 'pieContainer'+ pieCount);
        newPie.setAttribute('x', obj.x);
        newPie.setAttribute('y', obj.y);
        newPie.setAttribute('width', '100%');
        newPie.setAttribute('height', '100%');
        container.appendChild(newPie);
       
        
        
        slices.forEach(slice => {
        
            const s = slice.startA;
            const e = s + slice.sweepA
            const start = getCoords(cx, cy, _radius, s);
            const end = getCoords(cx, cy, _radius, e);

            const dir = slice.sweepA > 0 ? 1 : 0;
            const swap = Math.abs(slice.sweepA) % 360 < 180 ? 0 : 1;
            const close = (Math.abs(Math.ceil(slice.sweepA)) >= 360) ? 'z' : ''

            const d =
                `M ${start.x} ${start.y} A ${_radius} ${_radius}  0 ${swap} ${dir} ${end.x} ${end.y} ${close}`;
            
            const path = {
                'type': 'path', 'options': {
                    id: null, class: "slice", d: d, stroke: null, strokeWidth: strokeW, opacity: 1, fill: 'none'
                }
            };

            const newSlice = getNode(path.type, path.options);
            newSlice.setAttribute('stroke', randomFill());
            newSlice.setAttribute('id', `slice${sliceCount}`)
            document.getElementById('pieContainer' + pieCount).appendChild(newSlice);

            sliceCount++;
            
            return d;
        });
        pieCount++;
    };

    
    // USAGE
    // include title, text, value
    //TODO sort descending by value
    let values = [ { value: 383 }, { value: 83 }, { value: 200 }, { value: 300 }, { value: 78 } ]
   
    const pieObj = {
        id: 'yourId',
        // bg-dimensions
        width: 600,
        height: 600,
        // pie-settings
        x: 180,
        y: 180,
        r: 200,
        strokeWidth:150,
        data: values,
        colors: [],//if empty or not set: randomFill()
        // legend
        legend: 'yes',// 'yes' || 'no'
        percentage: 'yes',// 'yes' || 'no'
        color: 'white' 
    }
    createPie(pieObj)
    
}
