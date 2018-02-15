<?php require_once(VIEWPATH . 'global_header.php'); ?>
	<section id="intime-app"></section>
<?php if (ENVIRONMENT === 'development'): ?>
	<script src="/dev-assets/vendor.js"></script>
	<script src="/dev-assets/lecture.bundle.js"></script>
<?php else: ?>
	<script src="/assets/vendor.56d7f8897488a5b09329.js"></script>
	<script src="/assets/lecture.a2a47b1fcd67da93fcb0.js"></script>
<?php endif; ?>
<?php require_once(VIEWPATH . 'global_footer.php'); ?>
