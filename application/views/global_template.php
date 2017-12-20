<?php /* These templates are markup for Vue component. */ ?>
	<template id="template-appnav-button">
		<a class="button is-fullwidth is-inverted"
			:class="[anchor.active ? 'is-primary' : 'is-link']"
			:href="anchor.href"
			:disabled="anchor.disable">
			<span class="icon is-medium">
				<i class="fa fa-lg" :class="anchor.icon"></i>
			</span>
		</a>
	</template>
	<template id="template-appnav-column">
		<div class="column has-text-centered">
			<appnav-button :anchor="anchor"></appnav-button>
		</div>
	</template>
	<template id="template-appnav">
		<nav class="navbar is-fixed-bottom box is-paddingless is-radiusless" role="navigation">
			<div class="container">
				<div class="level is-mobile">
					<div class="level-item is-marginless columns is-mobile is-gapless">
						<appnav-column
							v-for="(anchor, index) in anchors"
							:key="index"
							:anchor="anchor">
						</appnav-column>
					</div>
				</div>
			</div>
		</nav>
	</template>
<?php /* These templates positioned before footer. */ ?>
