// ELEMENTS
const locationIdElement = document.getElementById("locationId");
const startDateElement = document.getElementById("startDate");
const endDateElement = document.getElementById("endDate");

// Button elements
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

// Span listeners
const runningSpan = document.getElementById("runningSpan");
const stoppedSpan = document.getElementById("stoppedSpan");

// Error message
const locationIdError = document.getElementById("locationIdError");
const startDateError = document.getElementById("startDateError");
const endDateError = document.getElementById("endDateError");

const hideEl = (el) => {
	el.style.display = "none";
};

const showEl = (el) => {
	el.style.display = "block";
};

const disableEl = (btnEl) => {
	btnEl.disabled = true;
};

const enableEl = (btnEl) => {
	btnEl.disabled = false;
};

const validateDates = () => {
	// today > startdate > enddate
	const today = spacetime.now().startof("day");
	const startDate = spacetime(startDateElement.value).startOf("day");
	const endDate = spacetime(endDateElement.value).startOf("day");
};

const performValidations = () => {
	if (!locationIdElement.value) {
		showEl(locationIdError);
	} else {
		hideEl(locationIdError);
	}
	if (!startDateElement.value) {
		showEl(startDateError);
	} else {
		hideEl(startDateError);
	}
	if (!endDateElement.value) {
		showEl(endDateError);
	} else {
		hideEl(endDateError);
	}

	return (
		locationIdElement.value && startDateElement.value && endDateElement.value
	);
};
startButton.onclick = () => {
	const validations = performValidations();

	if (validations) {
		const prefs = {
			locationId: locationIdElement.value,
			startDate: startDateElement.value,
			endDate: endDateElement.value,
			tzData:
				locationIdElement.options[locationIdElement.selectedIndex].getAttribute(
					"data-tz"
				),
		};
		chrome.runtime.sendMessage({ event: "onStart", prefs });
		handleOnStart();
	}
};

stopButton.onclick = () => {
	chrome.runtime.sendMessage({ event: "onStop" });
	handleOnStop();
};

const handleOnStart = () => {
	showEl(runningSpan);
	hideEl(stoppedSpan);
	disableEl(startButton);
	disableEl(locationIdElement);
	disableEl(startDateElement);
	disableEl(endDateElement);
	enableEl(stopButton);
};

const handleOnStop = () => {
	showEl(stoppedSpan);
	hideEl(runningSpan);
	enableEl(startButton);
	enableEl(locationIdElement);
	enableEl(startDateElement);
	enableEl(endDateElement);
	disableEl(stopButton);
};
chrome.storage.local.get(
	["locationId", "startDate", "endDate", "locations", "alarmStatus"],
	(result) => {
		const { locationId, startDate, endDate, locations, alarmStatus } = result;

		setLocations(locations);

		if (locationId) {
			locationIdElement.value = locationId;
		}
		if (startDate) {
			startDateElement.value = startDate;
		}
		if (endDate) {
			endDateElement.value = endDate;
		}

		if (alarmStatus) {
			if (alarmStatus) {
				handleOnStart();
			} else {
				handleOnStop();
			}
		}
		console.log("alarm status is: ", alarmStatus);
	}
);

const setLocations = (locations) => {
	locations.forEach((location) => {
		let optionEl = document.createElement("option");
		optionEl.value = location.id;
		optionEl.textContent = location.name;
		optionEl.setAttribute("data-tz", location.tzData);
		locationIdElement.appendChild(optionEl);
	});
};
