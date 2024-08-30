import { fetchLocations } from "./api/fetchLocation.js";
import { fetchEmptySlots } from "./api/fetchSlot.js";

console.log("hi from from back");

const ALARM_JOB_NAME = "DROP_ALARM";

let cachedPrefs = {};

chrome.runtime.onInstalled.addListener((details) => {
	// console.log(details)
	// {
	//     "previousVersion": "0.1.0",
	//     "reason": "update"
	// }
	handleOnStop();
	fetchLocations();
});

chrome.runtime.onMessage.addListener((data) => {
	const { event, prefs } = data;

	switch (event) {
		case "onStop":
			handleOnStop();
			break;
		case "onStart":
			handleOnStart(prefs);
			break;
		default:
			break;
	}
});

chrome.alarms.onAlarm.addListener(() => {
	console.log("received alarm");
	const slots = fetchEmptySlots(cachedPrefs);
});

const handleOnStop = () => {
	setAlarmStatus(false);
	cachedPrefs = "";
	stopAlarm();
	console.log("stopping");
};
const handleOnStart = (prefs) => {
	chrome.storage.local.set(prefs);
	cachedPrefs = prefs;
	setAlarmStatus(true);
	createAlarm();
};

const setAlarmStatus = (isRunning) => {
	chrome.storage.local.set({ alarmStatus: isRunning });
	console.log("alarm status set to:", isRunning);
};

const createAlarm = () => {
	chrome.alarms.get(ALARM_JOB_NAME, (existingAlarm) => {
		if (!existingAlarm) {
			chrome.alarms.create(ALARM_JOB_NAME, { periodInMinutes: 1.0 });
		} else {
			console.log("alarm already set");
		}
	});
};

const stopAlarm = () => {
	chrome.alarms.clearAll();
};

chrome.alarms.onAlarm.addListener(() => {
	console.log("alarm is running...");
	fetchEmptySlots(cachedPrefs).then((data) => handleOpenSlots(data));
});

const handleOpenSlots = (slots) => {
	if (slots && slots.length > 0) {
	}
};
