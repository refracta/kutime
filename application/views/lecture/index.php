<?php require_once(VIEWPATH . 'global_header.php'); ?>
	<section id="intime-app"></section>
<?php if (ENVIRONMENT === 'development'): ?>
	<script src="/dev-assets/vendor.js"></script>
	<script src="/dev-assets/lecture.bundle.js"></script>
<?php else: ?>
	<script src="/assets/vendor.16f10b39d974ec82bf6f.js"></script>
	<script src="/assets/lecture.11db8009fb3eeecc379b.js"></script>
<?php endif; ?>
<?php require_once(VIEWPATH . 'global_footer.php'); ?>
