<!DOCTYPE html>
<html lang="ko" class="has-navbar-fixed-top has-navbar-fixed-bottom">
<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no">
	<title>인하대 시간표</title>
	<link rel="stylesheet" href="/assets/font-awesome-4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="/assets/bulma-0.6.1/css/bulma.css">
	<link rel="stylesheet" href="/assets/custom/style.css">
</head>
<body>
	<section class="hero is-fullheight">
		<main class="hero-body is-vertical-paddingless">
			<div class="container">
				<ul>
<?php foreach ($lect_code_list as $code): ?>
					<li class="box">
						<article class="media">
							<div class="media-content">
								<div class="media-content">
									<div class="content is-size-7-mobile">
										<p>
											<strong><?php echo $lecture_list[$code][2]; ?></strong> <small><?php echo $lecture_list[$code][0]; ?></small>
											<br>
											<small><?php echo $lecture_list[$code][6]; ?></small>
										</p>
									</div>
								</div>
							</div>
							<div class="media-right">
								<a class="button is-white">
									<span class="icon is-medium">
										<i class="fa fa-star-o fa-lg"></i>
									</span>
								</a>
								<a class="button is-white">
									<span class="icon is-medium">
										<i class="fa fa-ellipsis-h fa-lg"></i>
									</span>
								</a>
							</div>
						</article>
					</li>
<?php endforeach; ?>
				</ul>
			</div>
		</main>
		<nav class="navbar is-fixed-top box is-paddingless is-radiusless" role="navigation">
			<div class="container">
				<div class="level is-mobile">
					<div class="level-item is-marginless columns is-mobile is-gapless">
						<div class="column">
							<div class="box is-shadowless is-vertical-paddingless">
								<small><?php echo $dept_name; ?></small>
							</div>
						</div>
						<div class="column is-one-quarter has-text-centered">
							<a class="button is-fullwidth is-white">
								<span class="icon is-medium">
									<i class="fa fa-filter fa-lg"></i>
								</span>
							</a>
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
							<a class="button is-fullwidth is-link is-inverted">
								<span class="icon is-medium">
									<i class="fa fa-home fa-lg"></i>
								</span>
							</a>
						</div>
						<div class="column has-text-centered">
							<a class="button is-fullwidth is-primary is-inverted">
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
</body>
</html>
