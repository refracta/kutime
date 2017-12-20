<?php require_once(VIEWPATH . 'global_header.php'); ?>
<?php /* Global header ends with 1 depth section. */ ?>
		<main class="hero-body is-vertical-paddingless">
			<div class="container">
				<span>인하대 시간표 인트로 페이지</span>
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
					</div>
				</div>
			</div>
		</nav>
		<appnav :anchors="anchors"></appnav>
<?php /* Global footer starts with 1 depth section. */ ?>
<?php require_once(VIEWPATH . 'global_footer.php'); ?>
