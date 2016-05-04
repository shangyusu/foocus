const fbUrl = 'https://www.facebook.com/';
const youtubeUrl = 'https://www.youtube.com/';
let count = 0;

chrome.tabs.query({/* active: true, lastFocusedWindow: true*/}, (arrayOfTabs) => {
  for ( var i in arrayOfTabs) {
    if (arrayOfTabs[i].url.indexOf(fbUrl) > -1 ||
      arrayOfTabs[i].url.indexOf(youtubeUrl) > -1) {
      chrome.tabs.remove(arrayOfTabs[i].id, () => {
        console.log("close tab!");
      });
    }
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    if (changeInfo.url.indexOf(fbUrl) > -1 ||
      changeInfo.url.indexOf(youtubeUrl) > -1) {
      console.log(count);
      if (count > 10) {
        chrome.tabs.update(tabId, {url: 'https://stackoverflow.com/'}, () => {
          // count = 0;
        });
      } else {
        chrome.tabs.remove(tabId, () => {
          console.log("close tab: " + changeInfo.url);
          ++count;
        });
      }
    }
  }
});
