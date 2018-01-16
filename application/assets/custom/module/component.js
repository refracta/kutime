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
		closeFilter: function (e) {
			this.temporaryCode = intime.vm.activeCode;
			document.querySelector('html').classList.remove('is-clipped');
			intime.vm.state.isFiltering = false;
		},
		applyFilter: function (e) {
			if (this.temporaryCode !== '') {
				intime.vm.activeCode = this.temporaryCode;
			}
			document.querySelector('html').classList.remove('is-clipped');
			intime.vm.state.isFiltering = false;
		}
	}
});
