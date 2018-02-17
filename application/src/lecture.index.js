import Vue from 'vue';
import Vuex from 'vuex';
import LecturePage from './components/LecturePage.vue';
import 'bulma/css/bulma.css';
import 'font-awesome/scss/font-awesome.scss';
import './assets/global-tuning.scss';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		departmentList: [],
		otherList: [],
		lectureList: [],
		activatedCode: '',
		activatedIndex: null,
		activatedName: '',
		isDetailing: false,
		isFiltering: false,
		isLoading: null,
		isReady: false
	},
	mutations: {
		readyForLectures (state, payload) {
			state.departmentList = payload.departments.slice();
			state.otherList = payload.others.slice();
			state.isReady = true;
		},
		loadingLectures (state) {
			state.lectureList = [];
			state.isLoading = true;
		},
		renderLectures (state, payload) {
			state.lectureList = payload.lectures.slice();
			state.activatedName = payload.name;
			state.isLoading = false;
		},
		openDetail (state, payload) {
			state.activatedIndex = payload;
			document.querySelector('html').classList.add('is-clipped');
			state.isDetailing = true;
		},
		closeDetail (state) {
			state.activatedIndex = null;
			document.querySelector('html').classList.remove('is-clipped');
			state.isDetailing = false;
		},
		openFilter (state) {
			document.querySelector('html').classList.add('is-clipped');
			state.isFiltering = true;
		},
		closeFilter (state) {
			document.querySelector('html').classList.remove('is-clipped');
			state.isFiltering = false;
		},
		applyFilter (state, payload) {
			if (payload !== '') {
				state.activatedCode = payload;
				state.activatedName = '';
			}
		}
	}
});

new Vue({
	el: '#intime-app',
	store,
	components: { LecturePage },
	template: '<LecturePage/>'
});
