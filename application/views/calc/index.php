<?php require_once(VIEWPATH . 'global_header.php'); ?>
	<section id="intime-app"></section>
<?php if (ENVIRONMENT === 'production'): ?>
	<script src="/assets/vendor.281f6cff174eeaf6c726.js"></script>
	<script src="/assets/calc.8a8eab999c869b1237a5.js"></script>
<?php else: ?>
	<script src="/dev-assets/vendor.js"></script>
	<script src="/dev-assets/calc.bundle.js"></script>
<?php endif; ?>
<?php require_once(VIEWPATH . 'global_footer.php'); ?>
