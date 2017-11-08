$( document ).ready(function() {
	//tenta pegar primeiro do local storage. Se não achar, pega da uri
	var params = getAuthenticationParameters();
	
	//seta no local storage, para o caso de  ter pegado da uri
	setAuthenticationParametersInLocalStorage(params);
	
	//a função isAuthenticated verifica do local storage
    if (isAuthenticated()) {
		alert("autenticou!!!!");
		console.log("autenticado");		
		
		
		trySampleRequest();
		
	}
	else {
		alert("não está autenticado!!!!");
		console.log("iniciando fluxo de autenticação oauth");
		oauthSignIn(); //vai redirecionar pra página inicial
	}
});