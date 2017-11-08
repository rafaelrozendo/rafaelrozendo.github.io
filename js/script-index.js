$( document ).ready(function() {
    if (isAuthenticated()) {
		console.log("autenticado");
		var params = getAuthenticationParameters();
		setAuthenticationParametersInLocalStorage(params);
		console.log("redirecionando pra p�gina que chama a api");		
		window.location.replace(APP_SETTINGS.redirect_uri);
	}
	else {
		alert("n�o est� autenticado");
		console.log("chamando autentica��o oauth");
		oauthSignIn();
	}
});
