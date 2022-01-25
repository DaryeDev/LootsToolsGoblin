var domain = ""

chrome.browserAction.onClicked.addListener(function (tab) {
    injectToStreamloots()
});

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
                chrome.tabs.executeScript(tab.ib, {
                    file: 'inject.js'
                }, receiveText);
            } else {
                alert("You need to use this Extension on a Streamloots' page.")
            }
                }
            break
    });
}

function getLang() {
    if (navigator.languages != undefined) 
        return navigator.languages[0]; 
    return navigator.language;
}

function receiveText(resultsArray){
    token = resultsArray[0];
    if (token){
        if (getLang().contains("es")){optionText = "Estás a punto de compartir tu token de Streamloots con Loot's Tools.\n\nEsto cede acceso a tu cuenta de Streamloots.\nSin embargo, Loot's Tools 𝘀𝗼𝗹𝗼 usará el token para iniciar sesión, conseguir información básica y llevar a cabo algunas acciones (Regalar cofres, por ejemplo) que 𝗲𝗹 𝘂𝘀𝘂𝗮𝗿𝗶𝗼 𝗱𝗲𝗰𝗶𝗱𝗮 con eventos (Cartas o Ventas de Cofres), y 𝗻𝘂𝗻𝗰𝗮 se usará o mandará a más que a Streamloots.\n\n¿Quieres continuar?"}
        if (getLang().contains("en")){optionText = "You are about to share your Streamloots's Token with Loot's Tools.\n\nThis gives access to your Streamloots' Account. \nHowever, Loot's Tools will 𝗼𝗻𝗹𝘆 use the token lo log in, get basic information and execute some actions (Gift Packs, for example) that 𝘁𝗵𝗲 𝘂𝘀𝗲𝗿 𝘄𝗮𝗻𝘁𝘀 to be called with events (Card redeems and sold Packs), and will 𝗻𝗲𝘃𝗲𝗿 be used or sent to anyone but Streamloots.\n\nContinue?"}
        if (confirm(optionText)) {chrome.tabs.update({url: "lootstools://login/"+token});}
    }
    else{
        if (domain == "www.streamloots.com"){location.reload();window.setTimeout(injectToStreamloots(), 2000);}
        else{alert("Log in to Streamloots first.")}
        
    }
}
