/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */

window.onload = function () {
    
    //HELPERS
   function getCoords(cx, cy, rx, ry, deg) {
        let radians = (deg - 90) * Math.PI / 180.0;

        return {
            x: cx + (rx * Math.cos(radians)),
            y: cy + (ry * Math.sin(radians))
        };
    };
    function randomFill() {
        let randomFill = (`#${(`000000${(Math.floor(Math.random() * 16777215)).toString(16)}`).slice(-6)}`)
        return randomFill;
    };
   
    function createPie(obj) {
        
        const SVG = "http://www.w3.org/2000/svg";
    
        //TODO data as obj.value
        // add params to function
        // colors
        // legend
       
        let total = 0;
        total = obj.data.reduce((a, b) => a + b);
        let count = 0;
        strokeW = Math.min(obj.strokeWidth, obj.r);
       
        class Pie { 
            data = obj.data;
            x = obj.x;
            y = obj.y;
            radius = obj.r;
            strokeWidth = obj.strokeWidth;
            stroke = randomFill()
        };
        
        let pie = new Pie();
        //create this dynamically
        const container = document.getElementById('pie');
        container.style.width = obj.width+'px';
        container.style.height = obj.height+'px';
    
        let slices = [];
        for (let i = 0; i < obj.data.length; i++) {
        
            slices.push(
                {
                    startA: slices[ i - 1 ]?.startA + slices[ i - 1 ]?.sweepA || 0,
                    sweepA: 360 / total * obj.data[ i ],
                    stroke: randomFill(),
                    opacity: 1,
                }
            
            )
        };
       
        const cx = obj.x + obj.r;
        const cy = obj.y + obj.r;
       
        // calculate to move stroke inside chosen radius
        const _radius = obj.r - strokeW / 2;
        
        // TODO perhaps replace with the function from editor...
        const newPie = document.createElementNS(SVG, 'svg')
        newPie.setAttribute('id', 'pieContainer');
        newPie.setAttribute('x', obj.x);
        newPie.setAttribute('y', obj.y);
        newPie.setAttribute('width', '100%');
        newPie.setAttribute('height', '100%');
        container.appendChild(newPie);
        
        
        slices.forEach(slice => {
        
        const s = slice.startA;
        const e = s + slice.sweepA
        const start = getCoords(cx, cy, _radius, _radius,s );
        const end = getCoords(cx, cy, _radius, _radius, e);

        const dir = slice.sweepA > 0 ? 1 : 0;
        const swap = Math.abs(slice.sweepA) % 360 < 180 ? 0 : 1;
        const close = (Math.abs(Math.ceil(slice.sweepA)) >= 360) ? 'z' : ''

        const d =
            `M ${start.x} ${start.y} A ${_radius} ${_radius}  0 ${swap} ${dir} ${end.x} ${end.y} ${close}`
            
            const newSlice = document.createElementNS(SVG, 'path');
            newSlice.setAttribute('id', `slice${count}`);
            newSlice.setAttribute('stroke', slice.stroke);
            newSlice.setAttribute('stroke-width', pie.strokeWidth);
            newSlice.setAttribute('opacity', 1);
            newSlice.setAttribute('d', d);
            newSlice.setAttribute('fill', 'none');
            document.getElementById('pieContainer').appendChild(newSlice);

            count++;
            return d;
        })
    };

    
    let values = [ 383, 222, 78, 99 ]
    const pieObj = {
        width: 600,
        height: 600,
        x: 160,
        y: 160,
        r: 200,
        strokeWidth: 70,
        data: values,
        colors: []
        
    }
    createPie(pieObj)
    
}
