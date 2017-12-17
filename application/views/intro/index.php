<?php require_once(VIEWPATH . 'global_header.php'); ?>
	<section class="hero is-fullheight">
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
		<nav class="navbar is-fixed-bottom box is-paddingless is-radiusless" role="navigation">
			<div class="container">
				<div class="level is-mobile">
					<div class="level-item is-marginless columns is-mobile is-gapless">
						<div class="column has-text-centered">
							<a class="button is-fullwidth is-primary is-inverted">
								<span class="icon is-medium">
									<i class="fa fa-home fa-lg"></i>
								</span>
							</a>
						</div>
						<div class="column has-text-centered">
							<a class="button is-fullwidth is-link is-inverted">
								<span class="icon is-medium">
									<i class="fa fa-calendar fa-lg"></i>
								</span>
							</a>
						</div>
						<div class="column has-text-centered">
							<a class="button is-fullwidth is-link is-inverted">
								<span class="icon is-medium">
									<i class="fa fa-calculator fa-lg"></i>
								</span>
							</a>
						</div>
						<div class="column has-text-centered">
							<a class="button is-fullwidth is-link is-inverted" disabled>
								<span class="icon is-medium">
									<i class="fa fa-user fa-lg"></i>
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</section>
<?php require_once(VIEWPATH . 'global_footer.php'); ?>
