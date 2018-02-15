<template>
	<section class="hero is-fullheight">
		<main class="hero-body is-vertical-paddingless">
			<div class="container">
				<LectureList/>
			</div>
		</main>

		<TitleBar/>

		<MenuBar/>

		<LectureFilterModal/>
	</section>
</template>

<script>
import axios from 'axios';
import TitleBar from './TitleBar.vue';
import MenuBar from './MenuBar.vue';
import LectureList from './LectureList.vue';
import LectureFilterModal from './LectureFilterModal.vue';

export default {
	name: 'lecturePage',
	components: {
		TitleBar, MenuBar, LectureList, LectureFilterModal
	},
	data: function () {
		return {};
	},
	computed: {
		activeCode: function () {
			return this.$store.state.activeCode
		}
	},
	mounted: function () {
		this.$nextTick(function () {
			axios({
				url: '/api/categories',
				method: 'get'
			})
			.then(response => {
				this.$store.commit('readyForLectures', response.data);
			});
		});
	},
	methods: {
		getLectures: function () {
			this.$store.commit('loadingLectures');

			axios({
				url: ('/api/lectures/' + this.activeCode),
				method: 'get'
			})
			.then(response => {
				this.$store.commit('renderLectures', response.data);
			});
		}
	},
	watch: {
		activeCode: function () {
			this.getLectures();
		}
	}
};
</script>
