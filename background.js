var domain = ""
var SLTab = null

// chrome.browserAction.onClicked.addListener(function (tab) {
//     injectToStreamloots()
// });
console.log
function injectToStreamloots() {
    chrome.tabs.query({
        "active": true,
        "currentWindow": true,
        "status": "complete",
        "windowType": "normal"
    }, function (tabs) {
        for (tab in tabs) {
            domain = tabs[tab].url.match(/^[\w-]+:\/{2,}\[?([\w\.:-]+)\]?(?::[0-9]*)?/)[1];
            if (domain == "www.streamloots.com") {
                SLTab = tabs[tab]
                chrome.tabs.executeScript(tab.ib, {
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
        if (getLang().includes("es")){optionText = "Estás a punto de compartir tu token de Streamloots con Loot's Tools.\n\nEsto cede acceso a tu cuenta de Streamloots.\nSin embargo, Loot's Tools 𝘀𝗼𝗹𝗼 usará el token para iniciar sesión, conseguir información básica y llevar a cabo algunas acciones (Regalar cofres, por ejemplo) que 𝗲𝗹 𝘂𝘀𝘂𝗮𝗿𝗶𝗼 𝗱𝗲𝗰𝗶𝗱𝗮 con eventos (Cartas o Ventas de Cofres), y 𝗻𝘂𝗻𝗰𝗮 se usará o mandará a más que a Streamloots.\n\n¿Quieres continuar?"}
        else {optionText = "You are about to share your Streamloots's Token with Loot's Tools.\n\nThis gives access to your Streamloots' Account. \nHowever, Loot's Tools will 𝗼𝗻𝗹𝘆 use the token lo log in, get basic information and execute some actions (Gift Packs, for example) that 𝘁𝗵𝗲 𝘂𝘀𝗲𝗿 𝘄𝗮𝗻𝘁𝘀 to be called with events (Card redeems and sold Packs), and will 𝗻𝗲𝘃𝗲𝗿 be used or sent to anyone but Streamloots.\n\nContinue?"}
        if (confirm(optionText)) {
            // chrome.tabs.update({url: "lootstools://login/"+token});
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
                                chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
                                    chrome.tabs.query({url: "https://lootstools.darye.dev/"}, function(tabs){
                                        if (tabs.length == 0) {
                                            chrome.tabs.update(tab.id, {url: "lootstools://init"});
                                        } else {
                                            chrome.tabs.update(tab.id, {url: "lootstools://"});
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
    }
    else{
        if (SLTab.url == "https://www.streamloots.com/collections"){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.reload(tabs[0].id);window.setTimeout(injectToStreamloots(), 2000);
            });
        }
        else{alert("Log in to Streamloots first (or reload the page if you did).")}
        
    }
}
