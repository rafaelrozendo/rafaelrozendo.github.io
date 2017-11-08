$( document ).ready(function() {
	//tenta pegar primeiro do local storage. Se n�o achar, pega da uri
	var params = getAuthenticationParameters();
	
	//seta no local storage, para o caso de  ter pegado da uri
	setAuthenticationParametersInLocalStorage(params);
	
	//a fun��o isAuthenticated verifica do local storage
    if (isAuthenticated()) {
		alert("autenticou!!!!");
		console.log("autenticado");		
		
		
		trySampleRequest();
		
	}
	else {
		alert("n�o est� autenticado!!!!");
		console.log("iniciando fluxo de autentica��o oauth");
		oauthSignIn(); //vai redirecionar pra p�gina inicial
	}
});