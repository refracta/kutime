<template>
	<nav class="navbar is-fixed-bottom box is-paddingless is-radiusless" role="navigation">
		<div class="container">
			<div class="level is-mobile">
				<div class="level-item is-marginless columns is-mobile is-gapless">
					<div class="column has-text-centered"
						v-for="(anchor, index) in anchorList"
						:key="index">
						<a class="button is-fullwidth is-inverted"
							:class="[anchor.active ? 'is-primary' : 'is-link']"
							:href="anchor.href"
							:disabled="anchor.disable">
							<span class="icon is-medium">
								<i class="fa fa-lg" :class="anchor.icon"></i>
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import { pathName, anchorList } from '../utils/pre-defined';

export default {
	name: 'menuBar',
	data() {
		for (let idx = 0; idx < anchorList.length; idx += 1) {
			let anchor = anchorList[idx];

			anchor.active = (anchor.href === pathName);
			anchor.disable = (anchor.href === null);
		}

		return {
			anchorList,
		};
	},
};
</script>
