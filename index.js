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
    // TODO delet unneeded ONLY TESTING
    const parser = new DOMParser();
    
    let pieCount = 0;
    function createPie(obj) {
        
        //TODO 
        
        // colors
        // legend
       
        let total = 0;
        let vals = [];
        let sliceCount = 0;
        
        // PREPARE DATA
        obj.data.sort((a, b) => b.value - a.value)
            .forEach(el => vals.push(el.value));
        obj.data.forEach(el => total += el.value)
        strokeW = Math.min(obj.strokeWidth, obj.r);
        data = vals;//???
        
        //TODO create this dynamically - IF AT ALL
        // else set shadow on svg-container
        const container = document.getElementById(obj.id);
        container.style.width = obj.width+'px';
        container.style.height = obj.height + 'px';
        
        let slices = [];
        // does this array make any sense?
        const degPercent = 360/total
        for (let i = 0; i < obj.data.length; i++) {
            slices.push(
                {   // start at end of previous
                    sweepAngle: degPercent * data[ i ],
                    startAngle: slices[ i - 1 ]?.startAngle + slices[ i - 1 ]?.sweepAngle || 0,
                    percent: `${Math.round(degPercent * data[ i ] / 3.6)}%`,
                    stroke: randomFill(),
                    opacity: 1,
                }
            
            )
        };
       
        const cx = obj.x + obj.r;
        const cy = obj.y + obj.r;
       
        // calculate to move stroke inside chosen radius
        const _radius = obj.r - strokeW / 2;
        
        const newPie = document.createElementNS(SVG, 'svg')
        newPie.setAttribute('id', 'pieContainer' + pieCount);
        //TODO ev get own x,y for container
        // add dropShadow here to remove outer div for responsiveness https://www.w3docs.com/snippets/css/how-to-create-an-svg-drop-shadow.html
        // newPie.setAttribute('x', obj.x);
        // newPie.setAttribute('y', obj.y);
        newPie.setAttribute('width', '100%');
        newPie.setAttribute('height', '100%');
        newPie.setAttribute('class','pie');
       
        
       
       
        container.appendChild(newPie);
       
        const pie = document.getElementById('pieContainer' + pieCount)
       
        slices.forEach(s => {
            
            //TODO assign endo of slice i-1 to start of slice i directly!!
            //SLICES
            const a = s.startAngle;
            const o = a + s.sweepAngle;
            const charRadius = _radius
            const start = getCoords(cx, cy, _radius, a);
            const char = getCoords(cx, cy, charRadius, a + s.sweepAngle /2)
        
            const end = getCoords(cx, cy, _radius, o);
            const dir = s.sweepAngle > 0 ? 1 : 0;
            const swap = Math.abs(s.sweepAngle) % 360 < 180 ? 0 : 1;
            const close = (Math.abs(Math.ceil(s.sweepAngle)) >= 360) ? 'z' : ''

            const d =
                `M ${start.x} ${start.y} A ${_radius} ${_radius}  0 ${swap} ${dir} ${end.x} ${end.y} ${close}`;
            
            const path = {
                'type': 'path', 'options': {
                    id: `slice${pieCount}${sliceCount}`, class: "slice", d: d, stroke: null, strokeWidth: strokeW, opacity: 1, fill: 'none'
                }
            };
            
            // CREATE DOM Slices
            const newSlice = getNode(path.type, path.options);
            newSlice.setAttribute('stroke', randomFill());
            pie.appendChild(newSlice);
         
           
            
            // PERCENTAGE  
            let percString =
                `<svg><text id="perc${pieCount}${sliceCount}" class="perc" x="${char.x}" y="${char.y}" font-family="Poppins" font-size="${obj.fontSize}px" text-anchor="middle" alignment-baseline="mathematical" fill="${obj.color}" opacity="1" text-content="${s.percent}">${s.percent}</text></svg>`
            // CREATE DOM PERCENTAGE
            const newTest = parser.parseFromString(percString, 'text/html').body.childNodes[ 0 ];
            pie.appendChild(newTest);
           
            sliceCount++;
            return d;
        });
        pieCount++;
    };

    
    // USAGE
    // include title, text, value
    //TODO sort descending by value
    let values = [ { value: 383 }, { value: 83 }, { value: 200 }, { value: 120 }, { value: 78 } ]
   //TODO create an object with props to redraw on change
   let pieObj = {
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
        color: 'white',
        fontSize:30
   }
    let values2 = [ { value: 123 }, { value: 83 }, { value: 27 }, { value: 89 }, { value: 45} ]
    let pieObj2 = {
        id: 'yourId2',
        // bg-dimensions
        width: 600,
        height: 600,
        // pie-settings
        x: 180,
        y: 180,
        r: 100,
        strokeWidth: 70,
        data: values2,
        colors: [],//if empty or not set: randomFill()
        // legend
        legend: 'yes',// 'yes' || 'no'
        percentage: 'yes',// 'yes' || 'no'
        color: 'black',
        fontSize: 20
    }
    createPie(pieObj)
    createPie(pieObj2)
    
    //TODO calculate x,y for text on inerRadius + (radius - innerRadius)/2
}
