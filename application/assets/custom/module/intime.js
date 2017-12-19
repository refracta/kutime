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
