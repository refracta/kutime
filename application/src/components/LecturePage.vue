<template>
	<section class="hero is-fullheight">
		<main class="hero-body is-vertical-paddingless">
			<div class="container">
				<ul>
					<li class="button is-fullwidth is-white is-static is-placeholder">
						<span class="icon is-medium"><i class="fa fa-filter fa-lg"></i></span><span>을 눌러서 범주를 선택하세요.</span>
					</li>
				</ul>
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
import LectureFilterModal from './LectureFilterModal.vue';

export default {
	name: 'lecturePage',
	components: {
		TitleBar, MenuBar, LectureFilterModal
	},
	data: function () {
		return {};
	},
	mounted: function () {
		this.$nextTick(function () {
			axios({
				url: '/api/categories',
				method: 'get'
			})
			.then(response => {
				this.$store.commit('readyForLecture', response.data);
			});
		});
	}
};
</script>
