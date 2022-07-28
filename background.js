var domain = "";
var SLTab = null;
var token = false;
var userInfo = false;


function handleMessage(request, sender, sendResponse) {
    if ("sendTokenToLootsTools" in request){
        loginToLootsTools(request.sendTokenToLootsTools)
    }
    sendResponse({response: "Oído cocina!"});
}
function handleExternalMessage(request, sender, sendResponse) {
    if ("registerDiscordServer" in request){
        registerDiscordServer(request.registerDiscordServer)
    }
    sendResponse({response: "Oído cocina!"});
}
browser.runtime.onMessage.addListener(handleMessage);
browser.runtime.onMessageExternal.addListener(handleExternalMessage);

function getLang() {
    if (navigator.languages != undefined) return navigator.languages[0];
    return navigator.language;
}

function registerDiscordServer(syncID) {
    url = "finishSetupDiscordServer"
    browser.storage.sync.get(["token"], function (resulto) {
        token = resulto.token;
        var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

        fetch("https://dysontools.herokuapp.com/finishSetupDiscordServer?syncID="+syncID+"&slt="+Base64.encode(token), {
            method: 'GET',
            headers: {},
            mode: "no-cors"
        })
        .then((response) => function (response) {
            console.log("sentRegistration")
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
}

function loginToLootsTools(token = false) {
    if (token) {
        var tokenSent = false;
        var tries = 0;
        function websocketHandler() {
            try {
                var socket = new WebSocket("ws://localhost:4848");
                socket.onopen = function (e) {
                    socket.send(`{"token":"${token}"}`);
                    tokenSent = true;
                    socket.close();
                    return;
                };
                socket.onclose = function (event) {
                    if (tokenSent == false) {
                        if (tries == 0) {
                            tries += 1;
                            browser.tabs.query(
                                { currentWindow: true, active: true },
                                function (tab) {
                                    browser.tabs.query(
                                        { url: "https://lootstools.darye.dev/" },
                                        function (tabs) {
                                            if (tabs.length == 0) {
                                                browser.tabs.create({ url: "lootstools://" });
                                            } else {
                                                browser.tabs.create({ url: "lootstools://init" });
                                            }
                                        }
                                    );
                                }
                            );
                        }
                        browser.alarms.create({ delayInMinutes: 0.00833333 });

                        browser.alarms.onAlarm.addListener(() => {
                            websocketHandler()
                        });
                    }
                };
            } catch (error) {
                browser.alarms.create({ delayInMinutes: 0.1666667 });

                browser.alarms.onAlarm.addListener(() => {
                    websocketHandler()
                });
            }
        }
        websocketHandler();
    }
}
