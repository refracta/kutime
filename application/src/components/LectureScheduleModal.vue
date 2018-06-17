<template>
	<div class="modal"
		:class="[isActive ? 'is-active' : '']">
		<div class="modal-background"></div>
		<div class="modal-content is-horizontal-clipped">
			<div class="box">
				<label class="label">
					#{{ activatedIndex === null ? 0 : 1 + activatedIndex }}/{{ paginator.count() }}
				</label>
				<div class="table is-fullwidth tile is-flex is-vertical is-size-7-mobile"
					:class="[hasELearning ? 'is-marginless' : '']">
					<div class="imitate-thead columns is-mobile is-gapless is-marginless">
						<div class="imitate-th lesson-hour">시간</div>
						<div class="column">
							<div class="imitate-th">월</div>
						</div>
						<div class="column">
							<div class="imitate-th">화</div>
						</div>
						<div class="column">
							<div class="imitate-th">수</div>
						</div>
						<div class="column">
							<div class="imitate-th">목</div>
						</div>
						<div class="column">
							<div class="imitate-th">금</div>
						</div>
					</div>
					<div class="imitate-tfoot columns is-mobile is-gapless is-marginless">
						<div class="column">
							<div class="imitate-th">
								<div>이러닝 목록</div>

								<div class="tags" v-show="hasELearning">
									<span v-for="(item, index) in 18" :key="index" v-if="timeSlots[index]" class="tag"
										:style="`background-color: ${timeSlots[index].color}; color: ${timeSlots[index].invertedColor};`">
										{{ timeSlots[index].name }}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div class="columns is-mobile is-gapless is-marginless" v-for="(rowItem, rowIndex) in (18 / 2)" :key="rowIndex">
						<div class="imitate-th lesson-hour level is-mobile is-marginless">
							<div>{{ (rowIndex + 9) | convertHourNaively }} ~ {{ (rowIndex + 10) | convertHourNaively }}</div>
						</div>
						<div class="column" v-for="(colItem, colIndex) in 5" :key="colIndex">
							<div class="lesson-time" v-for="nthHalf in 2"
								:class="[timeSlots[colItem * 100 + rowIndex * 2 + nthHalf] ? 'tooltip' : '']"
								:data-tooltip="[timeSlots[colItem * 100 + rowIndex * 2 + nthHalf] ? timeSlots[colItem * 100 + rowIndex * 2 + nthHalf].name : '']"
								:style="(timeSlots[colItem * 100 + rowIndex * 2 + nthHalf] ? `border-color: ${timeSlots[colItem * 100 + rowIndex * 2 + nthHalf].color}; background-color: ${timeSlots[colItem * 100 + rowIndex * 2 + nthHalf].color};` : '')">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<button class="modal-close is-large" aria-label="close" @click="closeSchedule"></button>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
	name: 'lectureScheduleModal',
	components: {
	},
	data() {
		return {};
	},
	filters: {
		convertHourNaively(num) {
			return `${num > 12 ? num % 12 : num} ${num >= 12 ? 'pm' : 'am'}`;
		},
	},
	computed: {
		timeSlots() {
			const slotSet = {};

			if (this.activatedIndex !== null) {
				this.calculatedList[this.activatedIndex].forEach((lectureCode) => {
					const lecture = this.lectureDetails[lectureCode];

					const matched = lecture[0].match(/^([a-z]+)([0-9]+-[0-9]+)$/i);
					const x = parseInt(matched[1], 36);
					const y = Number(matched[2].replace('-', ''));
					const z = x * y;
					const lectureColor = `#${z.toString(16).slice(-6)}`;
					const lectureColorInvert = this.getInvertColor(z.toString(16).slice(-6));

					const lessonList = lecture[12].match(/(D[T0-9]+)/g);

					for (let dayIdx = 0; dayIdx < lessonList.length; dayIdx += 1) {
						const dailyLesson = lessonList[dayIdx].match(/[DT]([0-9]+)/g);
						const lessonDay = Number(dailyLesson[0].slice(1));

						for (let timeIdx = 1; timeIdx < dailyLesson.length; timeIdx += 1) {
							const lessonTime = Number(dailyLesson[timeIdx].slice(1));
							const formattedTime = (lessonDay * 100) + lessonTime;

							slotSet[formattedTime] = {
								color: lectureColor,
								invertedColor: lectureColorInvert,
								name: lecture[2],
							};
						}
					}
				});
			}

			return slotSet;
		},
		hasELearning() {
			for (let index = 0; index < 18; index += 1) {
				if (this.timeSlots[index] !== undefined) {
					return true;
				}
			}

			return false;
		},
		...mapState([
			'calculatedList',
			'activatedIndex',
			'paginator',
		]),
		...mapState({
			isActive: state => state.isScheduling,
		}),
		...mapGetters([
			'lectureDetails',
		]),
	},
	methods: {
		closeSchedule() {
			this.$store.commit('closeSchedule');
		},
		getInvertColor(hex) {
			// reference - bulma/sass/utilities/functions.sass

			const rgbSet = {
				red: parseInt(hex.substring(0, 2), 16),
				green: parseInt(hex.substring(2, 4), 16),
				blue: parseInt(hex.substring(4, 6), 16),
			};
			const rgbKey = Object.keys(rgbSet);
			const rgbValue = Object.values(rgbSet);

			rgbKey.forEach((color, index) => {
				let value = rgbValue[index] / 255;

				if (value < 0.03928) {
					value /= 12.92;
				}
				else {
					value = (value + 0.055) / 1.055;
					value *= value;
				}

				rgbSet[color] = value;
			});

			const luminance = (rgbSet.red * 0.2126) + (rgbSet.green * 0.7152) + (rgbSet.blue * 0.0722);

			return (luminance > 0.55 ? 'rgba(0, 0, 0, 0.7)' : '#fff');
		},
	},
};
</script>
