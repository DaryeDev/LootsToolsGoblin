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


function writeCustomElementValueOnSend() {
    for (input in document.querySelectorAll("[class*=input__info__length]")) {
        try {
            var a = document.querySelectorAll("[class*=input__info__length]")[parseInt(input)];
            if (a) {
                a.addEventListener("DOMCharacterDataModified", function (event) {
                    if (event.newValue.startsWith("0")) {
                        change = function (event, input) {
                            if (input.previousSibling.id.startsWith("file")) {
                                modifyFormTextInput(input, input.previousSibling.url)
                            } else {
                                modifyFormTextInput(input, input.previousSibling.value)
                            }

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


function textField2File(redeemID) {
    a = document.querySelector("#redeem-"+redeemID)
    fileInput = document.createElement("input");
    fileInput.innerHTML = "";
    fileInput.className = a.className;
    fileInput.name = a.name;
    fileInput.type = "file"
    fileInput.id = "file" + redeemID;
    fileInput.style = a.style;

    a.parentElement.insertBefore(fileInput, a);
    a.style.display = "none";

    fileInput.addEventListener("change", function (event) {
        var input = event.target

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+getInitialState().auth.authToken);

        var formdata = new FormData();
        formdata.append("slug", userName);
        formdata.append("overwrite", true);
        formdata.append("file", input.files[0]);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        }; 

        button = document.querySelectorAll("form")[0].getElementsByClassName("margin-top align-right")[0].firstChild
        button.disabled = true
        button.title="Uploading file..."

        fetch("https://api.streamloots.com/files", requestOptions)
            .then(response => response.json())
            .then(result => {
                modifyFormTextInput(document.querySelector('#' + this.id.replace("file", "redeem-")), result.fileUri)
                this.url = result.fileUri
                button.disabled = false
            })
            .catch(error => console.log('error', error));
    })
    writeCustomElementValueOnSend()
}


function textField2Number(redeemID, min=0, max=Infinity) {
    a = document.querySelector("#redeem-"+redeemID)
    numberInput = document.createElement("input");
    numberInput.innerHTML = "";
    numberInput.className = a.className;
    numberInput.name = a.name;
    numberInput.type = "number"
    numberInput.min = numberInput.value = min
    numberInput.max = max
    numberInput.id = "number" + redeemID;
    numberInput.style = a.style;

    a.parentElement.insertBefore(numberInput, a);
    a.style.display = "none";

    modifyFormTextInput(a, numberInput.value)

    numberInput.addEventListener("input", function () {
        if ((this.value.includes("+")&&this.value.lastIndexOf("+")>0)||(this.value.includes("-")&&this.value.lastIndexOf("-")>0)) {
            if (this.value.lastIndexOf("+")>0) {
                position = this.value.lastIndexOf("+")
                this.value.substring(0, position - 1) + this.value.substring(position, str.length)
            }
            if (this.value.lastIndexOf("-")>0) {
                position = this.value.lastIndexOf("-")
                this.value.substring(0, position - 1) + this.value.substring(position, str.length)
            }
        }
        if (this.valueAsNumber < parseInt(this.min)) {this.valueAsNumber = parseInt(this.min)}
        if (this.valueAsNumber > parseInt(this.max)) {this.valueAsNumber = parseInt(this.max)}
        modifyFormTextInput(document.querySelector('#' + this.id.replace("number", "redeem-")), this.value)
    })
    writeCustomElementValueOnSend()
}


function textField2Dropdown(redeemID, options) {
    a = document.querySelector("#redeem-"+redeemID)
    select = document.createElement("select");
    select.innerHTML = "";
    select.className = a.className;
    select.name = a.name;
    select.id = "dropdown" + redeemID;
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
    // console.log(event.target)
    try {
        try {
            var testCardClicked = (document.querySelectorAll("[class*=toolbox__content]")[2].innerHTML.includes(event.path[0].innerHTML) && event.path[0].innerHTML.toLowerCase().includes("test"));
        } catch (error) {
            var testCardClicked = false;
        }
        try {
            var editCardClicked = document.querySelectorAll("[class*=toolbox__content]")[2].innerHTML.includes(event.path[0].innerHTML) && event.path[0].innerHTML.toLowerCase().includes("edit");
        } catch (error) {
            var editCardClicked = false;
        }
        if (event.target.className.includes("card__image") || testCardClicked) {
            getCard(document.querySelectorAll("[class*=cardinfo__title]")[0].innerHTML, document.querySelectorAll("[class*=cardinfo__infoarea]")[0].getElementsByTagName('p')[0].innerHTML, function (collectionID, cardID, cardObj) {
                // console.log(cardObj.redeemFields[0])
                options = {}
                cardObj.redeemFields.forEach(redeemField => {
                    a = {"additionalFieldTypesLT": {"tema": {"type": "dropdown", "data": ["option1", "option2"]}}}
                    a = {"additionalFieldTypesLT": {"tema": {"type": "number", "data": [0, 5]}}}
                    // console.log(redeemField)
                    if ("additionalFieldTypesLT" in redeemField) {
                        switch (redeemField.additionalFieldTypesLT.type) {
                            case "dropdown":
                                textField2Dropdown(redeemField.name, redeemField.additionalFieldTypesLT.data);
                                break;
                        
                            case "number":
                                textField2Number(redeemField.name, !parseInt(redeemField.additionalFieldTypesLT.data[0]) ? 0 : parseInt(redeemField.additionalFieldTypesLT.data[0]), !parseInt(redeemField.additionalFieldTypesLT.data[1]) ? Infinity : parseInt(redeemField.additionalFieldTypesLT.data[1]));
                                break;
                        
                            case "file":
                                textField2File(redeemField.name);
                                break;
                        
                            default:
                                break;
                        }
                    }
                });
            })

        } else if (editCardClicked) {
            addFieldButton = document.querySelectorAll("[class*=redeem-fields__add-btn]")[0]

            convertButton = document.createElement("button")
            convertButton.innerHTML = addFieldButton.innerHTML
            convertButton.type = addFieldButton.type
            convertButton.classList = addFieldButton.classList
            convertButton.childNodes[1].innerHTML = "Convert <select></select> to a <select><option>Dropdown</option><option>File</option><option>Number</option></select> Field"
            convertButton.childNodes[1].children[1].value = "Dropdown"
            convertButtonSelect = convertButton.childNodes[1].children[0]

            revertButton = document.createElement("button")
            revertButton.innerHTML = addFieldButton.innerHTML
            revertButton.type = addFieldButton.type
            revertButton.classList = addFieldButton.classList
            revertButton.childNodes[1].innerHTML = "Revert <select></select> to a Text Field"
            revertButtonSelect = revertButton.childNodes[1].children[0]

            function updateConvertButtonFieldOptions(convertButtonSelect, revertButtonSelect) {
                convertButtonSelect.innerHTML = ""
                revertButtonSelect.innerHTML = ""
                for (input in document.querySelectorAll("[class*=redeem-fields__row]")) {
                    try {
                        if (input != 0) {
                            option = document.createElement("option");
                            option.value = option.innerHTML = document.querySelectorAll("[class*=redeem-fields__row]")[input].firstChild.innerHTML;
                            convertButtonSelect.appendChild(option);
                            
                            option = document.createElement("option");
                            option.value = option.innerHTML = document.querySelectorAll("[class*=redeem-fields__row]")[input].firstChild.innerHTML;
                            revertButtonSelect.appendChild(option);
                        }
                    } catch (error) {}
                }
            }
            updateConvertButtonFieldOptions(convertButtonSelect, revertButtonSelect);
            document.querySelectorAll("[class*=redeem-fields__grid]")[0].convertButtonSelect = convertButtonSelect
            document.querySelectorAll("[class*=redeem-fields__grid]")[0].revertButtonSelect = revertButtonSelect
            document.querySelectorAll("[class*=redeem-fields__grid]")[0].addEventListener("DOMSubtreeModified", function (event) {
                updateConvertButtonFieldOptions(event.target.convertButtonSelect, event.target.revertButtonSelect)
            })

            convertFunction = function (event) {
                if (document.querySelectorAll("[class*=toolbox__test]")[0].disabled) {
                    if (event.target.localName != "select") {
                        alert("The field change will only be visible for users with the Loot's Tools Browser Companion browser extension installed.\n\nThe rest of them will see a text field, so a tip of the possible values for them will be useful.")
                        var fieldName = ""
                        var fieldType = ""
                        try {
                            fieldName = event.target.children[0].value
                            fieldType = event.target.children[1].value
                            if (!fieldName) {throw "fieldNameUndefined";}
                        } catch (error) {
                            fieldName = event.target.children[1].children[0].value
                            fieldType = event.target.children[1].children[1].value
                        }
                        var additionalFieldTypes = {}
                        switch (fieldType.toLowerCase()) {
                            case "dropdown":
                                optionList = []
                                while (true) {
                                    item = prompt("The list is currently " + JSON.stringify(optionList) + ".\nAdd a new Item to the list:\n(Click Cancel or leave the field blank to end the List.)")
                                    if (item != null && item != "") {
                                        optionList.push(item)
                                    } else {
                                        break
                                    }
                                }
                                additionalFieldTypes[fieldName] = {"type": "dropdown", "data": optionList}
                                break;
                        
                            case "number":
                                var min = prompt("Want to put a minimum value?\n\n(Default: 0. Leave blank to leave the default value.)")
                                var max = prompt("Want to put a maximum value?\n\n(Default: Infinity. Leave blank to leave the default value.)")
                                additionalFieldTypes[fieldName] = {"type": "number", "data": [min, max]}
                                break;
                        
                            case "file":
                                getCard(document.querySelector("#set-card-edit-card-name").value, document.querySelector("#set-card-edit-card-description").innerHTML, function (collectionID, cardID, cardObj) {
                                    for (let index = 0; index < cardObj.redeemFields.length; index++) {
                                        if (cardObj.redeemFields[index].name == fieldName){
                                                if (cardObj.redeemFields[index].type == "TEXTAREA") {
                                                    additionalFieldTypes[fieldName] = {"type": "file"}
                                                } else {
                                                    alert("The File Field Type needs to be applied to a bigger text field. Change the type and try it again.")
                                                    updateCollectionsUsername()
                                                }
                                        }
                                    }
                                })
                                break;
                        
                            default:
                                break;
                        }
                        
                        // console.log(optionList)
    
                        getCard(document.querySelector("#set-card-edit-card-name").value, document.querySelector("#set-card-edit-card-description").innerHTML, function (collectionID, cardID, cardObj) {
                            // console.log(collectionID)
                            // console.log(cardID)
                            // console.log(cardObj)
                            cardID = cardObj._id
                            try {
                                ["_id", "activatedAt", "archived", "createdAt", "count", "deactivated", "deactivatedAt", "firstActivatedAt", "imageFile", "modifiedAt", "normalizedName", "setId", "status", "usageStatistics", "redemptionLimit"].forEach(element => {
                                    try { delete cardObj[element] } catch (error) { }
                                });
                            } catch (error) { }
    
                            for (let index = 0; index < cardObj.redeemFields.length; index++) {
                                const redeemField = cardObj.redeemFields[index];
                                // console.log(redeemField)
                                if (redeemField.name in additionalFieldTypes) {
                                    cardObj.redeemFields[index]["additionalFieldTypesLT"] = additionalFieldTypes[redeemField.name]
                                    // console.log(redeemField)
                                }
                            }
                            // console.log(cardObj.redeemFields)
    
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
                                    alert("Changed " + fieldName + " type of field to " + fieldType + "!")
                                    window.location.reload()
                                    updateCollectionsUsername()
                                })
                                .catch(error => console.log('error', error));
                        })
                    }
                } else {
                    alert("Please save your unsaved Card changes before changing your Field to a custom Type, as they will be lost otherwise.")
                }
            }

            revertFunction = function (event) {
                if (document.querySelectorAll("[class*=toolbox__test]")[0].disabled) {
                    if (event.target.localName != "select") {
                        var fieldName = ""
                        try {
                            fieldName = event.target.children[0].value
                            if (!fieldName) {throw "fieldNameUndefined";}
                        } catch (error) {
                            fieldName = event.target.children[1].children[0].value
                        }
                        accept = confirm("This will revert "+fieldName+" to a Text Field.\n\nWant to proceed?")
                        if (accept) {
                            getCard(document.querySelector("#set-card-edit-card-name").value, document.querySelector("#set-card-edit-card-description").innerHTML, function (collectionID, cardID, cardObj) {
                                // console.log(collectionID)
                                // console.log(cardID)
                                // console.log(cardObj)
                                cardID = cardObj._id
                                try {
                                    ["_id", "activatedAt", "archived", "createdAt", "count", "deactivated", "deactivatedAt", "firstActivatedAt", "imageFile", "modifiedAt", "normalizedName", "setId", "status", "usageStatistics", "redemptionLimit"].forEach(element => {
                                        try { delete cardObj[element] } catch (error) { }
                                    });
                                } catch (error) { }
            
                                for (let index = 0; index < cardObj.redeemFields.length; index++) {
                                    // console.log(redeemField)
                                    try {
                                        if (cardObj.redeemFields[index].name == fieldName){
                                        delete cardObj.redeemFields[index]["additionalFieldTypesLT"]}
                                    } catch (error) {console.log(error)}
                                }
                                // console.log(cardObj.redeemFields)
            
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
                                        alert("Reset " + fieldName + " field type to Text!")
                                        updateCollectionsUsername()
                                    })
                                    .catch(error => console.log('error', error));
                            })
                        }
                    }
                } else {
                    alert("Please save your unsaved Card changes before changing your Field to a custom Type, as they will be lost otherwise.")
                }
            }

            convertButton.addEventListener("click", convertFunction)
            revertButton.addEventListener("click", revertFunction)
            insertAfter(convertButton, addFieldButton)
            insertAfter(revertButton, convertButton)
        }
    } catch (error) {console.log(error)}
}


document.addEventListener("click", clickManager);
updateCollectionsUsername()
console.log("[Loot's Tools Browser Companion] Additional Field Types Module loaded!")