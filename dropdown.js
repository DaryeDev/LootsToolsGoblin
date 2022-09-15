console.log("webo")
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

function textFields2Dropdowns(optionsObj) {
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
                    input = document.querySelector("#" + a.id);
                    nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                        window.HTMLInputElement.prototype,
                        "value"
                    ).set;
                    nativeInputValueSetter.call(input, options[optionNo]);
                    ev2 = new Event("input", { bubbles: true });
                    input.dispatchEvent(ev2);
                }
            }

            a.parentElement.insertBefore(select, a);
            a.style.display = "none";

            select.addEventListener("change", function () {
                var input = document.querySelector('#'+this.id.replace("dropdown", "redeem-"));
                var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
                nativeInputValueSetter.call(input, this.value);
                var ev2 = new Event('input', { bubbles: true });
                input.dispatchEvent(ev2);
            })
            document
                .querySelectorAll("[class*=input__info]")[0]
                .getElementsByTagName("div")[0]
                .addEventListener("DOMCharacterDataModified", function (event) {
                    if (event.newValue.startsWith("0")) {
                        console.log(event.target);
                        change = function(event) {
                            var input = event.target.parentElement.parentElement.previousSibling
                            var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                                window.HTMLInputElement.prototype,
                                "value"
                            ).set;
                            nativeInputValueSetter.call(
                                input,
                                input.previousSibling.value
                            );
                            var ev2 = new Event("input", { bubbles: true });
                            input.dispatchEvent(ev2);
                            if (event.target.textContent.startsWith("0")) { window.setTimeout(change, 10, event) } else { console.log("yata") }
                        }
                        window.setTimeout(change, 10, event)
                    }
                });
        }
    }
}

function getCard(cardName, cardDescription, callback) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getInitialState().auth.authToken);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    var collectionID = ""
    var cardID = ""
    var cardObj = {}

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
                    var breakItDown = false
                    result.data.forEach(collection => {
                        // if (window.location.pathname.includes("/"+userName+"/collection/")) {
                        //     colID = window.location.pathname.replace("/"+userName+"/collection/", "")
                        // } else {
                        //     colID = collection._id
                        // }
                        var requestOptions = {
                            method: 'GET',
                            headers: myHeaders,
                            redirect: 'follow'
                        };

                        fetch("https://api.streamloots.com/sets/" + collection._id + "/cards", requestOptions)
                            .then(response => response.json())
                            .then(result => {
                                console.log("cards " + collection.name)
                                // console.log(result)
                                result.forEach(card => {
                                    // if ((card.name == document.querySelector("#set-card-edit-card-name").value) && (card.description == document.querySelector("#set-card-edit-card-description").innerHTML) && (card.imageUrl == document.querySelectorAll("[class*=preview__image]")[0].src)) {
                                    if ((card.name == cardName) && (card.description == cardDescription)) {
                                        collectionID = collection._id
                                        console.log(collectionID)
                                        cardID = card._id
                                        cardObj = card
                                        breakItDown = true
                                        callback(collectionID, cardID, cardObj);
                                        // console.log(cardID)
                                    }

                                    if (breakItDown) {
                                        return
                                    }
                                    if (window.location.pathname.includes("/" + userName + "/collection/")) {
                                        return;
                                    }
                                });
                                if (breakItDown) {
                                    return
                                }
                                if (window.location.pathname.includes("/" + userName + "/collection/")) {
                                    return;
                                }
                            })
                            .catch(error => console.log('error', error));
                    });
                })
                .catch(error => console.log('error', error));
        })
        .catch(error => console.log('error', error))
    return
}

document.addEventListener("click", foo);
function foo(event) {
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

        convertButton.addEventListener("click", convertFunction)
        insertAfter(convertButton, addFieldButton)
    }
}