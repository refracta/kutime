<template>
	<nav class="navbar is-fixed-top box is-paddingless is-radiusless" role="navigation">
		<div class="container">
			<div class="level is-mobile">
				<div class="level-item is-marginless columns is-mobile is-gapless">
					<div class="column">
						<div class="box is-shadowless is-vertical-paddingless">
							<small>{{ navTitle }}</small>
						</div>
					</div>
					<div class="column is-one-quarter has-text-centered"
						v-if="usesFilter">
						<a class="button is-fullwidth is-white"
							:class="[isReady ? '' : 'is-loading']"
							@click="openFilter">
							<span class="icon is-medium">
								<i class="fa fa-filter fa-lg"></i>
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'titleBar',
	data: function () {
		var pathname = location.pathname;

		if (pathname.endsWith('/')) {
			pathname = pathname.slice(0, -1);
		}
		pathname = pathname || '/intro';

		var titleList = {
			'/intro': '',
			'/lecture': '시간표 조회',
			'/calc': '경우의 수 계산'
		};

		return {
			url: pathname,
			navTitle: titleList[pathname]
		};
	},
	computed: {
		usesFilter: function () {
			return (this.url === '/lecture');
		},
		isReady: function () {
			return this.$store.state.isReady;
		}
	},
	methods: {
		openFilter: function () {
			this.$store.commit('openFilter');
		}
	}
};
</script>
