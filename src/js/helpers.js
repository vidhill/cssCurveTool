
export default {
    isObject: function(value){
        return value !== null && typeof value === 'object'; // courtesy of angularjs
    },
    decimalToPercentage: function(dec){
        return ( dec * 100 ).toFixed(2) + '%';
    },
    toTimeScale: function (val, total) {
        return (total*val).toFixed(2) + 'ms';
    },
    toSpacedString: function (...strings) {
        return strings.join(' ');
    }
};
