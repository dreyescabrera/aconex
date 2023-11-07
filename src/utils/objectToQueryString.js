const filterUndefinedValues = (param) => {
	if (typeof param[1] === 'undefined') return false;
	if (param[1] === null) return false;
	if (param[1] === 'undefined') return false;
	return true;
};

/**
 * This function converts an object of query params into a query param string.
 * @param {object} params
 * @returns {string} The converted string.
 */
export const objectToQueryString = (params) => {
	if (!params) return '';

	const paramsArray = Object.entries(params);

	if (paramsArray.length === 0) return '';
	const definedParams = paramsArray.filter(filterUndefinedValues);
	return (
		'?' +
		definedParams
			.map((param) => encodeURIComponent(param[0]) + '=' + encodeURIComponent(param[1]))
			.join('&')
	);
};
