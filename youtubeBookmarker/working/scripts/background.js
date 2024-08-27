chrome.tabs.onUpdated.addListener((tabId, tab) => {

    if (tab.url && tab.url.includes('youtube.com/watch')) {
        const queryParameters = tab.url.split('?')[1];

        // url에서 params를 딕셔너리의 형태로 바꿔준다. webAPI의 하나. 
        // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
        const urlParameters = new URLSearchParams(queryParameters);


        console.log(urlParameters);
        
        chrome.tabs.sendMessage(tabId, {
            type: "NEW",

            // 비디오 아이디를 가져온다. 
            videoId: urlParameters.get('v'), 
            // TODO: random: 'random' - 이건 뭔가?
        }, )
    }
})