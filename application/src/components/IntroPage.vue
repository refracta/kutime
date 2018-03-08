<template>
	<section class="hero is-fullheight">
		<main class="hero-body is-vertical-paddingless">
			<div class="container">
				<div class="content">
					<h3>인하대 시간표</h3>
					<p>수강신청 홈페이지에서 시간표를 미리 만들 때 불편하진 않으셨나요? 시간표를 더 편하게 만들어 볼 수 있는 홈페이지입니다.</p>
					<p>2012년 여름방학에 시작된 프로젝트로, 약 2년정도 운영하다 문을 닫았습니다. 2017년 11월 중에 재개발을 시작했으며, 2018년 2학기 전에 완성하는 것이 목표입니다.</p>
				</div>
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
	name: 'introPage',
	components: {
		TitleBar, MenuBar,
	},
	data () {
		return {};
	},
};
</script>
