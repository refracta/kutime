// reference - https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
	const storage = window[type];
	const x = '__storage_test__';

	try {
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch (e) {
		return e instanceof DOMException && (
			// everything except Firefox
			e.code === 22 ||
			// Firefox
			e.code === 1014 ||
			// test name field too, because code might not be present
			// everything except Firefox
			e.name === 'QuotaExceededError' ||
			// Firefox
			e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
		) && storage.length !== 0;
	}
}

function getStorage(type) {
	return (storageAvailable(type) ? window[type] : null);
}

const preDefined = require('./pre-defined.js'); // `import ...` syntax does not work.

const { MAX_CANDIDATES } = preDefined;

const storage = getStorage('localStorage');

if (storage !== null) {
	const starredCodes = storage.getItem('starredCodes');
	let starredList;

	if (starredCodes === null) {
		storage.setItem('starredCodes', JSON.stringify([]));
	}

	try {
		starredList = JSON.parse(starredCodes).slice(0, MAX_CANDIDATES);
		storage.setItem('starredCodes', JSON.stringify(starredList));
	}
	catch (e) {
		storage.setItem('starredCodes', JSON.stringify([]));
	}
}

module.exports = {
	storage,
};
