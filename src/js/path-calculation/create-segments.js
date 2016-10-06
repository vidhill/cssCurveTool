import helpers from '../helpers.js';

export const segmentMethods = {
    cubicBezier(pointA, pointB) {
        let controlPoint = [];

        controlPoint[0] = 'M' + helpers.toSpacedString(pointA.x, pointA.y);
        controlPoint[1] = 'C' + helpers.toSpacedString(pointA.forwardCurve.x, pointA.forwardCurve.y);

        controlPoint[2] = helpers.toSpacedString(pointB.backwardCurve.x, pointB.backwardCurve.y);
        controlPoint[3] = helpers.toSpacedString(pointB.x, pointB.y);

        return controlPoint.join(' ');

    }
};

export default function(pointsArray) {

    let result,
        pathStrArr = [];

    for(let i = 0, len = pointsArray.length - 1; i < len; i++ ){
        // curve between current point and next
        result = segmentMethods.cubicBezier(pointsArray[i], pointsArray[i+1]);
        pathStrArr.push(result);
    }

    return pathStrArr.join(' ');

}
