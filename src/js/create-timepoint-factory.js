/**
 * Created by davidhill on 27/07/2016.
 */

import helpers from './helpers.js';


const thumbDimensions = {
    width: 5,
    height: 15
};

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


export default function(doc, timeLine) {

    return function(point) {
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
    };

}