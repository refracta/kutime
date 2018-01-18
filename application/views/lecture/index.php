<?php require_once(VIEWPATH . 'global_header.php'); ?>
<?php /* Global header ends with 1 depth section. */ ?>
		<main class="hero-body is-vertical-paddingless">
			<div class="container">
				<lecture-list :activated="activeCode" :lectures="lectures" :state="state"></lecture-list>
			</div>
		</main>
		<nav class="navbar is-fixed-top box is-paddingless is-radiusless" role="navigation">
			<div class="container">
				<div class="level is-mobile">
					<div class="level-item is-marginless columns is-mobile is-gapless">
						<div class="column">
							<div class="box is-shadowless is-vertical-paddingless">
								<small><?php echo $nav_title; ?></small>
							</div>
						</div>
						<div class="column is-one-quarter has-text-centered">
							<a class="button is-fullwidth is-white" @click="openFilter">
								<span class="icon is-medium">
									<i class="fa fa-filter fa-lg"></i>
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
		<appnav :anchors="anchors"></appnav>
		<lecture-filter
			:depts="depts" :others="others" :activated="activeCode" :state="state"
			@apply="applyFilter" @close="closeFilter">
		</lecture-filter>
<?php /* Global footer starts with 1 depth section. */ ?>
<?php require_once(VIEWPATH . 'global_footer.php'); ?>
