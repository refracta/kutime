var pathname = location.pathname;

if (pathname.endsWith('/')) {
	pathname = pathname.slice(0, -1);
}
pathname = pathname || '/intro';

module.exports = pathname;
