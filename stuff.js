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
        browser.storage.local.set({ userInfo: false }, function () { });
        loadInfoToExtension(token, true);
    });

document
    .getElementById("loginLootsToolsButton")
    .addEventListener("click", loginToLootsTools);

document
    .getElementById("openLootsToolsButton")
    .addEventListener("click", function() {
        browser.tabs.create({url:"lootstools://"})
    });

document
    .getElementById("openLootsToolsNoUIButton")
    .addEventListener("click", function() {
        browser.tabs.create({url:"lootstools://init"})
    });

document
    .getElementById("darkModeButton")
    .addEventListener("click", function () {
        document.body.classList.toggle('darkTheme');  
    });

document.getElementById("logoutButton").addEventListener("click", function () {
    browser.storage.sync.set({ token: false }, function () { });
    browser.storage.local.set({ userInfo: false }, function () { });
    document.getElementById("notLoggedIn").hidden = false;
    document.getElementById("loggedIn").hidden = true;
    document.body.style.width = "";
});

document.getElementById("syncStreamlootsDiscordButton").addEventListener("click", function () {
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    browser.tabs.create({ url: "https://discord.com/oauth2/authorize?client_id=938205520781783050&redirect_uri=https%3A%2F%2Fdysontools.herokuapp.com%2FdiscordLogin&response_type=code&scope=identify&state=LTDSS"+Base64.encode(token) });
});

document.getElementById("syncStreamlootsTwitchButton").addEventListener("click", function () {
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    browser.tabs.create({ url: "https://id.twitch.tv/oauth2/authorize?client_id=b7ybrqr5eoixm686m7or2a02dqdvci&redirect_uri=https%3A%2F%2Fdysontools.herokuapp.com%2FtwitchLogin&response_type=code&scope=user%3Aread%3Aemail&force_verify=true&state=LTTSS"+Base64.encode(token) });
});

function tryToLoadToken() {
    browser.storage.sync.get(["token"]).then(function (resulto) {
        token = resulto.token;
        if (token) {
            loadInfoToExtension(token);
        }
    });
}
tryToLoadToken();

function changeMode(mode) {
    modes = ["tools", "cards"]
    modes.forEach(element => {
        if (element == mode){
            document.querySelector(`#${element}Mode`).hidden = false;
        } else {
            document.querySelector(`#${element}Mode`).hidden = true;
        }
    });
}

document
    .getElementById("cardsModeButton")
    .addEventListener("click", function() {
        browser.storage.local.set({ mode: "cards" }, function () {changeMode("cards")});
    });

document
    .getElementById("toolsModeButton")
    .addEventListener("click", function() {
        browser.storage.local.set({ mode: "tools" }, function () {changeMode("tools")});
    });

function tryToLoadMode() {
    browser.storage.local.get(["mode"]).then(function (resulto) {
        mode = resulto.mode;
        if (mode) {
            changeMode(mode);
        }
    });
}
tryToLoadMode();


