/**
 * Created by davidhill on 27/07/2016.
 */

import helpers from '../helpers.js';
import renderKeyFrame from '../dom/create-keyframe.js';

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
        var refContain = {
            updatePoint(newPoint){
                this.setLabelText( helpers.decimalToPercentage(newPoint.offset) );
                this.setTimeText( helpers.toTimeScale(newPoint.offset, 500) );
                this.setPathPointYPos(newPoint.y);
            },
            setLabelText(text){
                this.labelText.node.textContent = text;
            },
            setTimeText(text){
                this.timeText.node.textContent = text;
            },
            setPathPointYPos(yPos){
                this.pathPoint.attr({cy: yPos});
            }
        };

        var g = doc.g(); // group to hold

        g.transform(`translate(${point.x} 0)`);

        refContain = renderKeyFrame(refContain, g, timeLine);

        refContain.updatePoint(point);

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
