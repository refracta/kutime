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
		calculatedList: [],
		starredCodes: storage.getItem('starredCodes'),
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
			let totalCases = 1;
			let result = [];

			state.calculatedList = [];
			state.isLoading = true;

			for (let groupIdx = 0; groupIdx < lectureGroups.length; groupIdx += 1) {
				if (sliderValues[groupIdx] !== -1) {
					totalCases *= (1 + lectureGroups[groupIdx].lectureCodeList.length);
				}
			}

			// when caseIdx === 0, there is no lecture will choose, so just skipped
			for (let caseIdx = 1; caseIdx < totalCases; caseIdx += 1) {
				let caseNum = caseIdx;
				let isOverlapped = false;
				let caseCodeList = [];
				let uniqueTimeList = [];

				for (let groupIdx = 0; groupIdx < lectureGroups.length; groupIdx += 1) {
					let codeIdx = caseNum % (1 + lectureGroups[groupIdx].lectureCodeList.length);

					if (sliderValues[groupIdx] === -1) {
						continue;
					}

					if (codeIdx === 0) {
						if (sliderValues[groupIdx] === 1) {
							isOverlapped = true;
						}
					}
					else {
						caseCodeList.push(lectureGroups[groupIdx].lectureCodeList[codeIdx - 1]);
						lectureGroups[groupIdx].lectureTimeList[codeIdx - 1].forEach((formattedTime) => {
							if (uniqueTimeList.indexOf(formattedTime) === -1) {
								uniqueTimeList.push(formattedTime);
							}
							else {
								isOverlapped = true;
							}
						});
					}

					if (isOverlapped) {
						break;
					}

					caseNum /= (1 + lectureGroups[groupIdx].lectureCodeList.length);
					caseNum = Math.floor(caseNum); // just get quotient
				}

				if (!isOverlapped) {
					result.push(caseCodeList);
				}
			}

			state.calculatedList = result.slice();
			state.isLoading = false;
		},
		openSchedule(state) {
			document.querySelector('html').classList.add('is-clipped');
			state.isScheduling = true;
		},
		closeSchedule(state) {
			document.querySelector('html').classList.remove('is-clipped');
			state.isScheduling = false;
		},
	},
});

const viewModel = new Vue({
	el: '#intime-app',
	store,
	components: { CalcPage },
	template: '<CalcPage/>',
});
