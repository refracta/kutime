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
		isReady: false,
	},
	getters: {
		starredList(state) {
			return JSON.parse(state.starredCodes);
		},
	},
	mutations: {
		readyForCalculation(state, payload) {
			state.lectureList = payload.lectures.slice();
			state.isReady = true;
		},
	},
});

const viewModel = new Vue({
	el: '#intime-app',
	store,
	components: { CalcPage },
	template: '<CalcPage/>',
});
