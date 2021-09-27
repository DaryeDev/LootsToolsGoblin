chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.query({ //This method output active URL 
        "active": true,
        "currentWindow": true,
        "status": "complete",
        "windowType": "normal"
    }, function (tabs) {
        for (tab in tabs) {
            var domain = tabs[tab].url.match(/^[\w-]+:\/{2,}\[?([\w\.:-]+)\]?(?::[0-9]*)?/)[1];
            if (domain == "www.streamloots.com") {
                chrome.tabs.executeScript(tab.ib, {
                    file: 'inject.js'
                }, receiveText);
            } else {
                alert("You need to use this Extension on a Streamloots' page.")
            }
                }
    });
});

function receiveText(resultsArray){
    token = resultsArray[0];    
    console.log(token);
    chrome.tabs.update({url: "lootstools://login/"+token});
}
