
export default {
    isObject(value){
        return value !== null && typeof value === 'object'; // courtesy of angularjs
    },
    decimalToPercentage(dec){
        return ( dec * 100 ).toFixed(2) + '%';
    },
    toTimeScale(val, total) {
        return (total*val).toFixed(2) + 'ms';
    },
    toSpacedString(...strings) {
        return strings.join(' ');
    }
};
