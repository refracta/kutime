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

Vue.component('lecture-list', {
	props: ['activated', 'lectures', 'state'],
	template: '#template-lecture-list'
});

Vue.component('lecture-filter', {
	props: ['depts', 'others', 'activated', 'state'],
	template: '#template-lecture-filter',
	data: function () {
		return {
			temporaryCode: this.activated
		};
	},
	methods: {
		chooseCategory: function (e) {
			this.temporaryCode = e.target.value;
		},
		revertCategory: function (e) {
			this.temporaryCode = this.activated;
			this.$emit('close');
		},
		commitCategory: function (e) {
			this.$emit('apply', this.temporaryCode);
			this.$emit('close');
		}
	}
});

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
				activeCode: '',
				activeName: '',
				lectures: [],
				state: {
					isLoading: true,
					isFiltering: false
				}
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
						intime.vm.activeName = response.data.name;
						intime.vm.state.isLoading = false;
					});
				}, 200),
				openFilter: function (e) {
					document.querySelector('html').classList.add('is-clipped');
					intime.vm.state.isFiltering = true;
				},
				closeFilter: function (e) {
					document.querySelector('html').classList.remove('is-clipped');
					intime.vm.state.isFiltering = false;
				},
				applyFilter: function (code) {
					if (code !== '') {
						intime.vm.activeCode = code;
					}
				}
			},
			watch: {
				activeCode: function () {
					this.state.isLoading = true;
					this.lectures = [];
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
			}
		});
	}
};

intime.run();
