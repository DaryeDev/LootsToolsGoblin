(function() {

	var div = document.createElement('div');
	div.setAttribute("id", "token");
	div.style.position = 'fixed';
	div.style.top = 0;
	div.style.right = 0;
	div.textContent = "";
	document.body.appendChild(div);
	
	var selectedOption = document.createElement('div');
	selectedOption.setAttribute("id", "selectedOption");
	selectedOption.style.position = 'fixed';
	selectedOption.style.top = 0;
	selectedOption.style.right = 0;
	selectedOption.textContent = "";
	document.body.appendChild(selectedOption);

	var lang = document.createElement('div');
	lang.setAttribute("id", "lang");
	lang.style.position = 'fixed';
	lang.style.top = 0;
	lang.style.right = 0;
	lang.textContent = "";
	document.body.appendChild(lang);

	var getLang = document.createElement('script');
	getLang.setAttribute("id", "getLang");
	getLang.textContent = "document.getElementById('lang').innerHTML = (getLang()))";
	document.body.appendChild(getLang);

	var optionText = document.createElement('div');
	optionText.setAttribute("id", "optionText");
	optionText.style.position = 'fixed';
	optionText.style.top = 0;
	optionText.style.right = 0;

	if (document.getElementById('lang').innerHTML.includes("es")){optionTextContent = "Estás a punto de compartir tu token de Streamloots con Loot's Tools.\n\nEsto cede acceso a tu cuenta de Streamloots.\nSin embargo, Loot's Tools 𝘀𝗼𝗹𝗼 usará el token para iniciar sesión, conseguir información básica y llevar a cabo algunas acciones (Regalar cofres, por ejemplo) que 𝗲𝗹 𝘂𝘀𝘂𝗮𝗿𝗶𝗼 𝗱𝗲𝗰𝗶𝗱𝗮 con eventos (Cartas o Ventas de Cofres), y 𝗻𝘂𝗻𝗰𝗮 se usará o mandará a más que a Streamloots.\n\n¿Quieres continuar?"}
	else {optionTextContent = "You are about to share your Streamloots's Token with Loot's Tools.\n\nThis gives access to your Streamloots' Account. \nHowever, Loot's Tools will 𝗼𝗻𝗹𝘆 use the token lo log in, get basic information and execute some actions (Gift Packs, for example) that 𝘁𝗵𝗲 𝘂𝘀𝗲𝗿 𝘄𝗮𝗻𝘁𝘀 to be called with events (Card redeems and sold Packs), and will 𝗻𝗲𝘃𝗲𝗿 be used or sent to anyone but Streamloots.\n\nContinue?"}

	optionText.textContent = optionTextContent;
	document.body.appendChild(optionText);
	

	var confirmScript = document.createElement('script');
	confirmScript.setAttribute("id", "confirmScript");
	confirmScript.textContent = "document.getElementById('selectedOption').innerHTML = (confirm(document.getElementById('optionText').innerHTML))";
	document.body.appendChild(confirmScript);

	var TokenScript = document.createElement('script');
	TokenScript.setAttribute("id", "TokenScript");
	TokenScript.textContent = "document.getElementById('token').innerHTML = (window.__INITIAL_STATE__.auth.authToken)";
	document.body.appendChild(TokenScript);

	if (document.getElementById('selectedOption').innerHTML == "true"){
		token = document.getElementById("token").innerHTML;
	} else {token = false}

	document.getElementById("token").remove();
	document.getElementById("getLang").remove();
	document.getElementById("lang").remove();
	document.getElementById("selectedOption").remove();
	document.getElementById("optionText").remove();
	document.getElementById("confirmScript").remove();
	document.getElementById("TokenScript").remove();

	return ((token));
	
})();
