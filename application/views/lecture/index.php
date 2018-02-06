<?php require_once(VIEWPATH . 'global_header.php'); ?>
	<section id="intime-app"></section>
<?php if (ENVIRONMENT === 'production'): ?>
	<script src="/assets/vendor.281f6cff174eeaf6c726.js"></script>
	<script src="/assets/lecture.60d8b9f6d0c66c15eec2.js"></script>
<?php else: ?>
	<script src="/dev-assets/vendor.js"></script>
	<script src="/dev-assets/lecture.bundle.js"></script>
<?php endif; ?>
<?php require_once(VIEWPATH . 'global_footer.php'); ?>
