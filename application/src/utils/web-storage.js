// reference - https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
	try {
		var storage = window[type];
		var x = '__storage_test__';
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

let storage = getStorage('localStorage');

if (storage !== null) {
	let starredCodes = storage.getItem('starredCodes');

	if (starredCodes === null) {
		storage.setItem('starredCodes', []); // Note: every data will convert to String.
	}
}

module.exports = {
	storage,
};
