
export default function (minMaxVals, maxHeightRange, zeroYPosition) {

    const { maxVal, minVal } = minMaxVals;
    const distance = maxVal - minVal;

    return function(val){
        const fractionTotal = (val + Math.abs(minVal))/distance;
        return zeroYPosition - (maxHeightRange * fractionTotal);
    };
}