function injectToStreamloots() {
    browser.tabs.query(
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
                    browser.scripting.executeScript(
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
                    browser.tabs.query(
                        {
                            active: true,
                            currentWindow: true,
                            status: "complete",
                            windowType: "normal",
                        },
                        function (tabs) {
                            browser.scripting.executeScript(
                                {
                                    target: { tabId: tabs[0].id },
                                    func: function () {
                                        alert("You need to use this Extension on a Streamloots' page.");
                                        window.open("https://streamloots.com/collections", '_blank').focus();
                                    },
                                },
                                (injectionResults) => {
                                }
                            );
                        }
                    );
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
        browser.storage.sync.set({ token: token }, function () { });
        var settings = {
            url: "https://api.streamloots.com/me",
            method: "GET",
            timeout: 0,
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        $.ajax(settings).done(function (response) {
            browser.storage.local.set({ userInfo: response }, function () { });
            userInfo = response;
        });

        // alert("Logged in!");
        loadInfoToExtension(token);
    } else {
        if (SLTab.url == "https://www.streamloots.com/collections") {
            browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                browser.tabs.reload(tabs[0].id);
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
            browser.storage.local.set({ userInfo: response }, function () { });
            userInfo = response;
            changeUserInfoInCompanion(userInfo)
        });
    }

    if (forceReload) {
        userInfoFromStreamloots(token)
    } else {
        browser.storage.local.get(["userInfo"]).then(function (resulto) {
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
                "Estas a punto de compartir tu token de Streamloots con Loot's Tools Desktop.\n\nEsto cede acceso a tu cuenta de Streamloots.\nSin embargo, Loot's Tools Desktop solo usara el token para iniciar sesion, conseguir info basica y llevar a cabo algunas acciones (Regalar cofres, por ejemplo) que el usuario decida con eventos (Cartas o Ventas de Cofres), y nunca se usara o mandara a mas que a Streamloots desde esta herramienta.\n\nQuieres continuar?";
        } else {
            optionText =
                "You are about to share your Streamloots's Token with Loot's Tools Desktop.\n\nThis gives access to your Streamloots' Account. \nHowever, Loot's Tools Desktop will only use the token lo log in, get basic information and execute some actions (Gift Packs, for example) that the user wants to be called with events (Card redeems and sold Packs), and will never be used or sent to anyone but Streamloots from there.\n\nContinue?";
        }

        if (confirm(optionText)) {
            let sending = browser.runtime.sendMessage({
                sendTokenToLootsTools: token
            });
        }
    }
}

function searchStreamer(streamer, callback) {
    if (streamer != "") {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

        fetch("https://api.streamloots.com/pages/"+streamer+"/sets", requestOptions)
            .then(response => response.text())
            .then(result => {
                jsonResult = JSON.parse(result)
                // console.log(jsonResult)
                try {
                    callback(jsonResult.data)
                    
                    gotoStreamlootsPageButton.disabled = false
                } catch (error) {
                    console.log("nay nay tete: "+error)
                    gotoStreamlootsPageButton.disabled = true
                }
            })
            .catch(error => console.log('error', error));
    }
}

var cardsObj = []
function injectCards(collections) {
    var collectionSelector = document.getElementById("collectionSelectorSelect")
    var cardsGrid = document.getElementById("cardsGrid")

    collectionSelector.innerHTML = ""
    cardsGrid.innerHTML = ""

    collectionNo = 0
    collections.forEach(collection => {
        collectionOption = document.createElement("option")
        collectionOption.value = "collection"+String(collectionNo)
        collectionOption.text = collection.name
        collectionSelector.appendChild(collectionOption)

        collectionDiv = document.createElement("div")
        collectionDiv.id = "collection"+String(collectionNo)
        collectionDiv.style = "margin-left: -5px;grid-template-columns: repeat(3, 1fr);grid-column-gap: 10px;grid-row-gap: 0px;display:"+ ((collectionNo != 0) ? "none" : "grid")

        notOwnedCards = []
        collection.cards.forEach(card => {
            var owning = false
            cardsObj[card._id] = card
            cardDiv = document.createElement("span")
            cardDiv.id = cardDiv.className = "card"+card._id
            cardDiv.setAttribute("cardid", card._id)
            cardDiv.setAttribute("cardname", card.name)
            cardDiv.setAttribute("collectionid", collection.collectionId)
            try {
                if (card.count.redeemable > 0){
                    cardAvailableHTML = `<p cardid="${card._id}" cardname="${card.name}" collectionid="${collection.collectionId}" class="cardQuantity">x${card.count.redeemable}</p>`;
                    owning = true
                } else {
                    cardAvailableHTML = `<p cardid="${card._id}" cardname="${card.name}" collectionid="${collection.collectionId}" class="cardQuantity notOwned">x${card.count.redeemable}</p>`;
                    owning = false
                }
            } catch (error) {
                cardAvailableHTML = `<p cardid="${card._id}" cardname="${card.name}" collectionid="${collection.collectionId}" class="cardQuantity notOwned">x0</p>`;
                owning = false
            }
            
            
            cardDiv.innerHTML = `
                ${cardAvailableHTML}
                <img src="${card.imageUrl}" alt="${card.name}" cardid="${card._id}" cardname="${card.name}" collectionid="${collection.collectionId}" class="cardImage${owning? '':' notOwned'}" style="width: 124px;text-align:center;">
                <p cardid="${card._id}" cardname="${card.name}" collectionid="${collection.collectionId}" style="text-align: center;margin-top: 0;">${card.name}</p>`
            cardDiv.style = "display: inline-block;width: 124px;margin:20px;margin-top:0px;margin-bottom:0px"

            if (owning) {
                cardDiv.addEventListener("click", function(event) {
                    cardName = event.target.getAttribute("cardname")
                    cardID = event.target.getAttribute("cardid")
                    collectionID = event.target.getAttribute("collectionid")
                    if (confirm(`Use ${cardName}?`)) {
                        console.log(cardsObj[cardID].redeemFields)
                        redeemFields = []
                        if (cardsObj[cardID].redeemFields.length != 0){
                            cardsObj[cardID].redeemFields.forEach(field => {
                                redeemFields.push({
                                    "required": field.required,
                                    "label": field.label,
                                    "name": field.name,
                                    "type": field.type,
                                    "value": prompt(field.label)
                                })
                            })
                        }
                        useCard(collectionID, cardID, redeemFields, function () {searchStreamer(document.getElementById("streamerSearcherInput").value, injectCards)})
                    }
                })

                collectionDiv.appendChild(cardDiv)
            } else {
                notOwnedCards.push(cardDiv)
            }
        })

        notOwnedCards.forEach(cardDiv => {
            collectionDiv.appendChild(cardDiv)
        })

        cardsGrid.appendChild(collectionDiv)
        collectionNo++
    });

    console.log(collections)
}

function useCard(collectionID, cardID, redeemFields, callback=function() {}) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "setCardId": cardID,
        "redeemFields": redeemFields
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.streamloots.com/collections/"+collectionID+"/redemptions", requestOptions)
        .then(response => response.text())
        .then(result => {callback()})
        .catch(error => console.log('error', error));
}

var streamerSearcherInput = document.getElementById("streamerSearcherInput");
var streamerSearcherButton = document.getElementById("streamerSearcherButton");
var streamerName = "";
var gotoStreamlootsPageButton = document.getElementById("gotoStreamlootsPageButton");
var waitingForRenaming = false;

streamerSearcherInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        streamerSearcherButton.click();
    }
});

