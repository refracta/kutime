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
<?php /* These templates positioned before footer. */ ?>
