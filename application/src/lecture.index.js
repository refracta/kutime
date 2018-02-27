import Vue from 'vue';
import Vuex from 'vuex';
import LecturePage from './components/LecturePage.vue';
import { storage } from './utils/web-storage';
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
		starredCodes: storage.getItem('starredCodes'),
		isDetailing: false,
		isFiltering: false,
		isLoading: null,
		isReady: false
	},
	getters: {
		starredList (state) {
			return JSON.parse(state.starredCodes);
		},
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
		addLecture (state, payload) {
			let lectureCode = state.lectureList[payload][0];
			let starredList = JSON.parse(state.starredCodes);

			if (starredList.indexOf(lectureCode) === -1) {
				state.starredCodes = JSON.stringify([...starredList, lectureCode]);
				storage.setItem('starredCodes', state.starredCodes);
			}
		},
		removeLecture (state, payload) {
			let lectureCode = state.lectureList[payload][0];
			let starredList = JSON.parse(state.starredCodes);
			let idx = starredList.indexOf(lectureCode);

			if (idx !== -1) {
				starredList.splice(idx, 1);
				state.starredCodes = JSON.stringify(starredList);
				storage.setItem('starredCodes', state.starredCodes);
			}
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
		},
		loadCandidates (state) {
			state.activatedCode = 'candidates';
			state.activatedName = '';
		}
	}
});

new Vue({
	el: '#intime-app',
	store,
	components: { LecturePage },
	template: '<LecturePage/>'
});
