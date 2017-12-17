'use strict';

Vue.component('appnav-button', {
	template: '#template-appnav-button'
});

var intime = {};

intime.run = function () {
	if (document.querySelectorAll('#intime-app').length > 0) {
		intime.vm = new Vue({
			el: '#intime-app',
			data: {
				message: 'test message',
			},
			computed: {},
			methods: {}
		});
	}
};

intime.run();
