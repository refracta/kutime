<template>
	<section class="hero is-fullheight">
		<main class="hero-body is-vertical-paddingless">
			<div class="container">
				<span>경우의 수 계산 페이지</span>
			</div>
		</main>

		<TitleBar/>

		<MenuBar/>
	</section>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import TitleBar from './TitleBar';
import MenuBar from './MenuBar';

export default {
	name: 'calcPage',
	components: {
		TitleBar, MenuBar,
	},
	data() {
		return {};
	},
	computed: {
		...mapState([
			'starredCodes',
		]),
	},
	mounted() {
		this.$nextTick(function () {
			const url = '/api/candidates';
			const params = {
				codes: this.starredCodes,
			};

			axios({
				url,
				method: 'get',
				params,
			})
			.then((response) => {
				this.$store.commit('readyForCalculation', response.data);
			});
		});
	},
};
</script>
