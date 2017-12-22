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

Vue.component('appnav', {
	props: ['anchors'],
	template: '#template-appnav'
});

},{}],2:[function(require,module,exports){
'use strict';

var intime = {
	anchors: [
		{ icon: 'fa-home', href: '/intro' },
		{ icon: 'fa-calendar', href: '/lecture' },
		{ icon: 'fa-calculator', href: '/calc' },
		{ icon: 'fa-user' }
	]
};

intime.run = function () {
	var pathname = location.pathname;

	if (pathname.endsWith('/')) {
		pathname = pathname.slice(0, -1);
	}

	intime.pathname = pathname || '/intro';

	for (var idx = 0; idx < intime.anchors.length; idx += 1) {
		var anchor = intime.anchors[idx];

		anchor.active = (anchor.href === intime.pathname);
		anchor.disable = (anchor.href === undefined);
	}

	if (document.querySelectorAll('#intime-app').length > 0) {
		intime.vm = new Vue({
			el: '#intime-app',
			data: {
				anchors: intime.anchors
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
