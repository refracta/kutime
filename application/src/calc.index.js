import Vue from 'vue';
import Vuex from 'vuex';
import 'font-awesome/scss/font-awesome.scss';
import CalcPage from './components/CalcPage';
import { storage } from './utils/web-storage';
import { Paginator } from './utils/prototype-class';
import './assets/global-tuning.scss';

require('es6-promise').polyfill();

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		lectureList: [],
		calculatedList: [],
		lectureGroups: [],
		sliderValues: JSON.stringify([]),
		activatedIndex: null,
		starredCodes: storage.getItem('starredCodes'),
		paginator: new Paginator(),
		isSlidering: false,
		isScheduling: false,
		isLoading: null,
		isReady: false,
	},
	getters: {
		lectureDetails(state) {
			const detailSet = {};

			for (let idx = 0; idx < state.lectureList.length; idx += 1) {
				const lecture = state.lectureList[idx].slice();

				detailSet[lecture[0]] = lecture;
			}

			return detailSet;
		},
		starredList(state) {
			return JSON.parse(state.starredCodes);
		},
		hasCandidates(state, getters) {
			return (getters.starredList.length > 0);
		},
		usesCandidates() {
			return false;
		},
		usesFilter() {
			return false;
		},
	},
	mutations: {
		readyForCalculation(state, payload) {
			state.lectureList = payload.lectures.slice();
			state.isReady = true;
		},
		loadingCases(state) {
			state.calculatedList = [];
			state.isLoading = true;
		},
		openSlider(state) {
			document.querySelector('html').classList.add('is-clipped');
			state.isSlidering = true;
		},
		closeSlider(state) {
			document.querySelector('html').classList.remove('is-clipped');
			state.isSlidering = false;
		},
		applySlider(state, payload) {
			const { lectureGroups } = payload;
			const { sliderValues } = payload;

			state.lectureGroups = lectureGroups;
			state.sliderValues = JSON.stringify(sliderValues);
		},
		openSchedule(state, payload) {
			state.activatedIndex = payload;
			document.querySelector('html').classList.add('is-clipped');
			state.isScheduling = true;
		},
		closeSchedule(state) {
			state.activatedIndex = null;
			document.querySelector('html').classList.remove('is-clipped');
			state.isScheduling = false;
		},
	},
	actions: {
		calculateCases({ state }) {
			setTimeout(() => {
				const lectureGroups = state.lectureGroups;
				const sliderValues = JSON.parse(state.sliderValues);
				let totalCases = 1;
				const result = [];

				for (let groupIdx = 0; groupIdx < lectureGroups.length; groupIdx += 1) {
					if (sliderValues[groupIdx] !== -1) {
						totalCases *= (1 + lectureGroups[groupIdx].lectureCodeList.length);
					}
				}

				// when caseIdx === 0, there is no lecture will choose, so just skipped
				for (let caseIdx = 1; caseIdx < totalCases; caseIdx += 1) {
					let caseNum = caseIdx;
					let isOverlapped = false;
					let totalCredits = 0;
					const caseCodeList = [];
					const uniqueTimeList = [];

					for (let groupIdx = 0; groupIdx < lectureGroups.length; groupIdx += 1) {
						const codeIdx = caseNum % (1 + lectureGroups[groupIdx].lectureCodeList.length);

						if (sliderValues[groupIdx] !== -1) {
							if (codeIdx === 0) {
								if (sliderValues[groupIdx] === 1) {
									isOverlapped = true;
								}
							}
							else {
								totalCredits += lectureGroups[groupIdx].credit;
								caseCodeList.push(lectureGroups[groupIdx].lectureCodeList[codeIdx - 1]);

								for (let timeIdx = 0; timeIdx < lectureGroups[groupIdx].lectureTimeList[codeIdx - 1].length; timeIdx += 1) {
									const formattedTime = lectureGroups[groupIdx].lectureTimeList[codeIdx - 1][timeIdx];

									if (uniqueTimeList.indexOf(formattedTime) === -1) {
										uniqueTimeList.push(formattedTime);
									}
									else {
										isOverlapped = true;
									}
								}
							}

							if (isOverlapped) {
								break;
							}

							caseNum /= (1 + lectureGroups[groupIdx].lectureCodeList.length);
							caseNum = Math.floor(caseNum); // just get quotient
						}
					}

					if (!isOverlapped && totalCredits >= 12 && totalCredits <= 20) {
						result.push(caseCodeList);
					}
				}

				state.paginator.assign(result.slice());
				state.calculatedList = state.paginator.getNext();
				state.isLoading = false;
			}, 50);
		},
		renderNext({ state }) {
			const nextPart = state.paginator.getNext();

			if (nextPart !== null) {
				state.isLoading = true;

				setTimeout(() => {
					state.calculatedList = state.calculatedList.concat(nextPart);
					state.isLoading = false;
				}, 200);
			}
		},
	},
});

const viewModel = new Vue({
	el: '#intime-app',
	store,
	components: { CalcPage },
	template: '<CalcPage/>',
});
