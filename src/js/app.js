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
        bgColour: "#bada55"
    };

    var doc = Snap(docSetting.width, docSetting.height);

    var timeLine = init(doc, docSetting);



    function addKeyFramesToTimeline(keyFrames) {
        var thumbDimensions = {
            width: 5,
            height: 15
        };
        var calculateXpos = function(perc){
            return timeLine.xPos + (timeLine.width * perc);
        };

        var calculateYPosFactory = function (vals) {

            var { maxVal, minVal } = vals;

            var distance = maxVal - minVal;

            return function(val){
                var factor = (val + Math.abs(minVal))/distance;

                return timeLine.yPos - (timeLine.height * factor);
            };

        };

        var valsArr = keyFrames.map(key => key.opacity);

        var maxMin = {
            maxVal: Math.max.apply(null, valsArr),
            minVal: Math.min.apply(null, valsArr)
        };



        // var calculateXpos = calculateYPosFactory();
        var calculateYpos = calculateYPosFactory(maxMin);

        var points = keyFrames.map(keyFrame => {
            return {
                x: calculateXpos(keyFrame.offset),
                y: calculateYpos(keyFrame.opacity),
                offset: keyFrame.offset
            };
        });

        var pointArr = points.reduce(pointsToCubic, []);

        console.log(pointArr);



        pointArr.forEach(function(point){

            var g = doc.g(); // group to hold

            var line = doc.path(`M${point.x},${timeLine.yPos},v-${timeLine.height}`)
                .attr({
                    stroke: "#000",
                    strokeOpacity: 0.5,
                    strokeWidth: 1
                });

            var thumb = doc.rect(point.x, timeLine.yPos , thumbDimensions.width, thumbDimensions.height)
                .transform(`translate(-${thumbDimensions.width/2} -${thumbDimensions.height/2})`);


            var labelText = doc.text(point.x, timeLine.yPos + 30, helpers.decimalToPercentage(point.offset))
                .attr({
                    textAnchor: 'middle'
                });

            var timeText = doc.text(point.x, timeLine.yPos + 60, helpers.toTimeScale(point.offset, 500))
                .attr({
                    textAnchor: 'middle'
                });

            var pathPoint = doc.circle(point.x, point.y, 5);

            if(helpers.isObject(point.forwardCurve)){
                doc.circle(point.forwardCurve.x, point.forwardCurve.y, 5);
            }

            if(helpers.isObject(point.backwardCurve)){
                doc.circle(point.backwardCurve.x, point.backwardCurve.y, 5);
            }


            g.add(line, thumb, labelText, timeText, pathPoint);

        });

        function pointsToPaths(point, index) {
            let type = (index === 0) ? 'M' : 'L';

            return type + point.x + ' ' + point.y;
        }



        var pointStrings = pointArr.map(pointsToPaths);


        var path = "";

        path += createSegment(pointArr[0], pointArr[1]); // curve 1
        path += createSegment(pointArr[1], pointArr[2]); // curve 2
        path += createSegment(pointArr[2], pointArr[3]); // curve 3


        function createSegment(pointA, pointB) {
            let segment = '';

            segment += ( 'M' + pointA.x + ' ' + pointA.y + ' ' )
            segment += ( 'C' + pointA.forwardCurve.x + ' ' + pointA.forwardCurve.y + ' ' )

            segment += ( pointB.backwardCurve.x + ' ' + pointB.backwardCurve.y + ' ' )
            segment += ( pointB.x + ' ' + pointB.y + ' ' )

            return segment;

        }


        doc.path(path)
            .attr({
                stroke: "#FF0000",
                strokeWidth: 2,
                fill: 'none'
            })

        doc.path(pointStrings.join(' '))
            .attr({
                stroke: "#0000FF",
                strokeWidth: 2,
                fill: 'none'
            })
    }



    var myKeyFrames = [
        { transform: 'scale(1)', opacity: 1, offset: 0 },
        { transform: 'scale(.5)', opacity: 0, offset: .33333 },
        { transform: 'scale(.667)', opacity: 0.5, offset: .66666 },
        { transform: 'scale(.6)', opacity: 0, offset: 1 }
    ];

    addKeyFramesToTimeline(myKeyFrames);