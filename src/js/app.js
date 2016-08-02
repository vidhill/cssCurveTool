/**
 * Created by davidhill on 11/07/2016.
 */

    import helpers from './helpers.js';
    import init from './setup.js';
    import pointsToCubic from './points-to-cubic.js';
    // import keyFrameFactory from './points-store-factory';
    import createTimePointFactory from './create-timepoint-factory.js';


    // const keyFrameStore = keyFrameFactory();

    var docSetting = {
        width: 800,
        height: 500,
        sidePad: 40,
        bottomPad: 100,
        bgColour: '#bada55'
    };

    var doc = Snap(docSetting.width, docSetting.height);

    var timeLine = init(doc, docSetting);

    const createTimePoint = createTimePointFactory(doc, timeLine);

    function addKeyFramesToTimeline(keyFrames) {
        var calculateXpos = function(perc){
            return timeLine.xPos + (timeLine.width * perc);
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


        function createSegments(points) {

            var pathStr = '';

            for(let i = 0, len = points.length - 1; i < len; i++ ){
                // curve between current point and next
                pathStr += createSegment(points[i], points[i+1]);
            }

            return pathStr;

        }


        function createSegment(pointA, pointB) {
            let controlPoint = [];

            controlPoint[0] = 'M' + helpers.toSpacedString(pointA.x, pointA.y);
            controlPoint[1] = 'C' + helpers.toSpacedString(pointA.forwardCurve.x, pointA.forwardCurve.y);

            controlPoint[2] = helpers.toSpacedString(pointB.backwardCurve.x, pointB.backwardCurve.y);
            controlPoint[3] = helpers.toSpacedString(pointB.x, pointB.y);

            return controlPoint.join(' ');

        }

        doc.path(path)
            .attr({
                stroke: '#FF0000',
                strokeWidth: 2,
                fill: 'none'
            });

        pointArr.forEach(function(point){

            createTimePoint(point);

        });

        function pointsToPaths(point, index) {
            let type = (index === 0) ? 'M' : 'L';

            return type + [ point.x, point.y ].join(' ');
        }


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



    var myKeyFrames = [
        { transform: 'scale(1)', opacity: 1, offset: 0 },
        { transform: 'scale(.5)', opacity: 0, offset: .33333 },
        { transform: 'scale(.667)', opacity: 0.5, offset: .66666 },
        { transform: 'scale(.6)', opacity: 0, offset: 1 }
    ];

    addKeyFramesToTimeline(myKeyFrames);