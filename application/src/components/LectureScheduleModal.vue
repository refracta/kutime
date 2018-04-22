<template>
	<div class="modal"
		:class="[isActive ? 'is-active' : '']">
		<div class="modal-background"></div>
		<div class="modal-content">
			<div class="box">
				<div>TEST</div>
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
