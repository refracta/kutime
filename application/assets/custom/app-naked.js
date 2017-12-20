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

intime.run();
