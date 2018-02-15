<?php require_once(VIEWPATH . 'global_header.php'); ?>
	<section id="intime-app"></section>
<?php if (ENVIRONMENT === 'production'): ?>
	<script src="/assets/vendor.56d7f8897488a5b09329.js"></script>
	<script src="/assets/intro.cc1467905a26be59a776.js"></script>
<?php else: ?>
	<script src="/dev-assets/vendor.js"></script>
	<script src="/dev-assets/intro.bundle.js"></script>
<?php endif; ?>
<?php require_once(VIEWPATH . 'global_footer.php'); ?>
