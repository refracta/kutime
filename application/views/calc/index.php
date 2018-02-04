<?php require_once(VIEWPATH . 'global_header.php'); ?>
	<section id="intime-app"></section>
<?php if (ENVIRONMENT === 'production'): ?>
	<script src="/assets/vendor.c93e6221e63230f6739f.js"></script>
	<script src="/assets/calc.c670ba323245ec46a6bb.js"></script>
<?php else: ?>
	<script src="/dev-assets/vendor.js"></script>
	<script src="/dev-assets/calc.bundle.js"></script>
<?php endif; ?>
<?php require_once(VIEWPATH . 'global_footer.php'); ?>
