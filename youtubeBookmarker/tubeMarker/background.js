chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // console.log('Hello!!!');
  // console.log('tabId : ', tabId);
  // console.log('changeInfo : ', changeInfo);
  // console.log('tab : ', tab);

  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    // console.log(urlParameters.get('v'));

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
});

