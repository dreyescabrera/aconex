/**
 * @param {object} object
 */
export const clearUndefinedProperties = (object) => {
	const newObject = {};

	for (const key in object) {
		if (typeof object[key] === 'undefined') continue;
		if (object[key] === 'undefined') continue;

		newObject[key] = object[key];
	}
	return newObject;
};
