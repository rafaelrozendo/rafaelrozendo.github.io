$( document ).ready(function() {
    if (isAuthenticated()) {
		alert("autenticou!!!!");
		console.log("autenticado");
		var params = getAuthenticationParameters();
		setAuthenticationParametersInLocalStorage(params);
		
		//if (APP_SETTINGS.validate_token) {
		//	validateOAuth2Token(params);
		//}
		
		trySampleRequest();
		
	}
	else {
		alert("n�o esta autenticado!!!!");
		console.log("chamando funcao pra autenticar");
		oauthSignIn(); //vai redirecionar pra p�gina inicial
	}
});