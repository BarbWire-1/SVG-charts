/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */

window.onload = function () {
    
    //HELPERS
   function getCoords(cx, cy, rx, ry, deg) {
        let angRad = (deg - 90) * Math.PI / 180.0;

        return {
            x: cx + (rx * Math.cos(angRad)),
            y: cy + (ry * Math.sin(angRad))
        };
    };
    function randomFill() {
        let randomFill = (`#${(`000000${(Math.floor(Math.random() * 16777215)).toString(16)}`).slice(-6)}`)
        return randomFill;
    };
   
    function createPie() {
        
        const SVG = "http://www.w3.org/2000/svg";
    
        

        let data = [ 383 , 222 ,78 ,99  ]
        let total = 0;
        total = data.reduce((a, b) => a + b);
        
        class Pie {
            constructor (
                type = 'donut',
                x = 200,
                y = 60,
                radius = 120,
                strokeWidth= 50,
                data,
                
            ) {
                this.data = data,
                this.type = type,
                this.x = x,
                this.y = y,
                this.radius = radius,
                this.strokeWidth = this.type === 'pie'
                        ? this.radius
                        : strokeWidth,
                this.stroke = randomFill()
            }
            
        }
        
        let pie = new Pie();
        //create this dynamically
        const container = document.getElementById('pie');
    
        let slices = [];
        
        
        for (let i = 0; i < data.length; i++) {
        
            slices.push(
                {
                    startA: slices[ i - 1 ]?.startA + slices[ i - 1 ]?.sweepA || 0,
                    sweepA: 360 / total * data[ i ],
                    stroke: randomFill(),
                    opacity: 1,
                }
            
            )
        
        
        }
        console.log(pie.x)
    
       
        const radius = pie.radius;
        const x = pie.x;
        const y = pie.y;
        const strokeWidth = pie.strokeWidth;


      
        const cx = x + radius;
        const cy = y + radius;
      

        const _radius = radius - strokeWidth / 2;
        
        // perhaps replace with the function from editor...
        const newPie = document.createElementNS(SVG, 'svg')
        newPie.setAttribute('id', 'pieContainer');
        newPie.setAttribute('x', x);
        newPie.setAttribute('y', y);
        newPie.setAttribute('width', '100%');
        newPie.setAttribute('height', '100%');
       
        container.appendChild(newPie);
        
        let count = 0;
        
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

    createPie()
    
}
