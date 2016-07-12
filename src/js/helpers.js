
module.exports = {
    decimalToPercentage: function(dec){
      return ( dec * 100 ).toFixed(2) + '%';
    },
    toTimeScale: function (val, total) {
      return (total*val).toString() + 'ms';
    }
};
