(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideoIndex = "";
    
    console.log('Loading HI')

    chrome.runtime.onMessage.addListener((obj, sender, res) => { // background에서 보내준 값을 받는다. res.
        // const { type, value, videoId } = obj;

        // if (type === "NEW") {
        //     currentVideoIndex = videoId;
        //     newVideoLoaded()
        // }

        console.log(obj);
        console.log('hi');
    });

    const newVideoLoaded = () => {
        const bookmarkBtnExists = document.getElementById("bookmark-btn")[0];
        
        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL('images/add.png');
            bookmarkBtn.className = 'ytp-button ' + 'bookmark-btn';
            bookmarkBtn.title = "click to mark";
            
            ytControlBox = document.getElementsByClassName('ytp-left-controls')[0];
            ytDisplay = document.getElementsByClassName("video-stream")[0];

            ytControlBox.append(bookmarkBtn);

            console.log(bookmarkBtn);
            // bookmarkBtn.addEventListener('click', addNewBookmarkEventHandler);
        }
    
    }   

    newVideoLoaded()
})
