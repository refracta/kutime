<template>
	<ul>
		<li class="button is-fullwidth is-white is-static is-placeholder"
			:class="[!isReady ? 'is-loading' : '']"
			v-if="isGuiding">
			<span class="icon is-medium">
				<i class="fa fa-sliders fa-lg"></i>
			</span>
			<span>을 선택하세요.</span>
		</li>
	</ul>
</template>

<script>
import { mapState } from 'vuex';

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
			'lectureList',
			'isReady',
		]),
	},
	methods: {
	},
};
</script>
