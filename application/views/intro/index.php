<?php require_once(VIEWPATH . 'global_header.php'); ?>
<?php /* Global header ends with 1 depth section. */ ?>
		<main class="hero-body is-vertical-paddingless">
			<div class="container">
				<div class="content">
					<h3>인하대 시간표</h3>
					<p>수강신청 홈페이지에서 시간표를 미리 만들 때 불편하진 않으셨나요? 시간표를 더 편하게 만들어 볼 수 있는 홈페이지입니다.</p>
					<p>2012년 여름방학에 시작된 프로젝트로, 약 2년정도 운영하다 문을 닫았습니다. 2017년 11월 중에 재개발을 시작했으며, 2018년 2학기 전에 완성하는 것이 목표입니다.</p>
					<p>문의사항, 버그제보 등은 <a href="http://www.facebook.com/InhaTimetable" target="_blank">페이스북 페이지</a>에 남겨주세요.</p>
				</div>
			</div>
		</main>
		<nav class="navbar is-fixed-top box is-paddingless is-radiusless" role="navigation">
			<div class="container">
				<div class="level is-mobile">
					<div class="level-item is-marginless columns is-mobile is-gapless">
						<div class="column">
							<div class="box is-shadowless is-vertical-paddingless">
								<small>&nbsp;</small>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
		<appnav :anchors="anchors"></appnav>
<?php /* Global footer starts with 1 depth section. */ ?>
<?php require_once(VIEWPATH . 'global_footer.php'); ?>
