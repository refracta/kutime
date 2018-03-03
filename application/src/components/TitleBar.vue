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
					<div class="column is-one-fifth has-text-centered"
						v-if="isLecturePage">
						<a class="button is-fullwidth is-white"
							:class="[usesCandidates ? 'is-primary is-inverted' : '']"
							:disabled="!isReady || !hasCandidates"
							@click="loadCandidates">
							<span class="icon is-medium">
								<i class="fa fa-star fa-lg"></i>
							</span>
						</a>
					</div>
					<div class="column is-one-fifth has-text-centered"
						v-if="isLecturePage">
						<a class="button is-fullwidth is-white"
							:class="[usesFilter ? 'is-primary is-inverted' : '']"
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
import { mapState, mapGetters } from 'vuex';
import { pathName, titleSet } from '../utils/pre-defined';

export default {
	name: 'titleBar',
	data () {
		return {
			url: pathName,
			navTitle: titleSet[pathName]
		};
	},
	computed: {
		isLecturePage () {
			return (this.url === '/lecture');
		},
		...mapState([
			'activatedCode',
			'isReady',
		]),
		...mapGetters([
			'starredList',
			'hasCandidates',
			'usesCandidates',
			'usesFilter',
		])
	},
	methods: {
		loadCandidates () {
			if (this.hasCandidates) {
				this.$store.commit('loadCandidates');
			}
		},
		openFilter () {
			this.$store.commit('openFilter');
		}
	}
};
</script>
