<?php require_once(VIEWPATH . 'global_template.php'); ?>
<?php if (ENVIRONMENT === 'production'): ?>
	<script src="/assets/custom/app.js"></script>
<?php else: ?>
	<script src="/assets/custom/app-naked.js"></script>
<?php endif; ?>
</body>
</html>