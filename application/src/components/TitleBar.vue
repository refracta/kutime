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
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'titleBar',
	data: function () {
		var pathname = location.pathname;

		if (pathname.endsWith('/')) {
			pathname = pathname.slice(0, -1);
		}
		pathname = pathname || '/intro';

		var titleList = {
			'/intro': '',
			'/lecture': '시간표 조회',
			'/calc': '경우의 수 계산'
		};

		return {
			navTitle: titleList[pathname]
		};
	}
};
</script>
