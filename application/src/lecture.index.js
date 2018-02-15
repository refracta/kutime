import Vue from 'vue';
import Vuex from 'vuex';
import LecturePage from './components/LecturePage.vue';
import 'bulma/css/bulma.css';
import 'font-awesome/scss/font-awesome.scss';
import './assets/global-tuning.scss';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		departments: [],
		others: [],
		lectures: [],
		activeCode: '',
		activeName: '',
		isFiltering: false,
		isLoading: null,
		isReady: false
	},
	mutations: {
		readyForLectures (state, payload) {
			state.departments = payload.departments.slice();
			state.others = payload.others.slice();
			state.isReady = true;
		},
		loadingLectures (state) {
			state.lectures = [];
			state.isLoading = true;
		},
		renderLectures (state, payload) {
			state.lectures = payload.lectures.slice();
			state.activeName = payload.name;
			state.isLoading = false;
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
				state.activeCode = payload;
				state.activeName = '';
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
