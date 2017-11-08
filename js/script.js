$( document ).ready(function() {
    if (isAuthenticated()) {
		alert("autenticou!!!!");
		console.log("autenticado");
		var params = getAuthenticationParameters();
		if (APP_SETTINGS.validate_token) {
			exchangeOAuth2Token(params);
		}
	}
	else {
		alert("não esta autenticado!!!!");
		console.log("chamando funcao pra autenticar");
		oauthSignIn();
	}
});