<?php require_once(VIEWPATH . 'global_header.php'); ?>
	<section id="intime-app"></section>
<?php if (ENVIRONMENT === 'development'): ?>
	<script src="/dev-assets/vendor.js"></script>
	<script src="/dev-assets/calc.bundle.js"></script>
<?php else: ?>
	<script src="/assets/vendor.d99dd0c13dd11191cb84.js"></script>
	<script src="/assets/calc.d144bfdb20de431edcd7.js"></script>
<?php endif; ?>
<?php require_once(VIEWPATH . 'global_footer.php'); ?>
