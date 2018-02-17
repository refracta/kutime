let pathName = location.pathname;

if (pathName.endsWith('/')) {
	pathName = pathName.slice(0, -1);
}
pathName = pathName || '/intro';

module.exports = pathName;
