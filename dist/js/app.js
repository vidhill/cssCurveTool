(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _setup = require('./dom/setup.js');

var _setup2 = _interopRequireDefault(_setup);

var _pointsToCubic = require('./points-to-cubic.js');

var _pointsToCubic2 = _interopRequireDefault(_pointsToCubic);

var _keyframeStoreFactory = require('./factory/keyframe-store-factory');

var _keyframeStoreFactory2 = _interopRequireDefault(_keyframeStoreFactory);

var _createTimepointFactory = require('./factory/create-timepoint-factory.js');

var _createTimepointFactory2 = _interopRequireDefault(_createTimepointFactory);

var _calculateYPosFactory = require('./factory/calculate-y-pos-factory.js');

var _calculateYPosFactory2 = _interopRequireDefault(_calculateYPosFactory);

var _createSegments = require('./path-calculation/create-segments.js');

var _createSegments2 = _interopRequireDefault(_createSegments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Created by davidhill on 11/07/2016.
                                                                                                                                                                                                     */

// import helpers from './helpers.js';


var keyFrameStore = (0, _keyframeStoreFactory2.default)();

var docSetting = {
    width: 800,
    height: 500,
    sidePad: 40,
    bottomPad: 100,
    bgColour: '#bada55'
};

// create holder svg element
var doc = Snap(docSetting.width, docSetting.height);

// draw background
doc.rect(0, 0, docSetting.width, docSetting.height).attr({
    fill: docSetting.bgColour
});

// create a group element to contain all elements
var containAll = doc.g();
var timeLine = (0, _setup2.default)(containAll, docSetting);

var calculateXpos = function calculateXpos(perc) {
    return timeLine.width * perc;
};

var createTimePoint = (0, _createTimepointFactory2.default)(containAll, timeLine);

function addKeyFramesToTimeline(keyFrames) {

    var valsArr = keyFrames.map(function (key) {
        return key.opacity;
    });

    var maxMin = {
        maxVal: Math.max.apply(Math, _toConsumableArray(valsArr)),
        minVal: Math.min.apply(Math, _toConsumableArray(valsArr))
    };

    var calculateYpos = (0, _calculateYPosFactory2.default)(maxMin, timeLine.height, timeLine.yPos);

    var points = keyFrames.map(function (keyFrame) {
        return {
            x: calculateXpos(keyFrame.offset),
            y: calculateYpos(keyFrame.opacity),
            offset: keyFrame.offset
        };
    });

    var pointArr = points.reduce(_pointsToCubic2.default, []);
    var bezierPath = (0, _createSegments2.default)(pointArr);

    containAll.path(bezierPath).attr({
        stroke: '#FF0000',
        strokeWidth: 2,
        fill: 'none'
    });

    var timePoints = pointArr.map(function (point) {

        var pointObj = createTimePoint(point);
        containAll.add(pointObj.group);

        return pointObj;
    });

    //timePoints[1].updatePoint();

    // move everting over to the right
    containAll.transform('translate(' + docSetting.sidePad + ' 0)');

    return timePoints;
}

var myKeyFrames = [{ transform: 'scale(1)', opacity: 1, offset: 0 }, { transform: 'scale(.5)', opacity: 0, offset: .33333 }, { transform: 'scale(.667)', opacity: 0.5, offset: .66666 }, { transform: 'scale(.6)', opacity: 0, offset: 1 }];

var currKeyFrames = keyFrameStore.setKeyFrames(myKeyFrames);

addKeyFramesToTimeline(currKeyFrames);

},{"./dom/setup.js":3,"./factory/calculate-y-pos-factory.js":4,"./factory/create-timepoint-factory.js":5,"./factory/keyframe-store-factory":6,"./path-calculation/create-segments.js":8,"./points-to-cubic.js":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (refContain, group, timeLine) {
    refContain.line = group.path('M0,' + timeLine.yPos + ',v-' + timeLine.height).attr({
        stroke: '#000',
        strokeOpacity: 0.5,
        strokeWidth: 1
    });

    refContain.thumb = group.rect(0, timeLine.yPos, thumbDimensions.width, thumbDimensions.height).transform('translate(-' + thumbDimensions.width / 2 + ' -' + thumbDimensions.height / 2 + ')');

    refContain.labelText = group.text(0, timeLine.yPos + 30, '').attr({
        textAnchor: 'middle'
    });

    refContain.timeText = group.text(0, timeLine.yPos + 60, '').attr({
        textAnchor: 'middle'
    });

    refContain.pathPoint = group.circle(0, 0, 5);

    return refContain;
};

var thumbDimensions = {
    width: 5,
    height: 15
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (snap, docSetting) {
    var tLineSetting = {
        width: docSetting.width - docSetting.sidePad * 2,
        height: 300,
        yPos: docSetting.height - docSetting.bottomPad
    };

    // draw timeline
    tLineSetting.objRef = snap.path('M0 ' + tLineSetting.yPos + ' h' + tLineSetting.width).attr({
        stroke: '#000',
        strokeWidth: 1
    });

    return tLineSetting;
};

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (minMaxVals, maxHeightRange, zeroYPosition) {
    var maxVal = minMaxVals.maxVal,
        minVal = minMaxVals.minVal;

    var distance = maxVal - minVal;

    return function (val) {
        var fractionTotal = (val + Math.abs(minVal)) / distance;
        return zeroYPosition - maxHeightRange * fractionTotal;
    };
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (doc, timeLine) {

    return function (point) {
        var refContain = {
            updatePoint: function updatePoint(newPoint) {
                this.setLabelText(_helpers2.default.decimalToPercentage(newPoint.offset));
                this.setTimeText(_helpers2.default.toTimeScale(newPoint.offset, 500));
                this.setPathPointYPos(newPoint.y);
            },
            setLabelText: function setLabelText(text) {
                this.labelText.node.textContent = text;
            },
            setTimeText: function setTimeText(text) {
                this.timeText.node.textContent = text;
            },
            setPathPointYPos: function setPathPointYPos(yPos) {
                this.pathPoint.attr({ cy: yPos });
            }
        };

        var g = doc.g(); // group to hold

        g.transform('translate(' + point.x + ' 0)');

        refContain = (0, _createKeyframe2.default)(refContain, g, timeLine);

        refContain.updatePoint(point);

        if (_helpers2.default.isObject(point.forwardCurve)) {
            refContain.forwardHandle = drawHandle(point, point.forwardCurve, doc);
        }

        if (_helpers2.default.isObject(point.backwardCurve)) {
            refContain.backHandle = drawHandle(point, point.backwardCurve, doc);
        }

        //g.drag();

        refContain.group = g;

        return refContain;
    };
};

var _helpers = require('../helpers.js');

var _helpers2 = _interopRequireDefault(_helpers);

var _createKeyframe = require('../dom/create-keyframe.js');

var _createKeyframe2 = _interopRequireDefault(_createKeyframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by davidhill on 27/07/2016.
 */

function drawHandle(point, curvePoint, doc) {

    var objectRef = {};

    var handleColour = '#0000AA';
    var handleSetting = {
        stroke: handleColour,
        strokeWidth: 1
    };

    objectRef.line = doc.line(point.x, point.y, curvePoint.x, curvePoint.y).attr(handleSetting);
    objectRef.circle = doc.circle(curvePoint.x, curvePoint.y, 5).attr({
        fill: handleColour
    });
    //.drag();

    return objectRef;
}

},{"../dom/create-keyframe.js":2,"../helpers.js":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var keyFrames = [];

    return {
        setKeyFrames: function setKeyFrames(keys) {
            keyFrames = keys;
            return keyFrames;
        },
        getKeyFrames: function getKeyFrames() {
            return keyFrames;
        },
        addKeyFrame: function addKeyFrame(key) {
            if (key.hasOwnProperty('offset')) {
                keyFrames.push(key);
            } else {
                throw new TypeError('Keyframes should have an offset property');
            }
        },
        removeKeyFrame: function removeKeyFrame(index) {
            keyFrames.splice(index, 1);
            return keyFrames;
        },
        updateKeyOffset: function updateKeyOffset(index, newOffset) {
            keyFrames[index].offset = newOffset;
            return keyFrames[index];
        }
    };
};

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = {
    isObject: function isObject(value) {
        return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object'; // courtesy of angularjs
    },
    decimalToPercentage: function decimalToPercentage(dec) {
        return (dec * 100).toFixed(2) + '%';
    },
    toTimeScale: function toTimeScale(val, total) {
        return (total * val).toFixed(2) + 'ms';
    },
    toSpacedString: function toSpacedString() {
        for (var _len = arguments.length, strings = Array(_len), _key = 0; _key < _len; _key++) {
            strings[_key] = arguments[_key];
        }

        return strings.join(' ');
    }
};

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.segmentMethods = undefined;

exports.default = function (pointsArray) {

    var result = void 0,
        pathStrArr = [];

    for (var i = 0, len = pointsArray.length - 1; i < len; i++) {
        // curve between current point and next
        result = segmentMethods.cubicBezier(pointsArray[i], pointsArray[i + 1]);
        pathStrArr.push(result);
    }

    return pathStrArr.join(' ');
};

var _helpers = require('../helpers.js');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var segmentMethods = exports.segmentMethods = {
    cubicBezier: function cubicBezier(pointA, pointB) {
        var controlPoint = [];

        controlPoint[0] = 'M' + _helpers2.default.toSpacedString(pointA.x, pointA.y);
        controlPoint[1] = 'C' + _helpers2.default.toSpacedString(pointA.forwardCurve.x, pointA.forwardCurve.y);

        controlPoint[2] = _helpers2.default.toSpacedString(pointB.backwardCurve.x, pointB.backwardCurve.y);
        controlPoint[3] = _helpers2.default.toSpacedString(pointB.x, pointB.y);

        return controlPoint.join(' ');
    }
};

},{"../helpers.js":7}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (prevVal, point, ind, srcArr) {

    var prevPoint = srcArr[ind - 1];
    var nextPoint = srcArr[ind + 1];

    if (prevPoint !== undefined) {
        var xDiff = point.x - prevPoint.x;

        // easeOut = cubic-bezier(0,0, 0.58,1)
        point.backwardCurve = {
            x: point.x - xDiff * 0.58, //
            y: point.y // 1
        };
    }

    if (nextPoint !== undefined) {
        var _xDiff = nextPoint.x - point.x;

        // easeIn = cubic-bezier(0.42,0, 1,1)
        point.forwardCurve = {
            x: point.x + _xDiff * 0.42,
            y: point.y // 0
        };
    }

    prevVal.push(point);

    return prevVal;
};

},{}]},{},[1])

//# sourceMappingURL=app.js.map
