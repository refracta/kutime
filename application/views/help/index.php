<?php require_once(VIEWPATH . 'global_header.php'); ?>
	<section id="intime-app"></section>
<?php if (ENVIRONMENT === 'development'): ?>
	<script src="/dev-assets/vendor.js"></script>
	<script src="/dev-assets/help.bundle.js"></script>
<?php else: ?>
	<script src="/assets/vendor.d99dd0c13dd11191cb84.js"></script>
	<script src="/assets/help.e6675b3f2bffd47bad7c.js"></script>
<?php endif; ?>
<?php require_once(VIEWPATH . 'global_footer.php'); ?>
