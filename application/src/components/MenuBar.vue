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
import pathname from '../utils/pathname';

export default {
	name: 'menuBar',
	data: function () {
		var anchorList = [
			{
				href: '/intro',
				icon: 'fa-home'
			},
			{
				href: '/lecture',
				icon: 'fa-calendar'
			},
			{
				href: '/calc',
				icon: 'fa-calculator'
			},
			{
				href: null,
				icon: 'fa-user'
			}
		];

		for (var idx = 0; idx < anchorList.length; idx += 1) {
			var anchor = anchorList[idx];

			anchor.active = (anchor.href === pathname);
			anchor.disable = (anchor.href === null);
		}

		return {
			anchorList: anchorList
		};
	}
};
</script>
