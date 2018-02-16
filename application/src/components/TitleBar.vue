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
							:disabled="!isReady"
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
import { mapState } from 'vuex';
import pathname from '../utils/pathname';

export default {
	name: 'titleBar',
	data () {
		let titleSet = {
			'/intro': '',
			'/lecture': '시간표 조회',
			'/calc': '경우의 수 계산'
		};

		return {
			url: pathname,
			navTitle: titleSet[pathname]
		};
	},
	computed: {
		usesFilter () {
			return (this.url === '/lecture');
		},
		...mapState([
			'isReady',
		])
	},
	methods: {
		openFilter () {
			this.$store.commit('openFilter');
		}
	}
};
</script>
