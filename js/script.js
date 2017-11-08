$( document ).ready(function() {
    if (isAuthenticated()) {
		alert("autenticou!!!!");
		console.log("autenticado");
	}
	else {
		alert("não esta autenticado!!!!");
		console.log("chamando funcao pra autenticar");
		oauthSignIn();
	}
});