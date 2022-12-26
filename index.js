/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
//TODO style defs worked when added manually... WHAT AM I MISSING???
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
    
    function getCenter(el) {
        const { x, y, width, height } = el.getBBox();
        const cx = Math.round(width / 2 + x);
        const cy = Math.round(height / 2 + y);
        return {cx, cy}
        
    }
   
        
    
    
    
    const parser = new DOMParser();
    
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
        container.style.height = obj.height + 'px';
        
        const styleDefString = `<defs><style type="text/css"></style></defs>`
        let styleDef = parser.parseFromString(styleDefString, 'text/html').body.childNodes[ 0 ];
        container.appendChild(styleDef)
        
        
        let slices = [];
        for (let i = 0; i < obj.data.length; i++) {
        
            slices.push(
                {
                    startAngle: slices[ i - 1 ]?.startAngle + slices[ i - 1 ]?.sweepAngle || 0,
                    sweepAngle: 360 / total * data[ i ],
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
        // newPie.setAttribute('x', obj.x);
        // newPie.setAttribute('y', obj.y);
        newPie.setAttribute('width', '100%');
        newPie.setAttribute('height', '100%');
        newPie.setAttribute('overflow', 'visible');
        newPie.setAttribute('viewport', `0 0 ${obj.width} ${obj.height}`);
        container.appendChild(newPie);
        
        
       
       
        
        const pie = document.getElementById('pieContainer' + pieCount)
        pie.appendChild(styleDef)
        // const styleDefs = document.createElementNS(SVG, 'defs');
        // const styleEl = document.createElementNS(SVG, 'style');
        // styleEl.setAttribute('type', 'text/css');
        
       // styleDefs.appendChild(styleEl)

        
        slices.forEach(s => {
            
            //TODO assign endo of slice i-1 to start of slice i directly!!
            //SLICES
            const a = s.startAngle;
            const o = a + s.sweepAngle;
            const start = getCoords(cx, cy, _radius, a);
            const charX = getCoords(cx, cy, _radius/2, a)
            const end = getCoords(cx, cy, _radius, o);
            const dir = s.sweepAngle > 0 ? 1 : 0;
            const swap = Math.abs(s.sweepAngle) % 360 < 180 ? 0 : 1;
            const close = (Math.abs(Math.ceil(s.sweepAngle)) >= 360) ? 'z' : ''

            const d =
                `M ${start.x} ${start.y} A ${_radius} ${_radius}  0 ${swap} ${dir} ${end.x} ${end.y} ${close}`;
            
            const path = {
                'type': 'path', 'options': {
                    id: `slice${sliceCount}`, class: "slice", d: d, stroke: null, strokeWidth: strokeW, opacity: 1, fill: 'transparent'
                }
            };

            const newSlice = getNode(path.type, path.options);
            newSlice.setAttribute('stroke', randomFill());
            pie.appendChild(newSlice);
           
            
            
            // PERCENTAGE
            const percent = `${Math.round(s.sweepAngle / 3.6)}%`;
            let coords = getCenter(newSlice);
            console.log(coords)
            
        //     let perc = {
        //         'type': 'text', 'options': {
        //             id: `perc${sliceCount}`,
        //             class: 'perc',
        //             x: coords.cx, y: coords.cy, fontSize: '15px', fontFamily: "Barlow-Medium", textAnchor: 'middle', dominantBaseline: 'middle', fill: obj.color, opacity: 1
        //         }
        //     };
        //     let newPerc = getNode(perc.type, perc.options);
        //    
        //     pie.appendChild(newPerc);
        //     let el = document.getElementById(newPerc.id)
        //     el.setAttribute('text-content', `${percent}`)
        //     
        //     console.log(el.getAttribute('text-content'));
        //     console.log(el.getAttribute('x'))
            
             let percString =
                 `<text id="perc${sliceCount}" class="perc" x="${coords.cx}" y="${coords.cy}" font-family="Barlow-Medium" font-size="15px" text-anchor="middle" fill="${randomFill()}" opacity="1" text-content="${percent}">${percent}</text>`
            
            const newTest = parser.parseFromString(percString, 'text/html').body.childNodes[ 0 ];
            pie.appendChild(newTest);
            let test = document.getElementById(newTest.id)
            console.log(test.getAttribute('text-content'))
            sliceCount++;
            return d;
        });
        pieCount++;
    };

    
    // USAGE
    // include title, text, value
    //TODO sort descending by value
    let values = [ { value: 383 }, { value: 83 }, { value: 200 }, { value: 120 }, { value: 78 } ]
   
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
        color: 'black' 
    }
    createPie(pieObj)
    
}
