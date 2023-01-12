import moment from "moment";

export const getStorageValue = (key, status = "no-json") => {
	try {
		const saved = localStorage.getItem(key);
		const initial = saved && (status ? saved : JSON.parse(saved));
		return initial || null;
	} catch (error) {
		return null;
	}
};

export const setValueToStorage = (key, defaultValue) => {

	defaultValue && localStorage.setItem(key, defaultValue);
};

export const monthNames = ["", "Jan", "Feb", "Mar", "April", "May", "June",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
export function addMonths(date, months) {
	date.setMonth(date.getMonth() + months);
	const formated = moment(date).format("YYYY-MM-DD");
	return formated;
}

export function getQuarter(d) {
	d = d || new Date();
	var m = Math.floor(d.getMonth() / 3) + 2;
	m -= m > 4 ? 4 : 0;
	var y = d.getFullYear() + (m == 1 ? 1 : 0);

	return `Q${m} ${y}`;
}
