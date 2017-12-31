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
				anchors: intime.anchors,
				depts: [],
				others: [],
				activeCode: null,
				lectures: []
			},
			computed: {},
			methods: {
				getLectures: _.debounce(function () {
					axios({
						url: ('/api/lectures/' + this.activeCode),
						method: 'get'
					})
					.then(function (response) {
						intime.vm.lectures = response.data.lectures.slice();
					});
				}, 200)
			},
			watch: {
				activeCode: function () {
					this.getLectures();
				}
			},
			mounted: function () {
				this.$nextTick(function () {
					if (intime.pathname === intime.anchors[1].href) {
						axios({
							url: '/api/departments',
							method: 'get'
						})
						.then(function (response) {
							intime.vm.depts = response.data.slice();
							intime.vm.activeCode = response.data[0].code;
						});

						axios({
							url: '/api/others',
							method: 'get'
						})
						.then(function (response) {
							intime.vm.others = response.data.slice();
						});
					}
				});
			},
		});
	}
};

module.exports = intime;
