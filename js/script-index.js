$( document ).ready(function() {
    if (isAuthenticated()) {
		console.log("autenticado");
		console.log("redirecionando pra p�gina da api");
		var params = getAuthenticationParameters();
		setAuthenticationParametersInLocalStorage(params);
		
	}
	else {
		alert("n�o esta autenticado!!!!");
		console.log("chamando funcao pra autenticar");
		//oauthSignIn(); //vai redirecionar pra p�gina inicial
	}
});