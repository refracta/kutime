<template>
	<div class="modal"
		:class="[isActive ? 'is-active' : '']">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">포함-배제 선택</p>
				<button class="delete" aria-label="close" @click="close"></button>
			</header>
			<section class="modal-card-body">
				<div>Lecture list will display here</div>
			</section>
			<footer class="modal-card-foot">
				<button class="button" @click="close">닫기</button>
				<button class="button is-primary" @click="apply">적용</button>
			</footer>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'lectureSliderModal',
	data() {
		return {
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

					if (uniqueCodes[prefix] === undefined) {
						const lectureGroup = {
							groupCode: prefix,
							groupName: lecture[2],
						};

						uniqueCodes[prefix] = newList.length;
						newList.push(lectureGroup);
					}
				}

				return newList;
			},
		}),
	},
	methods: {
		close() {
			this.$store.commit('closeSlider');
		},
		apply() {
			this.$store.commit('applySlider');
			this.$store.commit('closeSlider');
		},
	},
};
</script>
