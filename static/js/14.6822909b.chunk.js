/*! For license information please see 14.6822909b.chunk.js.LICENSE.txt */
(this["webpackJsonpzfw-103"]=this["webpackJsonpzfw-103"]||[]).push([[14],{235:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var i=n(236);function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){Object(i.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}},236:function(t,e,n){"use strict";function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return i}))},247:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var i=n(50);var r=n(72);function o(t){return function(t){if(Array.isArray(t))return Object(i.a)(t)}(t)||function(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(r.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},381:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),r=n(382);e.default=function(t,e,n){void 0===t&&(t=0),void 0===e&&(e=50),void 0===n&&(n=3);var o=i.useState(null),s=o[0],a=o[1],u=i.useState(t),c=u[0],p=u[1],h=i.useMemo((function(){return{onSpringUpdate:function(t){var e=t.getCurrentValue();p(e)}}}),[]);return i.useEffect((function(){if(!s){var i=(new r.SpringSystem).createSpring(e,n);i.setCurrentValue(t),a(i),i.addListener(h)}return function(){s&&(s.removeListener(h),a(null))}}),[e,n,s]),i.useEffect((function(){s&&s.setEndValue(t)}),[t]),c}},382:function(t,e,n){(function(e,n){t.exports=function(){"use strict";var t=void 0;"undefined"!==typeof window&&(t=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame),t||"undefined"===typeof e||"node"!==e.title||(t=n);var i=t=t||function(t){window.setTimeout(t,1e3/60)},r=Array.prototype.concat,o=Array.prototype.slice;function s(t){return i(t)}function a(t,e){var n=t.indexOf(e);-1!==n&&t.splice(n,1)}var u={};function c(t){if(u[t])return u[t];var e=t.replace("#","");3===e.length&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]);var n=e.match(/.{2}/g);if(!n||n.length<3)throw new Error("Expected a color string of format #rrggbb");var i={r:parseInt(n[0],16),g:parseInt(n[1],16),b:parseInt(n[2],16)};return u[t]=i,i}function p(t,e,n){var i=t.toString(16),r=e.toString(16),o=n.toString(16);return"#"+(i=i.length<2?"0"+i:i)+(r=r.length<2?"0"+r:r)+(o=o.length<2?"0"+o:o)}var h=Object.freeze({bind:function(t,e){for(var n=arguments.length,i=Array(n>2?n-2:0),s=2;s<n;s++)i[s-2]=arguments[s];return function(){for(var n=arguments.length,s=Array(n),a=0;a<n;a++)s[a]=arguments[a];t.apply(e,r.call(i,o.call(s)))}},extend:function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},onFrame:s,removeFirst:a,hexToRGB:c,rgbToHex:p});function l(t,e,n,i,r){return i+(t-e)/(n-e)*(r-i)}var f=Object.freeze({mapValueInRange:l,interpolateColor:function(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,o=arguments[5],s=c(e),a=c(n),u=Math.floor(l(t,i,r,s.r,a.r)),h=Math.floor(l(t,i,r,s.g,a.g)),f=Math.floor(l(t,i,r,s.b,a.b));return o?"rgb("+u+","+h+","+f+")":p(u,h,f)},degreesToRadians:function(t){return t*Math.PI/180},radiansToDegrees:function(t){return 180*t/Math.PI}});function d(t){return 3.62*(t-30)+194}function g(t){return 3*(t-8)+25}var m=Object.freeze({tensionFromOrigamiValue:d,origamiValueFromTension:function(t){return(t-194)/3.62+30},frictionFromOrigamiValue:g,origamiFromFriction:function(t){return(t-25)/3+8}}),v=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},_=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},y=function(){function t(){v(this,t),this.springSystem=null}return t.prototype.run=function(){var t=T.call(this);s((function(){t.loop(Date.now())}))},t}(),S=function(){function t(e){v(this,t),this.springSystem=null,this.time=0,this.running=!1,this.timestep=e||16.667}return t.prototype.run=function(){var t=T.call(this);if(!this.running){for(this.running=!0;!t.getIsIdle();)t.loop(this.time+=this.timestep);this.running=!1}},t}(),E=function(){function t(){v(this,t),this.springSystem=null,this.time=0,this.running=!1}return t.prototype.run=function(){},t.prototype.step=function(t){T.call(this).loop(this.time+=t)},t}();function T(){if(null==this.springSystem)throw new Error("cannot run looper without a springSystem");return this.springSystem}var I=Object.freeze({AnimationLooper:y,SimulationLooper:S,SteppingSimulationLooper:E}),b=function(){function t(e,n){v(this,t),this.bounciness=e,this.speed=n;var i=this.normalize(e/1.7,0,20);i=this.projectNormal(i,0,.8);var r=this.normalize(n/1.7,0,20);this.bouncyTension=this.projectNormal(r,.5,200),this.bouncyFriction=this.quadraticOutInterpolation(i,this.b3Nobounce(this.bouncyTension),.01)}return t.prototype.normalize=function(t,e,n){return(t-e)/(n-e)},t.prototype.projectNormal=function(t,e,n){return e+t*(n-e)},t.prototype.linearInterpolation=function(t,e,n){return t*n+(1-t)*e},t.prototype.quadraticOutInterpolation=function(t,e,n){return this.linearInterpolation(2*t-t*t,e,n)},t.prototype.b3Friction1=function(t){return 7e-4*Math.pow(t,3)-.031*Math.pow(t,2)+.64*t+1.28},t.prototype.b3Friction2=function(t){return 44e-6*Math.pow(t,3)-.006*Math.pow(t,2)+.36*t+2},t.prototype.b3Friction3=function(t){return 45e-8*Math.pow(t,3)-332e-6*Math.pow(t,2)+.1078*t+5.84},t.prototype.b3Nobounce=function(t){return t<=18?this.b3Friction1(t):t>18&&t<=44?this.b3Friction2(t):this.b3Friction3(t)},t}(),O=function(){function t(e,n){v(this,t),this.tension=e,this.friction=n}return t.fromOrigamiTensionAndFriction=function(e,n){return new t(d(e),g(n))},t.fromBouncinessAndSpeed=function(e,n){var i=new b(e,n);return t.fromOrigamiTensionAndFriction(i.bouncyTension,i.bouncyFriction)},t.coastingConfigWithOrigamiFriction=function(e){return new t(0,g(e))},t}();O.DEFAULT_ORIGAMI_SPRING_CONFIG=O.fromOrigamiTensionAndFriction(40,7);var w=function t(){v(this,t),this.position=0,this.velocity=0},A=function(){function t(e){v(this,t),this.listeners=[],this._startValue=0,this._currentState=new w,this._displacementFromRestThreshold=.001,this._endValue=0,this._overshootClampingEnabled=!1,this._previousState=new w,this._restSpeedThreshold=.001,this._tempState=new w,this._timeAccumulator=0,this._wasAtRest=!0,this._id="s"+t._ID++,this._springSystem=e}return t.prototype.destroy=function(){this.listeners=[],this._springSystem.deregisterSpring(this)},t.prototype.getId=function(){return this._id},t.prototype.setSpringConfig=function(t){return this._springConfig=t,this},t.prototype.getSpringConfig=function(){return this._springConfig},t.prototype.setCurrentValue=function(t,e){return this._startValue=t,this._currentState.position=t,e||this.setAtRest(),this.notifyPositionUpdated(!1,!1),this},t.prototype.getStartValue=function(){return this._startValue},t.prototype.getCurrentValue=function(){return this._currentState.position},t.prototype.getCurrentDisplacementDistance=function(){return this.getDisplacementDistanceForState(this._currentState)},t.prototype.getDisplacementDistanceForState=function(t){return Math.abs(this._endValue-t.position)},t.prototype.setEndValue=function(t){if(this._endValue===t&&this.isAtRest())return this;this._startValue=this.getCurrentValue(),this._endValue=t,this._springSystem.activateSpring(this.getId());for(var e=0,n=this.listeners.length;e<n;e++){var i=this.listeners[e].onSpringEndStateChange;i&&i(this)}return this},t.prototype.getEndValue=function(){return this._endValue},t.prototype.setVelocity=function(t){return t===this._currentState.velocity||(this._currentState.velocity=t,this._springSystem.activateSpring(this.getId())),this},t.prototype.getVelocity=function(){return this._currentState.velocity},t.prototype.setRestSpeedThreshold=function(t){return this._restSpeedThreshold=t,this},t.prototype.getRestSpeedThreshold=function(){return this._restSpeedThreshold},t.prototype.setRestDisplacementThreshold=function(t){this._displacementFromRestThreshold=t},t.prototype.getRestDisplacementThreshold=function(){return this._displacementFromRestThreshold},t.prototype.setOvershootClampingEnabled=function(t){return this._overshootClampingEnabled=t,this},t.prototype.isOvershootClampingEnabled=function(){return this._overshootClampingEnabled},t.prototype.isOvershooting=function(){var t=this._startValue,e=this._endValue;return this._springConfig.tension>0&&(t<e&&this.getCurrentValue()>e||t>e&&this.getCurrentValue()<e)},t.prototype.advance=function(e,n){var i=this.isAtRest();if(!i||!this._wasAtRest){var r=n;n>t.MAX_DELTA_TIME_SEC&&(r=t.MAX_DELTA_TIME_SEC),this._timeAccumulator+=r;for(var o=this._springConfig.tension,s=this._springConfig.friction,a=this._currentState.position,u=this._currentState.velocity,c=this._tempState.position,p=this._tempState.velocity,h=void 0,l=void 0,f=void 0,d=void 0,g=void 0,m=void 0,v=void 0,_=void 0;this._timeAccumulator>=t.SOLVER_TIMESTEP_SEC;)this._timeAccumulator-=t.SOLVER_TIMESTEP_SEC,this._timeAccumulator<t.SOLVER_TIMESTEP_SEC&&(this._previousState.position=a,this._previousState.velocity=u),h=u,l=o*(this._endValue-c)-s*u,c=a+h*t.SOLVER_TIMESTEP_SEC*.5,f=p=u+l*t.SOLVER_TIMESTEP_SEC*.5,d=o*(this._endValue-c)-s*p,c=a+f*t.SOLVER_TIMESTEP_SEC*.5,g=p=u+d*t.SOLVER_TIMESTEP_SEC*.5,m=o*(this._endValue-c)-s*p,c=a+g*t.SOLVER_TIMESTEP_SEC,v=p=u+m*t.SOLVER_TIMESTEP_SEC,_=1/6*(l+2*(d+m)+(o*(this._endValue-c)-s*p)),a+=1/6*(h+2*(f+g)+v)*t.SOLVER_TIMESTEP_SEC,u+=_*t.SOLVER_TIMESTEP_SEC;this._tempState.position=c,this._tempState.velocity=p,this._currentState.position=a,this._currentState.velocity=u,this._timeAccumulator>0&&this._interpolate(this._timeAccumulator/t.SOLVER_TIMESTEP_SEC),(this.isAtRest()||this._overshootClampingEnabled&&this.isOvershooting())&&(this._springConfig.tension>0?(this._startValue=this._endValue,this._currentState.position=this._endValue):(this._endValue=this._currentState.position,this._startValue=this._endValue),this.setVelocity(0),i=!0);var y=!1;this._wasAtRest&&(this._wasAtRest=!1,y=!0);var S=!1;i&&(this._wasAtRest=!0,S=!0),this.notifyPositionUpdated(y,S)}},t.prototype.notifyPositionUpdated=function(t,e){for(var n=0,i=this.listeners.length;n<i;n++){var r=this.listeners[n];t&&r.onSpringActivate&&r.onSpringActivate(this),r.onSpringUpdate&&r.onSpringUpdate(this),e&&r.onSpringAtRest&&r.onSpringAtRest(this)}},t.prototype.systemShouldAdvance=function(){return!this.isAtRest()||!this.wasAtRest()},t.prototype.wasAtRest=function(){return this._wasAtRest},t.prototype.isAtRest=function(){return Math.abs(this._currentState.velocity)<this._restSpeedThreshold&&(this.getDisplacementDistanceForState(this._currentState)<=this._displacementFromRestThreshold||0===this._springConfig.tension)},t.prototype.setAtRest=function(){return this._endValue=this._currentState.position,this._tempState.position=this._currentState.position,this._currentState.velocity=0,this},t.prototype._interpolate=function(t){this._currentState.position=this._currentState.position*t+this._previousState.position*(1-t),this._currentState.velocity=this._currentState.velocity*t+this._previousState.velocity*(1-t)},t.prototype.getListeners=function(){return this.listeners},t.prototype.addListener=function(t){return this.listeners.push(t),this},t.prototype.removeListener=function(t){return a(this.listeners,t),this},t.prototype.removeAllListeners=function(){return this.listeners=[],this},t.prototype.currentValueIsApproximately=function(t){return Math.abs(this.getCurrentValue()-t)<=this.getRestDisplacementThreshold()},t}();A._ID=0,A.MAX_DELTA_TIME_SEC=.064,A.SOLVER_TIMESTEP_SEC=.001;var R=function(){function t(e){v(this,t),this.listeners=[],this._activeSprings=[],this._idleSpringIndices=[],this._isIdle=!0,this._lastTimeMillis=-1,this._springRegistry={},this.looper=e||new y,this.looper.springSystem=this}return t.prototype.setLooper=function(t){this.looper=t,t.springSystem=this},t.prototype.createSpring=function(t,e){var n=void 0;return n=void 0===t||void 0===e?O.DEFAULT_ORIGAMI_SPRING_CONFIG:O.fromOrigamiTensionAndFriction(t,e),this.createSpringWithConfig(n)},t.prototype.createSpringWithBouncinessAndSpeed=function(t,e){var n=void 0;return n=void 0===t||void 0===e?O.DEFAULT_ORIGAMI_SPRING_CONFIG:O.fromBouncinessAndSpeed(t,e),this.createSpringWithConfig(n)},t.prototype.createSpringWithConfig=function(t){var e=new A(this);return this.registerSpring(e),e.setSpringConfig(t),e},t.prototype.getIsIdle=function(){return this._isIdle},t.prototype.getSpringById=function(t){return this._springRegistry[t]},t.prototype.getAllSprings=function(){var t=[];for(var e in this._springRegistry)this._springRegistry.hasOwnProperty(e)&&t.push(this._springRegistry[e]);return t},t.prototype.registerSpring=function(t){this._springRegistry[t.getId()]=t},t.prototype.deregisterSpring=function(t){a(this._activeSprings,t),delete this._springRegistry[t.getId()]},t.prototype.advance=function(t,e){for(;this._idleSpringIndices.length>0;)this._idleSpringIndices.pop();for(var n=0,i=this._activeSprings.length;n<i;n++){var r=this._activeSprings[n];r.systemShouldAdvance()?r.advance(t/1e3,e/1e3):this._idleSpringIndices.push(this._activeSprings.indexOf(r))}for(;this._idleSpringIndices.length>0;){var o=this._idleSpringIndices.pop();o>=0&&this._activeSprings.splice(o,1)}},t.prototype.loop=function(t){var e=void 0;-1===this._lastTimeMillis&&(this._lastTimeMillis=t-1);var n=t-this._lastTimeMillis;this._lastTimeMillis=t;var i=0,r=this.listeners.length;for(i=0;i<r;i++)(e=this.listeners[i]).onBeforeIntegrate&&e.onBeforeIntegrate(this);for(this.advance(t,n),0===this._activeSprings.length&&(this._isIdle=!0,this._lastTimeMillis=-1),i=0;i<r;i++)(e=this.listeners[i]).onAfterIntegrate&&e.onAfterIntegrate(this);this._isIdle||this.looper.run()},t.prototype.activateSpring=function(t){var e=this._springRegistry[t];-1===this._activeSprings.indexOf(e)&&this._activeSprings.push(e),this.getIsIdle()&&(this._isIdle=!1,this.looper.run())},t.prototype.addListener=function(t){this.listeners.push(t)},t.prototype.removeListener=function(t){a(this.listeners,t)},t.prototype.removeAllListeners=function(){this.listeners=[]},t}();return _({},I,{OrigamiValueConverter:m,MathUtil:f,Spring:A,SpringConfig:O,SpringSystem:R,util:_({},h,f)})}()}).call(this,n(73),n(383).setImmediate)},383:function(t,e,n){(function(t){var i="undefined"!==typeof t&&t||"undefined"!==typeof self&&self||window,r=Function.prototype.apply;function o(t,e){this._id=t,this._clearFn=e}e.setTimeout=function(){return new o(r.call(setTimeout,i,arguments),clearTimeout)},e.setInterval=function(){return new o(r.call(setInterval,i,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(i,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout((function(){t._onTimeout&&t._onTimeout()}),e))},n(384),e.setImmediate="undefined"!==typeof self&&self.setImmediate||"undefined"!==typeof t&&t.setImmediate||this&&this.setImmediate,e.clearImmediate="undefined"!==typeof self&&self.clearImmediate||"undefined"!==typeof t&&t.clearImmediate||this&&this.clearImmediate}).call(this,n(71))},384:function(t,e,n){(function(t,e){!function(t,n){"use strict";if(!t.setImmediate){var i,r=1,o={},s=!1,a=t.document,u=Object.getPrototypeOf&&Object.getPrototypeOf(t);u=u&&u.setTimeout?u:t,"[object process]"==={}.toString.call(t.process)?i=function(t){e.nextTick((function(){p(t)}))}:function(){if(t.postMessage&&!t.importScripts){var e=!0,n=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=n,e}}()?function(){var e="setImmediate$"+Math.random()+"$",n=function(n){n.source===t&&"string"===typeof n.data&&0===n.data.indexOf(e)&&p(+n.data.slice(e.length))};t.addEventListener?t.addEventListener("message",n,!1):t.attachEvent("onmessage",n),i=function(n){t.postMessage(e+n,"*")}}():t.MessageChannel?function(){var t=new MessageChannel;t.port1.onmessage=function(t){p(t.data)},i=function(e){t.port2.postMessage(e)}}():a&&"onreadystatechange"in a.createElement("script")?function(){var t=a.documentElement;i=function(e){var n=a.createElement("script");n.onreadystatechange=function(){p(e),n.onreadystatechange=null,t.removeChild(n),n=null},t.appendChild(n)}}():i=function(t){setTimeout(p,0,t)},u.setImmediate=function(t){"function"!==typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),n=0;n<e.length;n++)e[n]=arguments[n+1];var s={callback:t,args:e};return o[r]=s,i(r),r++},u.clearImmediate=c}function c(t){delete o[t]}function p(t){if(s)setTimeout(p,0,t);else{var e=o[t];if(e){s=!0;try{!function(t){var e=t.callback,n=t.args;switch(n.length){case 0:e();break;case 1:e(n[0]);break;case 2:e(n[0],n[1]);break;case 3:e(n[0],n[1],n[2]);break;default:e.apply(void 0,n)}}(e)}finally{c(t),s=!1}}}}}("undefined"===typeof self?"undefined"===typeof t?this:t:self)}).call(this,n(71),n(73))},399:function(t,e,n){"use strict";Object.create;Object.create;var i=n(0),r=i.useState,o=i.useMemo,s=i.useCallback,a=i.useEffect,u=function(){};e.a=function(t,e){void 0===t&&(t={}),void 0===e&&(e=[]);var n=t.onFiles,i=t.onText,c=t.onUri,p=r(!1),h=p[0],l=p[1],f=s(l,[]),d=o((function(){return function(t){return function(e,n){var i=e.getData("text/uri-list");if(i)(t.onUri||u)(i,n);else if(e.files&&e.files.length)(t.onFiles||u)(Array.from(e.files),n);else if(n.clipboardData){var r=n.clipboardData.getData("text");(t.onText||u)(r,n)}else;}}(t)}),[n,i,c]);return a((function(){var t=function(t){t.preventDefault(),f(!0)},e=function(t){t.preventDefault(),f(!0)},n=function(){f(!1)},r=function(){f(!1)},o=function(t){t.preventDefault(),f(!1),d(t.dataTransfer,t)},s=function(t){d(t.clipboardData,t)};return document.addEventListener("dragover",t),document.addEventListener("dragenter",e),document.addEventListener("dragleave",n),document.addEventListener("dragexit",r),document.addEventListener("drop",o),i&&document.addEventListener("paste",s),function(){document.removeEventListener("dragover",t),document.removeEventListener("dragenter",e),document.removeEventListener("dragleave",n),document.removeEventListener("dragexit",r),document.removeEventListener("drop",o),document.removeEventListener("paste",s)}}),function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var i=Array(t),r=0;for(e=0;e<n;e++)for(var o=arguments[e],s=0,a=o.length;s<a;s++,r++)i[r]=o[s];return i}([d],e)),{over:h}}}}]);
//# sourceMappingURL=14.6822909b.chunk.js.map