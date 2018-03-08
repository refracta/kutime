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
import TitleBar from './TitleBar.vue';
import MenuBar from './MenuBar.vue';
import LectureList from './LectureList.vue';
import LectureDetailModal from './LectureDetailModal.vue';
import LectureFilterModal from './LectureFilterModal.vue';

export default {
	name: 'lecturePage',
	components: {
		TitleBar, MenuBar, LectureList, LectureDetailModal, LectureFilterModal,
	},
	data () {
		return {};
	},
	computed: {
		...mapState([
			'activatedCode',
			'starredCodes',
		]),
	},
	mounted () {
		this.$nextTick(function () {
			axios({
				url: '/api/categories',
				method: 'get',
			})
			.then(response => {
				this.$store.commit('readyForLectures', response.data);
			});
		});
	},
	methods: {
		getLectures () {
			this.$store.commit('loadingLectures');

			let url;
			let params = {};

			if (this.activatedCode === 'candidates') {
				url = ('/api/' + this.activatedCode);
				params.codes = this.starredCodes;
			}
			else {
				url = ('/api/lectures/' + this.activatedCode);
			}

			axios({
				url,
				method: 'get',
				params,
			})
			.then(response => {
				this.$store.commit('renderLectures', response.data);
			});
		},
	},
	watch: {
		activatedCode () {
			this.getLectures();
		},
	},
};
</script>
