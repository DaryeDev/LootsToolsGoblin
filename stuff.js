var domain = "";
var SLTab = null;
var token = false;
var userInfo = false

document
    .getElementById("loginButton")
    .addEventListener("click", injectToStreamloots);

document
    .getElementById("reloadUserInfoButton")
    .addEventListener("click", function() {
        document.getElementById("reloadUserInfoButtonIcon").className = "";
        void document.getElementById("reloadUserInfoButtonIcon").offsetWidth
        document.getElementById("reloadUserInfoButtonIcon").className = "spin";
        chrome.storage.local.set({ userInfo: false }, function () { });
        loadInfoToExtension(token, true);
    });

document
    .getElementById("loginLootsToolsButton")
    .addEventListener("click", loginToLootsTools);

document
    .getElementById("openLootsToolsButton")
    .addEventListener("click", function() {
        chrome.tabs.create({url:"lootstools://"})
    });

document
    .getElementById("openLootsToolsNoUIButton")
    .addEventListener("click", function() {
        chrome.tabs.create({url:"lootstools://init"})
    });

document.getElementById("logoutButton").addEventListener("click", function () {
    chrome.storage.sync.set({ token: false }, function () { });
    chrome.storage.local.set({ userInfo: false }, function () { });
    document.getElementById("notLoggedIn").hidden = false;
    document.getElementById("loggedIn").hidden = true;
    document.body.style.width = "";
});

document.getElementById("syncStreamlootsDiscordButton").addEventListener("click", function () {
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    chrome.tabs.create({ url: "https://discord.com/oauth2/authorize?client_id=938205520781783050&redirect_uri=https%3A%2F%2Fdysontools.herokuapp.com%2FdiscordLogin&response_type=code&scope=identify&state=LTDSS"+Base64.encode(token) });
});

document.getElementById("syncStreamlootsTwitchButton").addEventListener("click", function () {
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    chrome.tabs.create({ url: "https://id.twitch.tv/oauth2/authorize?client_id=b7ybrqr5eoixm686m7or2a02dqdvci&redirect_uri=https%3A%2F%2Fdysontools.herokuapp.com%2FtwitchLogin&response_type=code&scope=user%3Aread%3Aemail&force_verify=true&state=LTTSS"+Base64.encode(token) });
});

function tryToLoadToken() {
    chrome.storage.sync.get(["token"], function (resulto) {
        token = resulto.token;
        if (token) {
            loadInfoToExtension(token);
        }
    });
}
tryToLoadToken();

function injectToStreamloots() {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
            status: "complete",
            windowType: "normal",
        },
        function (tabs) {
            for (tab in tabs) {
                domain = tabs[tab].url.match(
                    /^[\w-]+:\/{2,}\[?([\w\.:-]+)\]?(?::[0-9]*)?/
                )[1];
                if (domain == "www.streamloots.com") {
                    SLTab = tabs[tab];
                    function getTitle() {
                        var scripts = document.getElementsByTagName("script");
                        for (var i = 0; i < scripts.length; i++) {
                            if (scripts[i].innerHTML.includes("window.__INITIAL_STATE__=")) {
                                return JSON.parse(
                                    scripts[i].innerHTML.substring(
                                        scripts[i].innerHTML.indexOf("{"),
                                        scripts[i].innerHTML.indexOf("};") + 1
                                    )
                                ).auth.authToken;
                            }
                        }
                    }
                    chrome.scripting.executeScript(
                        {
                            target: { tabId: SLTab.id },
                            func: getTitle,
                        },
                        (injectionResults) => {
                            recieveToken(injectionResults);
                        }
                    );

                    break;
                } else {
                    alert("You need to use this Extension on a Streamloots' page.");
                }
            }
        }
    );
}

function getLang() {
    if (navigator.languages != undefined) return navigator.languages[0];
    return navigator.language;
}

function recieveToken(resultsArray) {
    token = resultsArray[0].result;
    if (token) {
        chrome.storage.sync.set({ token: token }, function () { });
        var settings = {
            url: "https://api.streamloots.com/me",
            method: "GET",
            timeout: 0,
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        $.ajax(settings).done(function (response) {
            chrome.storage.local.set({ userInfo: response }, function () { });
            userInfo = response;
        });

        alert("Logged in!");
        loadInfoToExtension(token);
    } else {
        if (SLTab.url == "https://www.streamloots.com/collections") {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.reload(tabs[0].id);
                window.setTimeout(injectToStreamloots(), 2000);
            });
        } else {
            alert("Log in to Streamloots first (or reload the page if you did).");
        }
    }
}

function loadInfoToExtension(token, forceReload=false) {

    function changeUserInfoInCompanion(userInfo) {
        document.getElementById("helloText").innerHTML = `Hey ${userInfo.profile.username}!`;
    }

    function userInfoFromStreamloots(token) {
        var settings = {
            url: "https://api.streamloots.com/me",
            method: "GET",
            timeout: 0,
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        $.ajax(settings).done(function (response) {
            chrome.storage.local.set({ userInfo: response }, function () { });
            userInfo = response;
            changeUserInfoInCompanion(userInfo)
        });
    }

    if (forceReload) {
        userInfoFromStreamloots(token)
    } else {
        chrome.storage.local.get(["userInfo"], function (resulto) {
            if ($.isEmptyObject(resulto)){
                userInfoFromStreamloots(token)
            } else {
                userInfo = resulto.userInfo;
                if (userInfo){
                    changeUserInfoInCompanion(userInfo)
                } else {
                    userInfoFromStreamloots(token)
                }
            }
        });
    }

    

    document.getElementById("notLoggedIn").hidden = true;
    document.getElementById("loggedIn").hidden = false;
}

function loginToLootsTools() {
    if (token) {
        if (getLang().includes("es")) {
            optionText =
                "Estás a punto de compartir tu token de Streamloots con Loot's Tools.\n\nEsto cede acceso a tu cuenta de Streamloots.\nSin embargo, Loot's Tools solo usará el token para iniciar sesión, conseguir información básica y llevar a cabo algunas acciones (Regalar cofres, por ejemplo) que el usuario decida con eventos (Cartas o Ventas de Cofres), y nunca se usará o mandará a más que a Streamloots desde esta herramienta.\n\n¿Quieres continuar?";
        } else {
            optionText =
                "You are about to share your Streamloots's Token with Loot's Tools.\n\nThis gives access to your Streamloots' Account. \nHowever, Loot's Tools will only use the token lo log in, get basic information and execute some actions (Gift Packs, for example) that the user wants to be called with events (Card redeems and sold Packs), and will never be used or sent to anyone but Streamloots from there.\n\nContinue?";
        }
        if (confirm(optionText)) {
            function handleResponse(message) {
                console.log(`Message from the background script:  ${message.response}`);
            }
            
            function handleError(error) {
                console.log(`Error: ${error}`);
            }
            
            let sending = chrome.runtime.sendMessage({
                sendTokenToLootsTools: token
            });
            sending.then(handleResponse, handleError);
        }
    }
}
