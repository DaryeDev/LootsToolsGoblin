var collections = {}
var userName = ""

function updateCollectionsUsername() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getInitialState().auth.authToken);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://api.streamloots.com/me", requestOptions)
        .then(response => response.json())
        .then(result => {
            userName = result.page.slug
            fetch("https://api.streamloots.com/sets?slug=" + userName, requestOptions)
                .then(response => response.json())
                .then(result => {
                    result.data.forEach(collection => {
                        collections[collection._id] = collection
                        fetch("https://api.streamloots.com/sets/" + collection._id + "/cards", requestOptions)
                            .then(response => response.json())
                            .then(result => {
                                collections[collection._id]["cards"] = result
                            })
                            .catch(error => console.log('error', error));
                    });
                })
                .catch(error => console.log('error', error));
        })
        .catch(error => console.log('error', error))
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


function getInitialState() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].innerHTML.includes("window.__INITIAL_STATE__=")) {
            return JSON.parse(
                scripts[i].innerHTML.substring(
                    scripts[i].innerHTML.indexOf("{"),
                    scripts[i].innerHTML.indexOf("};") + 1
                )
            );
        }
    }
}


function modifyFormTextInput(inputElement, value) {
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    nativeInputValueSetter.call(inputElement, value);
    var ev2 = new Event('input', { bubbles: true });
    inputElement.dispatchEvent(ev2);
}


function getTextInputs() {
    var inputs = [];
    for (input in document.querySelectorAll("form")[0]) {
        try {
            if (parseInt(input) != NaN) {
                var a = document.querySelectorAll("form")[0][parseInt(input)];
                if (a.localName == "input") {
                    inputs.push(a);
                }
            } else {
                break;
            }
        } catch (error) {
            break;
        }
    }
    return inputs
}


function writeCustomElementValueOnSend() {
    var inputInfos = [];
    for (input in document.querySelectorAll("[class*=input__info__length]")) {
        try {
            var a = document.querySelectorAll("[class*=input__info__length]")[parseInt(input)];
            if (a) {
                a.addEventListener("DOMCharacterDataModified", function (event) {
                    if (event.newValue.startsWith("0")) {
                        change = function (event, input) {
                            modifyFormTextInput(input, input.previousSibling.value)
                            if (event.target.textContent.startsWith("0")) { window.setTimeout(change, 10, event, event.target.parentElement.parentElement.previousSibling) } else { }
                        }
                        window.setTimeout(change, 10, event, event.target.parentElement.parentElement.previousSibling)
                    }
                });
            } else { break }
        } catch (error) {
            break;
        }
    }
}


function textFields2Dropdowns(optionsObj) {
    inputs = getTextInputs()
    for (inputNo in inputs) {
        a = inputs[inputNo];
        redeemField = a.id.replace("redeem-", "")
        if (redeemField in optionsObj) {
            options = optionsObj[redeemField]

            select = document.createElement("select");
            select.innerHTML = "";
            select.className = a.className;
            select.name = a.name;
            select.id = "dropdown" + redeemField;
            select.style = a.style;

            for (optionNo in options) {
                option = document.createElement("option");
                option.value = option.innerHTML = options[optionNo];
                select.appendChild(option);
                if (optionNo == 0) {
                    modifyFormTextInput(document.querySelector("#" + a.id), options[optionNo])
                }
            }

            a.parentElement.insertBefore(select, a);
            a.style.display = "none";

            select.addEventListener("change", function () {
                modifyFormTextInput(document.querySelector('#' + this.id.replace("dropdown", "redeem-")), this.value)
            })
            writeCustomElementValueOnSend()
        }
    }
}


function getCardFromCollection(collectionID, cardName, cardDescription, callback = function (collectionID, cardID, cardObj) { }) {
    // console.log(collectionID)
    collections[collectionID]["cards"].forEach(card => {
        if ((card.name == cardName) && (card.description == cardDescription)) {
            breakItDown = true
            callback(collectionID, card._id, card);
            // console.log(cardID)
        }
    });
}


function getCard(cardName, cardDescription, callback) {
    if (window.location.pathname.includes("/" + userName + "/collection/")) {
        getCardFromCollection(window.location.pathname.replace("/" + userName + "/collection/", ""), cardName, cardDescription, callback)
    } else {
        for (const collectionID in collections) {
            if (Object.hasOwnProperty.call(collections, collectionID)) {
                getCardFromCollection(collectionID, cardName, cardDescription, callback)
            }
        }
    }
}


