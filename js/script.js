$( document ).ready(function() {
    if (isAuthenticated()) {
		alert("autenticou!!!!");
		console.log("autenticado");
	}
	else {
		alert("n�o esta autenticado!!!!");
		console.log("chamando funcao pra autenticar");
		oauthSignIn();
	}
});