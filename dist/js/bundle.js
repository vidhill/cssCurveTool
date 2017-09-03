!function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,r){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.a={isObject:function(t){return null!==t&&"object"===(void 0===t?"undefined":n(t))},decimalToPercentage:function(t){return(100*t).toFixed(2)+"%"},toTimeScale:function(t,e){return(e*t).toFixed(2)+"ms"},toSpacedString:function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];return e.join(" ")}}},function(t,e,r){"use strict";function n(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}return Array.from(t)}Object.defineProperty(e,"__esModule",{value:!0});var o=r(2),a=r(3),i=r(4),u=r(5),c=r(7),f=r(8),s=Object(i.a)(),d={width:800,height:500,sidePad:40,bottomPad:100,bgColour:"#bada55"},h=Snap(d.width,d.height);h.rect(0,0,d.width,d.height).attr({fill:d.bgColour});var l=h.g(),y=Object(o.a)(l,d),p=function(t){return y.width*t},m=Object(u.a)(l,y),v=[{transform:"scale(1)",opacity:1,offset:0},{transform:"scale(.5)",opacity:0,offset:.33333},{transform:"scale(.667)",opacity:.5,offset:.66666},{transform:"scale(.6)",opacity:0,offset:1}],b=s.setKeyFrames(v);!function(t){var e=t.map(function(t){return t.opacity}),r={maxVal:Math.max.apply(Math,n(e)),minVal:Math.min.apply(Math,n(e))},o=Object(c.a)(r,y.height,y.yPos),i=t.map(function(t){return{x:p(t.offset),y:o(t.opacity),offset:t.offset}}),u=i.reduce(a.a,[]),s=Object(f.a)(u);l.path(s).attr({stroke:"#FF0000",strokeWidth:2,fill:"none"});var h=u.map(function(t){var e=m(t);return l.add(e.group),e});l.transform("translate("+d.sidePad+" 0)")}(b)},function(t,e,r){"use strict";e.a=function(t,e){var r={width:e.width-2*e.sidePad,height:300,yPos:e.height-e.bottomPad};return r.objRef=t.path("M0 "+r.yPos+" h"+r.width).attr({stroke:"#000",strokeWidth:1}),r}},function(t,e,r){"use strict";e.a=function(t,e,r,n){var o=n[r-1],a=n[r+1];if(void 0!==o){var i=e.x-o.x;e.backwardCurve={x:e.x-.58*i,y:e.y}}if(void 0!==a){var u=a.x-e.x;e.forwardCurve={x:e.x+.42*u,y:e.y}}return t.push(e),t}},function(t,e,r){"use strict";e.a=function(){var t=[];return{setKeyFrames:function(e){return t=e},getKeyFrames:function(){return t},addKeyFrame:function(e){if(!e.hasOwnProperty("offset"))throw new TypeError("Keyframes should have an offset property");t.push(e)},removeKeyFrame:function(e){return t.splice(e,1),t},updateKeyOffset:function(e,r){return t[e].offset=r,t[e]}}}},function(t,e,r){"use strict";function n(t,e,r){var n={},o={stroke:"#0000AA",strokeWidth:1};return n.line=r.line(t.x,t.y,e.x,e.y).attr(o),n.circle=r.circle(e.x,e.y,5).attr({fill:"#0000AA"}),n}var o=r(0),a=r(6);e.a=function(t,e){return function(r){var i={updatePoint:function(t){this.setLabelText(o.a.decimalToPercentage(t.offset)),this.setTimeText(o.a.toTimeScale(t.offset,500)),this.setPathPointYPos(t.y)},setLabelText:function(t){this.labelText.node.textContent=t},setTimeText:function(t){this.timeText.node.textContent=t},setPathPointYPos:function(t){this.pathPoint.attr({cy:t})}},u=t.g();return u.transform("translate("+r.x+" 0)"),i=Object(a.a)(i,u,e),i.updatePoint(r),o.a.isObject(r.forwardCurve)&&(i.forwardHandle=n(r,r.forwardCurve,t)),o.a.isObject(r.backwardCurve)&&(i.backHandle=n(r,r.backwardCurve,t)),i.group=u,i}}},function(t,e,r){"use strict";var n={width:5,height:15};e.a=function(t,e,r){return t.line=e.path("M0,"+r.yPos+",v-"+r.height).attr({stroke:"#000",strokeOpacity:.5,strokeWidth:1}),t.thumb=e.rect(0,r.yPos,n.width,n.height).transform("translate(-"+n.width/2+" -"+n.height/2+")"),t.labelText=e.text(0,r.yPos+30,"").attr({textAnchor:"middle"}),t.timeText=e.text(0,r.yPos+60,"").attr({textAnchor:"middle"}),t.pathPoint=e.circle(0,0,5),t}},function(t,e,r){"use strict";e.a=function(t,e,r){var n=t.maxVal,o=t.minVal,a=n-o;return function(t){var n=(t+Math.abs(o))/a;return r-e*n}}},function(t,e,r){"use strict";var n=r(0),o={cubicBezier:function(t,e){var r=[];return r[0]="M"+n.a.toSpacedString(t.x,t.y),r[1]="C"+n.a.toSpacedString(t.forwardCurve.x,t.forwardCurve.y),r[2]=n.a.toSpacedString(e.backwardCurve.x,e.backwardCurve.y),r[3]=n.a.toSpacedString(e.x,e.y),r.join(" ")}};e.a=function(t){for(var e=void 0,r=[],n=0,a=t.length-1;n<a;n++)e=o.cubicBezier(t[n],t[n+1]),r.push(e);return r.join(" ")}}]);