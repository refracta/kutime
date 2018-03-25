<template>
	<ul>
		<li class="button is-fullwidth is-white is-static is-placeholder"
			:class="[!isReady ? 'is-loading' : '']"
			v-if="isGuiding">
			<span v-if="!hasCandidates">추가된 강의가 없습니다.</span>
			<span class="icon is-medium" v-if="hasCandidates">
				<i class="fa fa-sliders fa-lg"></i>
			</span>
			<span v-if="hasCandidates">을 선택하세요.</span>
		</li>
	</ul>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
	name: 'calcList',
	data() {
		return {};
	},
	computed: {
		isGuiding() {
			return true;
		},
		...mapState([
			'isReady',
		]),
		...mapGetters([
			'hasCandidates',
		]),
	},
	methods: {
	},
};
</script>
