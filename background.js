var domain = ""
var SLTab = null

browser.browserAction.onClicked.addListener(function (tab) {
    injectToStreamloots()
});

function injectToStreamloots() {
    browser.tabs.query({
        "active": true,
        "currentWindow": true,
        "status": "complete",
        "windowType": "normal"
    }, function (tabs) {
        for (tab in tabs) {
            if (tabs[tab].url.includes("www.streamloots.com")) {
                SLTab = tabs[tab]
                browser.tabs.executeScript(tab.ib, {
                    file: 'inject.js'
                }, receiveText);
                break;
            } else {
                alert("You need to use this Extension on a Streamloots' page.")
            }
                }
    });
}

function getLang() {
    if (navigator.languages != undefined) 
        return navigator.languages[0]; 
    return navigator.language;
}

function receiveText(resultsArray){
    token = resultsArray[0];
    window.open("lootstools://", "_self");
    if (token){
        console.log(token)
        // browser.tabs.update({url: "lootstools://login/"+token});
        var tokenSent = false
        var tries = 0
        function websocketHandler() {
            try {
                var socket = new WebSocket("ws://localhost:4848");
                window.socket = socket
                socket.onopen = function (e) {
                    window.socket.send(`{"token":"${token}"}`);
                    tokenSent = true
                    socket.close()
                    return
                };
                socket.onclose = function (event) {
                    if (tokenSent == false){
                        if (tries == 0) {
                            tries += 1;
                            browser.tabs.query({currentWindow: true, active: true}, function (tab) {
                                browser.tabs.query({url: "https://lootstools.darye.dev/"}, function(tabs){
                                    if (tabs.length == 0) {
                                        browser.tabs.update(tab.id, {url: "lootstools://init"});
                                    } else {
                                        browser.tabs.update(tab.id, {url: "lootstools://"});
                                    }
                                })
                            });
                            
                        
                        }
                        window.setTimeout(websocketHandler, 500)
                    }
                }
            } catch (error) {
                
                window.setTimeout(websocketHandler, 10000)
            }
        }
        websocketHandler()

    }
    else{
        if (SLTab.url.includes("www.streamloots.com")){
            browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
                browser.tabs.reload(tabs[0].id);window.setTimeout(injectToStreamloots(), 2000);
            });
        }
        else{alert("Log in to Streamloots first (or reload the page if you did).")}
    }
}
