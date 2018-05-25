const pkg = require('../../../package.json'); // `import ...` syntax does not work.

const projectVersion = pkg.version;

let pathName = window.location.pathname;

if (pathName.indexOf('/') === pathName.length - 1) {
	pathName = pathName.slice(0, -1);
}
pathName = pathName || '/intro';

const titleSet = {
	'/intro': '',
	'/lecture': '시간표 조회',
	'/calc': '경우의 수 계산',
	'/help': '도움말',
};

const anchorList = [
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

const CUSTOM_COLUMN_INDEX = 20;
const MAX_CANDIDATES = 15;

module.exports = {
	projectVersion,
	pathName,
	titleSet,
	anchorList,
	CUSTOM_COLUMN_INDEX,
	MAX_CANDIDATES,
};
