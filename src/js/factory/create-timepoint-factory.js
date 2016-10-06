/**
 * Created by davidhill on 27/07/2016.
 */

import helpers from '../helpers.js';


const thumbDimensions = {
    width: 5,
    height: 15
};

function drawHandle(point, curvePoint, doc) {

    let objectRef = {};

    let handleColour = '#0000AA';
    let handleSetting = {
        stroke: handleColour,
        strokeWidth: 1
    };

    objectRef.line = doc.line(point.x, point.y, curvePoint.x, curvePoint.y)
        .attr(handleSetting);
    objectRef.circle = doc.circle(curvePoint.x, curvePoint.y, 5)
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

        g.transform(`translate(${point.x} 0)`);

        refContain.line = g.path(`M0,${timeLine.yPos},v-${timeLine.height}`)
            .attr({
                stroke: '#000',
                strokeOpacity: 0.5,
                strokeWidth: 1
            });

        refContain.thumb = g.rect(0, timeLine.yPos , thumbDimensions.width, thumbDimensions.height)
            .transform(`translate(-${thumbDimensions.width/2} -${thumbDimensions.height/2})`);


        refContain.labelText = g.text(0, timeLine.yPos + 30, helpers.decimalToPercentage(point.offset))
            .attr({
                textAnchor: 'middle'
            });

        refContain.timeText = g.text(0, timeLine.yPos + 60, helpers.toTimeScale(point.offset, 500))
            .attr({
                textAnchor: 'middle'
            });

        refContain.pathPoint = g.circle(0, point.y, 5);

        if(helpers.isObject(point.forwardCurve)){
            refContain.forwardHandle = drawHandle(point, point.forwardCurve, doc);
        }

        if(helpers.isObject(point.backwardCurve)){
            refContain.backHandle = drawHandle(point, point.backwardCurve, doc);
        }

        //g.drag();

        refContain.group = g;

        return refContain;
    };

}
