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

    // console.log(timeLine);


    const createTimePoint = createTimePointFactory(containAll, timeLine);

    function addKeyFramesToTimeline(keyFrames) {

        var calculateXpos = function(perc){
            return timeLine.width * perc;
        };

        var calculateYPosFactory = function (vals) {

            let { maxVal, minVal } = vals;

            let distance = maxVal - minVal;

            return function(val){
                let factor = (val + Math.abs(minVal))/distance;

                return timeLine.yPos - (timeLine.height * factor);
            };

        };

        var valsArr = keyFrames.map(key => key.opacity);

        var maxMin = {
            maxVal: Math.max(...valsArr),
            minVal: Math.min(...valsArr)
        };

        var calculateYpos = calculateYPosFactory(maxMin);

        var points = keyFrames.map(keyFrame => {
            return {
                x: calculateXpos(keyFrame.offset),
                y: calculateYpos(keyFrame.opacity),
                offset: keyFrame.offset
            };
        });

        var pointArr = points.reduce(pointsToCubic, []);
        var path = createSegments(pointArr);


        containAll.path(path)
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

        // move everting over to the right
        // containAll.transform(`translate(${docSetting.sidePad} 0)`);

        /*
        function pointsToPaths(point, index) {
            let type = (index === 0) ? 'M' : 'L';

            return type + [ point.x, point.y ].join(' ');
        }
        */

        // var pointStrings = pointArr.map(pointsToPaths);

        /*
        doc.path(pointStrings.join(' '))
            .attr({
                stroke: '#0000FF',
                strokeWidth: 2,
                fill: 'none'
            });
        */
    }



    let myKeyFrames = [
        { transform: 'scale(1)', opacity: 1, offset: 0 },
        { transform: 'scale(.5)', opacity: 0, offset: .33333 },
        { transform: 'scale(.667)', opacity: 0.5, offset: .66666 },
        { transform: 'scale(.6)', opacity: 0, offset: 1 }
    ];

    let currKeyFrames = keyFrameStore.setKeyFrames(myKeyFrames);

    addKeyFramesToTimeline(currKeyFrames);
