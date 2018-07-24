<?php require_once(VIEWPATH . 'global_header.php'); ?>
	<section id="intime-app"></section>
<?php if (ENVIRONMENT === 'development'): ?>
	<script src="/dev-assets/vendor.js"></script>
	<script src="/dev-assets/intro.bundle.js"></script>
<?php else: ?>
	<script src="/assets/vendor.a2c7aeab834df5f15f0a.js"></script>
	<script src="/assets/intro.beb6fb1690b68da2da0e.js"></script>
<?php endif; ?>
<?php require_once(VIEWPATH . 'global_footer.php'); ?>
