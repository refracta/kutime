<template>
	<div class="modal"
		:class="[isActive ? 'is-active' : '']">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">포함-배제 선택</p>
				<button class="delete" aria-label="close" @click="closeSlider"></button>
			</header>
			<section class="modal-card-body">
				<ul>
					<li class="columns is-mobile is-gapless"
						v-for="(group, index) in groupedList"
						:key="index">
						<div class="column">
							<span>{{ group.groupName }}</span>
						</div>
						<div class="column is-one-third">
							<vue-slider ref="sliders" v-bind="sliderOptions" :show="isActive"></vue-slider>
						</div>
					</li>
				</ul>
			</section>
			<footer class="modal-card-foot">
				<button class="button" @click="closeSlider">닫기</button>
				<button class="button is-primary" @click="calculate">적용</button>
			</footer>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import vueSlider from 'vue-slider-component';

export default {
	name: 'lectureSliderModal',
	components: {
		vueSlider,
	},
	data() {
		return {
			sliderOptions: {
				width: '100%',
				min: -1,
				max: 1,
				speed: 0,
				tooltip: false,
				value: 0,
				bgStyle: {
					backgroundImage: '-webkit-linear-gradient(left, #ff3860, #00d1b2)',
				},
				processStyle: {
					backgroundColor: 'transparent',
				},
			},
		};
	},
	computed: {
		...mapState({
			isActive: state => state.isSlidering,
			groupedList(state) {
				const originalList = state.lectureList;
				const newList = [];
				const uniqueCodes = {};

				for (let idx = 0; idx < originalList.length; idx += 1) {
					const lecture = originalList[idx].slice();
					const matched = lecture[0].match(/^([a-z0-9]+)-[0-9]+$/i);
					const prefix = matched[1];
					const lessonList = lecture[12].match(/(D[T0-9]+)/g);
					const timeList = [];

					for (let dayIdx = 0; dayIdx < lessonList.length; dayIdx += 1) {
						const dailyLesson = lessonList[dayIdx].match(/[DT]([0-9]+)/g);
						const lessonDay = Number(dailyLesson[0].slice(1));

						for (let timeIdx = 1; timeIdx < dailyLesson.length; timeIdx += 1) {
							const lessonTime = Number(dailyLesson[timeIdx].slice(1));
							const formattedTime = lessonDay * 100 + lessonTime;

							timeList.push(formattedTime);
						}
					}

					if (uniqueCodes[prefix] === undefined) {
						const lectureGroup = {
							groupCode: prefix,
							groupName: lecture[2],
							credit: Number(lecture[4]),
							lectureCodeList: [lecture[0]],
							lectureTimeList: [timeList],
						};

						uniqueCodes[prefix] = newList.length;
						newList.push(lectureGroup);
					}
					else {
						const groupIndex = uniqueCodes[prefix];

						newList[groupIndex].lectureCodeList.push(lecture[0]);
						newList[groupIndex].lectureTimeList.push(timeList);
					}
				}

				return newList;
			},
		}),
	},
	methods: {
		closeSlider() {
			this.$store.commit('closeSlider');
		},
		calculate() {
			const sliderValues = [];

			this.$refs.sliders.forEach((slider, idx) => {
				sliderValues.push(slider.getValue());
			});

			this.$store.commit('applySlider', {
				lectureGroups: this.groupedList,
				sliderValues,
			});
			this.$store.commit('closeSlider');
		},
	},
};
</script>
