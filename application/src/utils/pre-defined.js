let pkg = require('../../../package.json'); // `import ... from ...` syntax does not work.

let projectVersion = pkg.version;

let pathName = location.pathname;

if (pathName.endsWith('/')) {
	pathName = pathName.slice(0, -1);
}
pathName = pathName || '/intro';

let titleSet = {
	'/intro': '',
	'/lecture': '시간표 조회',
	'/calc': '경우의 수 계산',
	'/help': '도움말',
};

let anchorList = [
	{
		href: '/intro',
		icon: 'fa-home',
	},
	{
		href: '/lecture',
		icon: 'fa-calendar',
	},
	{
		href: '/calc',
		icon: 'fa-calculator',
	},
	{
		href: '/help',
		icon: 'fa-question-circle-o',
	},
];

module.exports = {
	projectVersion,
	pathName,
	titleSet,
	anchorList,
};
