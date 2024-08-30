// {
//     "active": 0,
//     "total": 2,
//     "pending": 0,
//     "conflicts": 0,
//     "duration": 10,
//     "timestamp": "2024-04-01T10:00",
//     "remote": false
// }
export const handleNotification = (activeAppointment) => {
	if (activeAppointment.length > 0) {
		createNotification(activeAppointment[0]);
	} else {
		console.log("No active appointments");
	}
};

const createNotification = (appo) => {
	chrome.notifications.create({
		title: "Appointment Reminder",
		message: `Your appointment with is starting soon ${appo.timestamp}`,
		iconUrl: "../images/icon48.png",
		type: "basic",
	});
};

chrome.notifications.onClicked.addListener(() => {
	chrome.tabs.create({ url: "http://www.google.com" });
});
