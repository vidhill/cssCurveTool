/**
 * Created by davidhill on 11/07/2016.
 */

    import helpers from './helpers.js';
    import init from './setup.js';
    import pointsToCubic from './points-to-cubic.js';


    var docSetting = {
        width: 800,
        height: 500,
        sidePad: 40,
        bottomPad: 100,
        bgColour: '#bada55'
    };

    var doc = Snap(docSetting.width, docSetting.height);

    var timeLine = init(doc, docSetting);



    function addKeyFramesToTimeline(keyFrames) {
        const thumbDimensions = {
            width: 5,
            height: 15
        };
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

            controlPoint[0] = 'M' + [ pointA.x, pointA.y ].join(' ');
            controlPoint[1] = 'C' + [ pointA.forwardCurve.x, pointA.forwardCurve.y ].join(' ');

            controlPoint[2] = [ pointB.backwardCurve.x, pointB.backwardCurve.y ].join(' ');
            controlPoint[3] = [ pointB.x, pointB.y].join(' ');

            return controlPoint.join(' ');

        }


        doc.path(path)
            .attr({
                stroke: '#FF0000',
                strokeWidth: 2,
                fill: 'none'
            });

        pointArr.forEach(function(point){

            var refContain = {};

            var g = doc.g(); // group to hold

            refContain.line = g.path(`M${point.x},${timeLine.yPos},v-${timeLine.height}`)
                .attr({
                    stroke: '#000',
                    strokeOpacity: 0.5,
                    strokeWidth: 1
                });

            refContain.thumb = g.rect(point.x, timeLine.yPos , thumbDimensions.width, thumbDimensions.height)
                .transform(`translate(-${thumbDimensions.width/2} -${thumbDimensions.height/2})`);


            refContain.labelText = g.text(point.x, timeLine.yPos + 30, helpers.decimalToPercentage(point.offset))
                .attr({
                    textAnchor: 'middle'
                });

            refContain.timeText = g.text(point.x, timeLine.yPos + 60, helpers.toTimeScale(point.offset, 500))
                .attr({
                    textAnchor: 'middle'
                });

            refContain.pathPoint = g.circle(point.x, point.y, 5);

            if(helpers.isObject(point.forwardCurve)){
                refContain.forwardHandle = drawHandle(point, point.forwardCurve, g);
            }

            if(helpers.isObject(point.backwardCurve)){
                refContain.backHandle = drawHandle(point, point.backwardCurve, g);
            }

            return refContain;

        });

        function pointsToPaths(point, index) {
            let type = (index === 0) ? 'M' : 'L';

            return type + [ point.x, point.y ].join(' ');
        }


        function drawHandle(point, curvePoint, group) {

            let objectRef = {};

            let handleColour = '#0000AA';
            let handleSetting = {
                stroke: handleColour,
                strokeWidth: 1
            };

            objectRef.line = group.line(point.x, point.y, curvePoint.x, curvePoint.y)
                .attr(handleSetting);
            objectRef.circle = group.circle(curvePoint.x, curvePoint.y, 5)
                .attr({
                    fill: handleColour
                });
                //.drag();

            return objectRef;

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