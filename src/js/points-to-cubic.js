

export default function (prevVal, point, ind, srcArr){

    let prevPoint = srcArr[ind - 1];
    let nextPoint = srcArr[ind + 1];

    if(prevPoint !== undefined){
        let xDiff = point.x - prevPoint.x;

        // easeOut = cubic-bezier(0,0, 0.58,1)
        point.backwardCurve = {
            x: point.x - (xDiff * 0.58), //
            y: point.y // 1
        };

    }

    if(nextPoint !== undefined) {
        let xDiff = nextPoint.x - point.x;

        // easeIn = cubic-bezier(0.42,0, 1,1)
        point.forwardCurve = {
            x: point.x + ( xDiff * 0.42 ),
            y: point.y // 0
        };

    }

    prevVal.push(point);

    return prevVal;

}