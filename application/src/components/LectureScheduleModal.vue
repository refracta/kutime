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
							<td v-for="colItem in 5"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<button class="modal-close is-large" aria-label="close" @click="closeSchedule"></button>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'lectureScheduleModal',
	components: {
	},
	data() {
		return {};
	},
	computed: {
		...mapState({
			isActive: state => state.isScheduling,
		}),
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