function clickManager(event) {
    if (event.target.className.includes("card__image")) {
        getCard(document.querySelectorAll("[class*=cardinfo__title]")[0].innerHTML, document.querySelectorAll("[class*=cardinfo__infoarea]")[0].getElementsByTagName('p')[0].innerHTML, function (collectionID, cardID, cardObj) {
            // console.log(cardObj.redeemFields[0])
            options = {}
            cardObj.redeemFields.forEach(redeemField => {
                // console.log(redeemField)
                if ("dropdownOptions" in redeemField) {
                    options[redeemField.name] = redeemField.dropdownOptions
                }
            });
            textFields2Dropdowns(options);
        })

    } else if (((event.path[0].innerHTML.includes("#edit") && event.path[0].className.includes("redeem-fields__edit-btn")) || (event.path[1].innerHTML.includes("#edit") && event.path[0].innerHTML.includes("Edit") && event.path[0].className.includes("button--icon__label")))) {
        addFieldButton = document.querySelectorAll("[class*=redeem-fields__add-btn]")[0]

        convertButton = document.createElement("button")
        convertButton.innerHTML = addFieldButton.innerHTML
        convertButton.type = addFieldButton.type
        convertButton.classList = addFieldButton.classList
        convertButton.childNodes[1].innerHTML = "Convert a Text field to a Dropdown field"

        revertButton = document.createElement("button")
        revertButton.innerHTML = addFieldButton.innerHTML
        revertButton.type = addFieldButton.type
        revertButton.classList = addFieldButton.classList
        revertButton.childNodes[1].innerHTML = "Revert a Dropdown field to a Text field"

        convertFunction = function () {
            alert("The dropdown will only be visible for users with the Loot's Tools Browser Companion browser extension installed.\n\nThe rest of them will see a text field, so a tip of the possible values for them will be useful.")
            fieldName = prompt("What's the internal name of the field to transform to a dropdown?")
            optionList = []
            while (true) {
                item = prompt("The list is currently " + JSON.stringify(optionList) + ".\nAdd a new Item to the list:\n(Click Cancel or leave the field blank to end the List.)")
                if (item != null && item != "") {
                    optionList.push(item)
                } else {
                    break
                }
            }
            // console.log(optionList)

            getCard(document.querySelector("#set-card-edit-card-name").value, document.querySelector("#set-card-edit-card-description").innerHTML, function (collectionID, cardID, cardObj) {
                // console.log(collectionID)
                // console.log(cardID)
                // console.log(cardObj)
                try {
                    ["_id", "activatedAt", "archived", "createdAt", "count", "deactivated", "deactivatedAt", "firstActivatedAt", "imageFile", "modifiedAt", "normalizedName", "setId", "status", "usageStatistics", "redemptionLimit"].forEach(element => {
                        try { delete cardObj[element] } catch (error) { }
                    });
                } catch (error) { }

                for (let index = 0; index < cardObj.redeemFields.length; index++) {
                    const redeemField = cardObj.redeemFields[index];
                    // console.log(redeemField)
                    if (redeemField.name == fieldName) {
                        cardObj.redeemFields[index].dropdownOptions = optionList
                    }
                }

                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + getInitialState().auth.authToken);
                myHeaders.append("Content-Type", "application/json");

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: JSON.stringify(cardObj),
                    redirect: 'follow'
                };

                fetch("https://api.streamloots.com/sets/" + collectionID + "/cards/" + cardID, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        // console.log(result)
                    })
                    .catch(error => console.log('error', error));

                alert("The selectable values on " + fieldName + " will be " + JSON.stringify(optionList) + ".")
            })
        }

        revertFunction = function () {
            fieldName = prompt("What's the internal name of the field you want to revert from dropdown to text?")
            accept = confirm("This will revert your Dropdown field to a Text field.")
            optionList = []
            while (true) {
                item = prompt("The list is currently " + JSON.stringify(optionList) + ".\nAdd a new Item to the list:\n(Click Cancel or leave the field blank to end the List.)")
                if (item != null && item != "") {
                    optionList.push(item)
                } else {
                    break
                }
            }
            // console.log(optionList)

            getCard(document.querySelector("#set-card-edit-card-name").value, document.querySelector("#set-card-edit-card-description").innerHTML, function (collectionID, cardID, cardObj) {
                // console.log(collectionID)
                // console.log(cardID)
                // console.log(cardObj)
                try {
                    ["_id", "activatedAt", "archived", "createdAt", "count", "deactivated", "deactivatedAt", "firstActivatedAt", "imageFile", "modifiedAt", "normalizedName", "setId", "status", "usageStatistics", "redemptionLimit"].forEach(element => {
                        try { delete cardObj[element] } catch (error) { }
                    });
                } catch (error) { }

                for (let index = 0; index < cardObj.redeemFields.length; index++) {
                    const redeemField = cardObj.redeemFields[index];
                    // console.log(redeemField)
                    if (redeemField.name == fieldName) {
                        cardObj.redeemFields[index].dropdownOptions = optionList
                    }
                }

                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + getInitialState().auth.authToken);
                myHeaders.append("Content-Type", "application/json");

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: JSON.stringify(cardObj),
                    redirect: 'follow'
                };

                fetch("https://api.streamloots.com/sets/" + collectionID + "/cards/" + cardID, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        // console.log(result)
                    })
                    .catch(error => console.log('error', error));

                alert("The selectable values on " + fieldName + " will be " + JSON.stringify(optionList) + ".")
            })
        }

        convertButton.addEventListener("click", convertFunction)
        revertButton.addEventListener("click", revertFunction)
        insertAfter(convertButton, addFieldButton)
        insertAfter(revertButton, convertButton)
    }
}


document.addEventListener("click", clickManager);
updateCollectionsUsername()
console.log("[Loot's Tools Browser Companion] Dropdown Module loaded!")