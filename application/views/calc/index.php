<?php require_once(VIEWPATH . 'global_header.php'); ?>
	<section id="intime-app"></section>
<?php if (ENVIRONMENT === 'development'): ?>
	<script src="/dev-assets/vendor.js"></script>
	<script src="/dev-assets/calc.bundle.js"></script>
<?php else: ?>
	<script src="/assets/vendor.cad401dd1b3c2e534eed.js"></script>
	<script src="/assets/calc.fbd0b41d34d6ddfb6c0c.js"></script>
<?php endif; ?>
<?php require_once(VIEWPATH . 'global_footer.php'); ?>
