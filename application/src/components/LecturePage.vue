<template>
	<section class="hero is-fullheight">
		<main class="hero-body is-vertical-paddingless">
			<div class="container">
				<LectureList/>
			</div>
		</main>

		<TitleBar/>

		<MenuBar/>

		<LectureDetailModal/>
		<LectureFilterModal/>
	</section>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import TitleBar from './TitleBar';
import MenuBar from './MenuBar';
import LectureList from './LectureList';
import LectureDetailModal from './LectureDetailModal';
import LectureFilterModal from './LectureFilterModal';

export default {
	name: 'lecturePage',
	components: {
		TitleBar, MenuBar, LectureList, LectureDetailModal, LectureFilterModal,
	},
	data() {
		return {};
	},
	computed: {
		...mapState([
			'activatedCode',
			'starredCodes',
		]),
	},
	mounted() {
		this.$nextTick(function () {
			axios({ url: '/api/categories', method: 'get' })
				.then((response) => {
					this.$store.commit('readyForLectures', response.data);
				});
		});
	},
	methods: {
		getLectures() {
			this.$store.commit('loadingLectures');

			let url;
			const params = {};
			const category = this.activatedCode;

			if (category === 'candidates') {
				url = `/api/${category}`;
				params.codes = this.starredCodes;
			}
			else {
				url = `/api/lectures/${category}`;
			}

			axios({ url, method: 'get', params })
				.then((response) => {
					this.$store.commit('renderLectures', response.data);
				});
		},
	},
	watch: {
		activatedCode() {
			this.getLectures();
		},
	},
};
</script>
