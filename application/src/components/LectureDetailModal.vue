<template>
	<div class="modal"
		:class="[isActive ? 'is-active' : '']">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">시간표 정보</p>
				<button class="delete" aria-label="close" @click="closeDetail"></button>
			</header>
			<section class="modal-card-body">
				<ul class="is-size-7-mobile">
					<li
						v-for="(column, index) in columnList"
						:key="index">
						<strong>{{ column }}</strong> - <span>{{ lecture[index] }}</span>
					</li>
				</ul>
			</section>
			<footer class="modal-card-foot">
				<button class="button" @click="closeDetail">닫기</button>
			</footer>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'lectureDetailModal',
	data () {
		return {
			columnList: ['학수번호', '분반그룹', '과목명', '학년', '학점', '과목구분', '시간 및 강의실', '담당교수', '평가방식', '비고'],
		};
	},
	computed: {
		lecture () {
			return (this.lectureList[this.activatedIndex] || []);
		},
		...mapState([
			'lectureList',
			'activatedIndex',
		]),
		...mapState({
			isActive: state => state.isDetailing,
		}),
	},
	methods: {
		closeDetail () {
			this.$store.commit('closeDetail');
		},
	},
};
</script>
