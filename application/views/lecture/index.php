<?php require_once(VIEWPATH . 'global_header.php'); ?>
	<section id="intime-app"></section>
<?php if (ENVIRONMENT === 'development'): ?>
	<script src="/dev-assets/vendor.js"></script>
	<script src="/dev-assets/lecture.bundle.js"></script>
<?php else: ?>
	<script src="/assets/vendor.cad401dd1b3c2e534eed.js"></script>
	<script src="/assets/lecture.472d76dee78cb32a1f9f.js"></script>
<?php endif; ?>
<?php require_once(VIEWPATH . 'global_footer.php'); ?>
