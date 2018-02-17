<template>
	<section class="hero is-fullheight">
		<main class="hero-body is-vertical-paddingless">
			<div class="container">
				<span>도움말 페이지</span>
			</div>
		</main>

		<TitleBar/>

		<MenuBar/>
	</section>
</template>

<script>
import TitleBar from './TitleBar.vue';
import MenuBar from './MenuBar.vue';

export default {
	name: 'helpPage',
	components: {
		TitleBar, MenuBar
	},
	data () {
		return {};
	}
};
</script>
