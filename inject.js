(function() {

	var div = document.createElement('div');
	div.setAttribute("id", "token");
	div.style.position = 'fixed';
	div.style.top = 0;
	div.style.right = 0;
	div.textContent = "";
	document.body.appendChild(div);

	var TokenScript = document.createElement('script');
	TokenScript.setAttribute("id", "TokenScript");
	TokenScript.textContent = "document.getElementById('token').innerHTML = (window.__INITIAL_STATE__.auth.authToken)";
	document.body.appendChild(TokenScript);

	token = document.getElementById("token").innerHTML;

	document.getElementById("token").remove();
	document.getElementById("TokenScript").remove();

	return ((token));
	
})();
