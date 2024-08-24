export const setLocalStorage = (name, items) => {
	localStorage.setItem(name, JSON.stringify(items));
};

export const getLocalStorage = (name) => {
	const data = localStorage.getItem(name);
	if (data) {
		return JSON.parse(data);
	} else {
		localStorage.setItem(name, JSON.stringify([]));
		return [];
	}
};

export const removeLocalStorage = (key) => {
	try {
		localStorage.removeItem(key);
		console.log(`Removed ${key} from localStorage.`);
	} catch (error) {
		console.error(`Error removing ${key} from localStorage:`, error);
	}
};
