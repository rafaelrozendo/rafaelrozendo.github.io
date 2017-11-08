$( document ).ready(function() {
    if (isAuthenticated()) {
		console.log("autenticado");
		console.log("redirecionando pra página da api");
		var params = getAuthenticationParameters();
		setAuthenticationParametersInLocalStorage(params);
		
	}
	else {
		alert("não esta autenticado!!!!");
		console.log("chamando funcao pra autenticar");
		//oauthSignIn(); //vai redirecionar pra página inicial
	}
});