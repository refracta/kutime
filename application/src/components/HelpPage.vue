<template>
	<section class="hero is-fullheight">
		<main class="hero-body is-vertical-paddingless">
			<div class="container">
				<p class="box has-text-centered is-shadowless">
					<span>인하대 시간표 버전 - {{ projectVersion }}</span>
				</p>

				<p class="box has-text-centered">
					<a class="is-block" href="http://www.facebook.com/InhaTimetable" target="_blank">
						<span class="icon"><i class="fa fa-facebook-official fa-lg"></i></span><span>문의사항 / 버그제보</span>
					</a>
				</p>

				<p class="level has-text-centered">
					<a class="level-item" href="https://bulma.io" target="_blank">
						<img src="../assets/made-with-bulma.png" alt="Made with Bulma" width="256" height="48">
					</a>
				</p>
			</div>
		</main>

		<TitleBar/>

		<MenuBar/>
	</section>
</template>

<script>
import TitleBar from './TitleBar';
import MenuBar from './MenuBar';
import { projectVersion } from '../utils/pre-defined';

export default {
	name: 'helpPage',
	components: {
		TitleBar, MenuBar,
	},
	data() {
		return {
			projectVersion,
		};
	},
};
</script>
