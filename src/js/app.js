/**
 * Created by davidhill on 11/07/2016.
 */

    // import helpers from './helpers.js';
    import init from './setup.js';
    import pointsToCubic from './points-to-cubic.js';
    import keyFrameFactory from './factory/keyframe-store-factory';
    import createTimePointFactory from './factory/create-timepoint-factory.js';
    import createSegments from './path-calculation/create-segments.js';

    const keyFrameStore = keyFrameFactory();


    const docSetting = {
        width: 800,
        height: 500,
        sidePad: 40,
        bottomPad: 100,
        bgColour: '#bada55'
    };

    const doc = Snap(docSetting.width, docSetting.height);

    // draw background
    doc.rect(0, 0, docSetting.width, docSetting.height).attr({
        fill: docSetting.bgColour
    });


    const containAll = doc.g();
    const timeLine = init(containAll, docSetting);

    var calculateYPosFactory = function (minMaxVals, maxHeightRange, zeroYPosition) {

        const { maxVal, minVal } = minMaxVals;
        const distance = maxVal - minVal;

        return function(val){
            const fractionTotal = (val + Math.abs(minVal))/distance;
            return zeroYPosition - (maxHeightRange * fractionTotal);
        };
    };

    var calculateXpos = function(perc){
        return timeLine.width * perc;
    };

    const createTimePoint = createTimePointFactory(containAll, timeLine);

    function addKeyFramesToTimeline(keyFrames) {

        var valsArr = keyFrames.map(key => key.opacity);

        var maxMin = {
            maxVal: Math.max(...valsArr),
            minVal: Math.min(...valsArr)
        };

        var calculateYpos = calculateYPosFactory(maxMin, timeLine.height, timeLine.yPos);

        var points = keyFrames.map(keyFrame => {
            return {
                x: calculateXpos(keyFrame.offset),
                y: calculateYpos(keyFrame.opacity),
                offset: keyFrame.offset
            };
        });

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

        //timePoints[1].updatePoint();

        return timePoints;
    }


    let myKeyFrames = [
        { transform: 'scale(1)', opacity: 1, offset: 0 },
        { transform: 'scale(.5)', opacity: 0, offset: .33333 },
        { transform: 'scale(.667)', opacity: 0.5, offset: .66666 },
        { transform: 'scale(.6)', opacity: 0, offset: 1 }
    ];

    let currKeyFrames = keyFrameStore.setKeyFrames(myKeyFrames);

    addKeyFramesToTimeline(currKeyFrames);
