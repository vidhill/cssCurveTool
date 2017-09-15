/**
 * Created by davidhill on 11/07/2016.
 */

// import helpers from './helpers.js';
import init from './dom/setup.js';

// import pointsToCubic from './points-to-cubic.js';

// import keyFrameFactory from './factory/keyframe-store-factory';
// import createTimePointFactory from './factory/create-timepoint-factory.js';
// import calculateYPosFactory from './factory/calculate-y-pos-factory.js';

// import createSegments from './path-calculation/create-segments.js';

// const keyFrameStore = keyFrameFactory();




// UTILITIES

const pickProperty = prop => obj => obj[prop];

//


const docSetting = {
    width: 800,
    height: 500,
    sidePad: 40,
    bottomPad: 100,
    bgColour: '#bada55'
};

const createTimeLineSettings = doc => ({
    width: (doc.width - (doc.sidePad * 2)),
    height: 300,
    yPos: doc.height - doc.bottomPad
});

const timeLineSettings = createTimeLineSettings(docSetting);



// Initialise document
const containAll = init(docSetting, timeLineSettings);









// DOM Creation Functions
//

const makeCreateDot = function(container){
    const dotSettings = {
        fill: '#000'
    };

    return () => container.circle(0, 0, 5).attr(dotSettings);
};



const makeCreateLine = function(container, height){
    const lineSettings = {
        stroke: '#000',
        strokeOpacity: 0.5,
        strokeWidth: 1
    };

    return () => container.path(`M0,0,v-${height}`).attr(lineSettings);
};

















// Factories needing timeLineSettings
//

const calculateXpos = perc => (perc * timeLineSettings.width);
const calculateYpoz = fraction => (fraction * timeLineSettings.height);




// Factories needing containAll
//

const createLine = makeCreateLine(containAll, timeLineSettings.height);
const createDot = makeCreateDot(containAll);





//const createTimePoint = createTimePointFactory(containAll, timeLine);
/*
function addKeyFramesToTimeline(keyFrames) {

    var valsArr = keyFrames.map(key => key.opacity);

    var maxMin = {
        maxVal: Math.max(...valsArr),
        minVal: Math.min(...valsArr)
    };

    var calculateYpos = calculateYPosFactory(maxMin, timeLine.height, timeLine.yPos);

    var points = keyFrames.map(keyFrame => ({
        x: calculateXpos(keyFrame.offset),
        y: calculateYpos(keyFrame.opacity),
        offset: keyFrame.offset
    }));

    var pointArr = points.reduce(pointsToCubic, []);
    var bezierPath = createSegments(pointArr);


    containAll.path(bezierPath)
        .attr({
            stroke: '#FF0000',
            strokeWidth: 2,
            fill: 'none'
        });


    const timePoints = pointArr.map(function(point){

        let pointObj = createTimePoint(point);
        containAll.add(pointObj.group);

        return pointObj;

    });

    return timePoints;
}
*/

function makeCalculateFraction(values){

    const maxVal = Math.max(...values);
    const minVal = Math.min(...values);

    const maxDistance = maxVal - minVal;

    // if min value is zero return zero
    // if min value is negative need to add that number to value
    // if min value is positive need to subtract that number from value
    const offset = (minVal === 0) ? 0 : (minVal * -1);

    return val => {
        return (val + offset)/maxDistance;
    };
}


function calculateYPositions(keyFrames, property){

    const pickRelevantProperty = pickProperty(property);
    const extractedValues = keyFrames.map(pickRelevantProperty);

    const calculateFraction = makeCalculateFraction(extractedValues);

    return extractedValues
        .map(calculateFraction)
        .map(calculateYpoz);

}


let myKeyFrames = [
    { transform: 'scale(1)', opacity: 2, offset: 0 },
    { transform: 'scale(.5)', opacity: 1, offset: .33333 },
    { transform: 'scale(.667)', opacity: 0, offset: .66666 },
    { transform: 'scale(.6)', opacity: 1, offset: 1 }
];


// CALCULATE POSITION VALUES


// calculate line x positions
const linesXPos = myKeyFrames
    .map(pickProperty('offset'))
    .map(calculateXpos)
    ;

// calculate y positions
const dotsYPos = calculateYPositions(myKeyFrames, 'opacity');



function foo(fract, xPos, nextXPos){ // prevXPos
    const xDiff = (nextXPos - xPos) * fract;
    return xPos + xDiff;
}

const forward = foo.bind(null, 0.42);
const reverse = foo.bind(null, 0.58);



createDot()
    .attr({
        cx: reverse(linesXPos[2], linesXPos[1])
    });


// c1x are points going forward
const c1x = linesXPos.reduce(function(agg, curr, inx, arr){
    const next = inx+1;
    let res;

    if(next === arr.length){ // dont create a handle position for the last keyframe
        res = curr;
    } else {
        res = forward(curr, arr[next]);
    }
    return agg.concat(res);

}, []);


// console.log(linesXPos);
console.log(c1x);

// create an array undefined values, of length one shorter than source arr
const creatArrMinusOne = srcArr => [...Array(srcArr.length - 1)];

// create dots, don't create one for the last keyframe
const cxes = creatArrMinusOne(c1x).map(createDot);

// position dots
cxes.forEach((contrlDot, ind) => {
    contrlDot.attr({
        cx: c1x[ind],
        cy: dotsYPos[ind] * -1 // flip axis direction
    });
});


// CREATE ELEMENTS


// create lines
const lines = myKeyFrames.map(createLine);

// create dots
const dots = myKeyFrames.map(createDot);









// SET POSITIONS ON ELEMENTS


// set the x position for all the lines
lines.forEach(function(line, index){
    line.transform(`translate(${linesXPos[index]} 0)`);
});


// set the x position for all the dots
dots.forEach(function(dot, index){
    dot.attr({
        cx: linesXPos[index],
        cy: dotsYPos[index] * -1 // flip axis direction
    });
});

//let currKeyFrames = keyFrameStore.setKeyFrames(myKeyFrames);

// addKeyFramesToTimeline(currKeyFrames);