streamerSearcherButton.addEventListener("click", function(event) {
    streamerName = streamerSearcherInput.value
    if (waitingForRenaming) {
        browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            domain = tabs[0].url.match(/^[\w-]+:\/{2,}\[?([\w\.:-]+)\]?(?::[0-9]*)?/)[1];
            if (domain.includes("twitch.tv")) {
                streamName = tabs[0].url.substring(tabs[0].url.indexOf("/", 8)+1)
                browser.storage.sync.get(["renaming"]).then(function (resulto) {
                    renaming = resulto.renaming;
                    if (!renaming) {
                        renaming = {};
                    } 
                    renaming[streamName] = streamerName
                    browser.storage.sync.set({ renaming: renaming }, function () { });
                    waitingForRenaming = false
                });
            }
        });
    }
    searchStreamer(streamerName, injectCards)
});

gotoStreamlootsPageButton.addEventListener("click", function(event) {
    browser.tabs.create({ url: "https://www.streamloots.com/"+streamerSearcherInput.value });
});

document.getElementById("collectionSelectorSelect").addEventListener("change", function(event) {
    document.querySelector("#cardsGrid").childNodes.forEach(element => {
        if (element.id == document.getElementById("collectionSelectorSelect").value) {
            element.style.display = "grid"
        } else {
            element.style.display = "none"
        }
    })
})

browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    domain = tabs[0].url.match(/^[\w-]+:\/{2,}\[?([\w\.:-]+)\]?(?::[0-9]*)?/)[1];
    if (domain.includes("twitch.tv")) {
        streamName = tabs[0].url.substring(tabs[0].url.indexOf("/", 8)+1)
        if (streamName.includes("/")){
            streamName = streamName.substring(0, streamName.indexOf("/", 0))
        }
        searchStreamer(streamName, function(collections) {
            if (collections) {
                streamerSearcherInput.value = streamName;
                injectCards(collections)
            } else {
                browser.storage.sync.get(["renaming"]).then(function (resulto) {
                    renaming = resulto.renaming;
                    if (renaming) {
                        searchStreamer(renaming[streamName], function(collections) {
                            if (collections) {
                                streamerSearcherInput.value = renaming[streamName];
                                injectCards(collections)
                            } else {
                                alert("The streamer was not found by Twitch Name, please enter it manually.\n(It will be saved for the next time)")
                                waitingForRenaming = true
                            }
                        })
                    } else {
                        browser.storage.sync.set({ renaming: {} }, function () {
                            alert("The streamer was not found by Twitch Name, please enter it manually.\n(It will be saved for the next time)")
                            waitingForRenaming = true
                        });
                    }
                });
            }
        })
    }
})