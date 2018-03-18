import Vue from 'vue';
import Vuex from 'vuex';
import 'bulma/css/bulma.css';
import 'font-awesome/scss/font-awesome.scss';
import CalcPage from './components/CalcPage';
import { storage } from './utils/web-storage';
import './assets/global-tuning.scss';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		lectureList: [],
		starredCodes: storage.getItem('starredCodes'),
		isSlidering: false,
		isReady: false,
	},
	getters: {
		starredList(state) {
			return JSON.parse(state.starredCodes);
		},
		hasCandidates(state, getters) {
			return (getters.starredList.length > 0);
		},
	},
	mutations: {
		readyForCalculation(state, payload) {
			state.lectureList = payload.lectures.slice();
			state.isReady = true;
		},
		openSlider(state) {
			document.querySelector('html').classList.add('is-clipped');
			state.isSlidering = true;
		},
		closeSlider(state) {
			document.querySelector('html').classList.remove('is-clipped');
			state.isSlidering = false;
		},
		applySlider(state) {
			console.log('apply slider');
		},
	},
});

const viewModel = new Vue({
	el: '#intime-app',
	store,
	components: { CalcPage },
	template: '<CalcPage/>',
});
