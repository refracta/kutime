<template>
	<section class="hero is-fullheight">
		<main class="hero-body is-vertical-paddingless">
			<div class="container">
				<CalcList/>
			</div>
		</main>

		<TitleBar/>

		<MenuBar/>

		<LectureSliderModal/>
		<LectureScheduleModal/>
	</section>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import TitleBar from './TitleBar';
import MenuBar from './MenuBar';
import CalcList from './CalcList';
import LectureSliderModal from './LectureSliderModal';
import LectureScheduleModal from './LectureScheduleModal';

export default {
	name: 'calcPage',
	components: {
		TitleBar, MenuBar, CalcList, LectureSliderModal, LectureScheduleModal,
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
