/*
 *   Copyright (c) 2022 Barbara Kälin - https://github.com/BarbWire-1/SVG-charts
 *   All rights reserved.
 *   MIT License
 */
import { pieChart } from "./charts/pieChart.js"
import { PieData } from "./charts/Pie.js";
window.onload = function () {
  
    
    // USAGE
    let data0 = [ { value: 383 }, { value: 83 }, { value: 200 }, { value: 120 }, { value: 78 } ]
    let pieObj = {
        id: 'yourId',
        // bg-dimensions
        width: 600,
        height: 600,
        // pie-settings
        x: 180,
        y: 180,
        r: 200,
        strokeWidth: 150,
        data: data0,
        colors: [ '#4a4e4d', '#0e9aa7', '#3da4ab', '#f6cd61', '#fe8a71' ],//if empty or not set: randomFill()
        // legend
        legend: 1,// 1 || 0
        percentage: 1,// 1 || 0
        color: 'white',
        fontSize: 30
    };
    
    let data1 = [ { value: 123 }, { value: 83 }, { value: 27 }, { value: 89 }, { value: 45 } ];
    let pieObj2 = {
        id: 'yourId2',
        // bg-dimensions
        width: 600,
        height: 300,
        // pie-settings
        x: 200,
        y: 50,
        r: 100,
        strokeWidth: 100,
        data: data1,
        colors: [ '#ee4035', '#f37736', '#fdf498', '#7bc043', '#0392cf' ],//if empty or not set: randomFill()
        // legend
        legend: 1,// 1 || 0
        percentage: 1,// 1 || 0
        color: 'black',
        fontSize: 18
    };
    
    pieChart(pieObj);
    pieChart(pieObj2);
    
    
    const pastelRainbow = [ '#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5', '#ff8b94' ];
    let data3 = [ { value: 1 }, { value: 1 }, { value: 2 }, { value: 2 }, { value: 3 } ];
    let pieObj3 = {
        id: 'yourId3',
        // bg-dimensions
        width: 600,
        height: 400,
        // pie-settings
        x: 50,
        y: 50,
        r: 150,
        strokeWidth: 100,
        data: data3,
        colors: pastelRainbow,//if empty or not set: randomFill()
        // legend
        legend: 1,// 1 || 0
        percentage: 1,// 1 || 0
        color: 'black',
        fontSize: 18
    };
    pieChart(pieObj3);
    
    let test = new PieData('testPie')
    pieChart(test)
   // console.log(test)
    test.width = 800
    //console.log(test)
    //pieChart(test)
    
    const testProxy = new Proxy(test, {
        get(target, key) {
            return target[ key ] ?? target.getItem(key) ?? undefined;
        },
        set(target, key, value) {
            if (key in target) {
                return false;
            }
            return yourId3.setItem(key, value);
        },
    })
    
    test.x = '300px';
   console.log(testProxy)
};

//TODO create an class with props to redraw on change (include title, , value, text per value);
//TODO remove necessaty of parent-div! (for now manually add in html)
// then add x,y,fill/shadow-filter to parent-svg (for each?, by class)
// check CSS-possibilities for charts
//TODO add ONE radius and then just scale by user-settings - more effective???
// test and measure both approaches!