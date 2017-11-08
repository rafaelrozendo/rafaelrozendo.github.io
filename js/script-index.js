$( document ).ready(function() {
    if (isAuthenticated()) {
		console.log("autenticado");
		var params = getAuthenticationParameters();
		setAuthenticationParametersInLocalStorage(params);
		console.log("redirecionando pra página que chama a api");		
		window.location.replace(APP_SETTINGS.redirect_uri);
	}
	else {
		alert("não está autenticado");
		console.log("chamando autenticação oauth");
		oauthSignIn();
	}
});
