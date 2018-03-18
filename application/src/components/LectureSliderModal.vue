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
