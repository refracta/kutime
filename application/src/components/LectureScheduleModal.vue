<template>
	<div class="modal"
		:class="[isActive ? 'is-active' : '']">
		<div class="modal-background"></div>
		<div class="modal-content">
			<div class="box">
				<table class="table is-fullwidth is-size-7-mobile">
					<thead>
						<tr>
							<th>시간</th>
							<th>월</th>
							<th>화</th>
							<th>수</th>
							<th>목</th>
							<th>금</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th colspan="6">
								<div>이러닝 목록</div>
							</th>
						</tr>
					</tfoot>
					<tbody>
						<tr v-for="(rowItem, rowIndex) in 18">
							<th rowspan="2" v-if="rowIndex % 2 === 0"></th>
							<td v-for="colItem in 5"
								:style="(timeSlots[colItem * 100 + rowItem] ? `border-color: ${timeSlots[colItem * 100 + rowItem].color}; background-color: ${timeSlots[colItem * 100 + rowItem].color};` : '')">
							</td>
						</tr>
					</tbody>
				</table>
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

					const lessonList = lecture[12].match(/(D[T0-9]+)/g);

					for (let dayIdx = 0; dayIdx < lessonList.length; dayIdx += 1) {
						const dailyLesson = lessonList[dayIdx].match(/[DT]([0-9]+)/g);
						const lessonDay = Number(dailyLesson[0].slice(1));

						for (let timeIdx = 1; timeIdx < dailyLesson.length; timeIdx += 1) {
							const lessonTime = Number(dailyLesson[timeIdx].slice(1));
							const formattedTime = lessonDay * 100 + lessonTime;

							slotSet[formattedTime] = { color: lectureColor };
						}
					}
				});
			}

			return slotSet;
		},
		...mapState([
			'calculatedList',
			'activatedIndex',
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
	},
};
</script>

<style lang="scss" scoped>
.table {
	td {
		padding-top: 0.75em;
		padding-bottom: 0.75em;
	}

	th {
		padding: 0 0.5em;
		vertical-align: middle;
	}

	tbody th {
		width: calc(60px + 12vw);
	}
}
</style>
