// import { handleNotification } from '../lib/handleNotification.js';

export const fetchEmptySlots = (result) => {
	return new Promise((resolve, reject) => {
		const { locationId, startDate, endDate } = result;
		const appointUrl = `https://ttp.cbp.dhs.gov/schedulerapi/locations/${locationId}/slots?startTimestamp=${startDate}T00%3A00%3A00&endTimestamp=${endDate}T00%3A00%3A00`;

		console.log("result :", result);
		console.log(appointUrl);
		fetch(appointUrl)
			.then((response) => response.json())
			// .then((data) => data.filter((slot) => slot.active >= 0))
			.then((data) => resolve(data))
			.catch((err) => {
				console.log(err);
				reject();
			});
	});
};
