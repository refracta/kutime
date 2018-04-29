<?php require_once(VIEWPATH . 'global_header.php'); ?>
	<section id="intime-app"></section>
<?php if (ENVIRONMENT === 'development'): ?>
	<script src="/dev-assets/vendor.js"></script>
	<script src="/dev-assets/help.bundle.js"></script>
<?php else: ?>
	<script src="/assets/vendor.d09f9c0337d245a1a74f.js"></script>
	<script src="/assets/help.9009c772a6181b5495fd.js"></script>
<?php endif; ?>
<?php require_once(VIEWPATH . 'global_footer.php'); ?>
