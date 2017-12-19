(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Vue.component('appnav-button', {
	props: ['anchor'],
	template: '#template-appnav-button'
});

Vue.component('appnav-column', {
	props: ['anchor'],
	template: '#template-appnav-column'
});

},{}],2:[function(require,module,exports){
'use strict';

var intime = {};

intime.run = function () {
	if (document.querySelectorAll('#intime-app').length > 0) {
		intime.vm = new Vue({
			el: '#intime-app',
			data: {
				anchors: [
					{ icon: 'fa-home', active: true, disable: false, href: '/intro' },
					{ icon: 'fa-calendar', active: false, disable: false, href: '/lecture' },
					{ icon: 'fa-calculator', active: false, disable: false, href: '/calc' },
					{ icon: 'fa-user', active: false, disable: true }
				]
			},
			computed: {},
			methods: {}
		});
	}
};

module.exports = intime;

},{}],3:[function(require,module,exports){
'use strict';

require('./component');

require('./intime').run();

},{"./component":1,"./intime":2}]},{},[3]);
