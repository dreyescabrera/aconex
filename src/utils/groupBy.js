/**
 * @template {any} T
 * @param {Array<T>} arr
 * @param {((val: T, index?: number, arr?: T[]) => T) | string} fn
 */
export const groupBy = (arr, fn) =>
	arr.map(typeof fn === 'string' ? (val) => val[fn] : fn).reduce((acc, val, i) => {
		acc[val] = (acc[val] || []).concat(arr[i]);
		return acc;
	}, {});
