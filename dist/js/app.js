"use strict";

/**
 * Created by davidhill on 11/07/2016.
 */

(function (Snap) {

    var docSetting = {
        width: 800,
        height: 500,
        sidePad: 40,
        bottomPad: 100,
        bgColour: "#bada55"
    };

    var doc = Snap(docSetting.width, docSetting.height);
    var timeLine = {
        width: docSetting.width - docSetting.sidePad * 2,
        height: 300,
        xPos: docSetting.sidePad,
        yPos: docSetting.height - docSetting.bottomPad
    };

    (function init() {

        doc.rect(0, 0, docSetting.width, docSetting.height).attr({
            fill: docSetting.bgColour
        });

        doc.path("M" + timeLine.xPos + "," + timeLine.yPos + ",h" + timeLine.width).attr({
            stroke: "#000",
            strokeWidth: 2
        });
    })();

    var helpers = {
        decimalToPercentage: function decimalToPercentage(dec) {
            return (dec * 100).toFixed(2) + '%';
        },
        toTimeScale: function toTimeScale(val, total) {
            return (total * val).toString() + 'ms';
        }
    };

    function addKeyFramesToTimeline(keyFrames) {
        var thumbDimensions = {
            width: 5,
            height: 15
        };
        var calculateXpos = function calculateXpos(perc) {
            return timeLine.xPos + timeLine.width * perc;
        };

        var calculateYPosFactory = function calculateYPosFactory(vals) {
            var maxVal = vals.maxVal;
            var minVal = vals.minVal;


            var distance = maxVal - minVal;

            return function (val) {
                var factor = (val + Math.abs(minVal)) / distance;

                return timeLine.yPos - timeLine.height * factor;
            };
        };

        var valsArr = keyFrames.map(function (key) {
            return key.opacity;
        });

        var maxMin = {
            maxVal: Math.max.apply(null, valsArr),
            minVal: Math.min.apply(null, valsArr)
        };

        // var calculateXpos = calculateYPosFactory();
        var calculateYpos = calculateYPosFactory(maxMin);

        var points = [];

        keyFrames.forEach(function (keyFrame) {

            var point = {
                x: calculateXpos(keyFrame.offset),
                y: calculateYpos(keyFrame.opacity)
            };

            var g = doc.g();

            var line = doc.path("M" + point.x + "," + timeLine.yPos + ",v-" + timeLine.height).attr({
                stroke: "#000",
                strokeOpacity: 0.5,
                strokeWidth: 1
            });

            var thumb = doc.rect(point.x, timeLine.yPos, thumbDimensions.width, thumbDimensions.height).transform("translate(-" + thumbDimensions.width / 2 + " -" + thumbDimensions.height / 2 + ")");

            var labelText = doc.text(point.x, timeLine.yPos + 30, helpers.decimalToPercentage(keyFrame.offset)).attr({
                textAnchor: 'middle'
            });

            var timeText = doc.text(point.x, timeLine.yPos + 60, helpers.toTimeScale(keyFrame.offset, 500)).attr({
                textAnchor: 'middle'
            });

            var pathPoint = doc.circle(point.x, point.y, 5);

            g.add(line, thumb, labelText, pathPoint);

            points.push(point);
        });

        console.log(points);
    }

    var myKeyFrames = [{ transform: 'scale(1)', opacity: 1, offset: 0 }, { transform: 'scale(.5)', opacity: -0.05, offset: .3 }, { transform: 'scale(.667)', opacity: .667, offset: .7875 }, { transform: 'scale(.6)', opacity: .6, offset: 1 }];

    addKeyFramesToTimeline(myKeyFrames);
})(Snap);