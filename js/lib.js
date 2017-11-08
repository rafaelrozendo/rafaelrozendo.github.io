/*
 * Parse the query string to extract access token and other parameters.
 * This code is useful if you set a value for the 'state' parameter when redirecting the user to the OAuth 2.0 server, but otherwise isn't needed.
*/
function getAuthenticationParametersFromUri() {
	var queryString = location.hash.substring(1);
	var params = null;
	var regex = /([^&=]+)=([^&]*)/g, m;
	while (m = regex.exec(queryString)) {
		if (!params) {
			params = {};
		}
		params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}
	return params;
}

function getAuthenticationParametersFromLocalStorage() {
	var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
	return params;
}

function getAuthenticationParameters() {
	var paramsLocalStorage = getAuthenticationParametersFromLocalStorage();
	if (paramsLocalStorage && paramsLocalStorage['access_token']) {
		return paramsLocalStorage;
	}
	else {
		return getAuthenticationParametersFromUri();
	}
}

function setAuthenticationParametersInLocalStorage(params) {
	localStorage.setItem('oauth2-test-params', JSON.stringify(params) );
}


function isAuthenticated() {
	var paramsLocalStorage = getAuthenticationParametersFromLocalStorage();
	if (paramsLocalStorage && paramsLocalStorage['access_token']) {
		return true;
	}
	//if (location.hash !== "") {
	//	var params = getAuthenticationParametersFromUri();
	//	if (params.error === undefined) {
	//		return true;
	//	}
	//}
	return false;
}



/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = APP_SETTINGS.authorize_uri;

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  /*var params = {'client_id': APP_SETTINGS.client_id,
                'redirect_uri': APP_SETTINGS.redirect_uri,
                'response_type': 'token',
                'scope': APP_SETTINGS.scope,
                'include_granted_scopes': 'true',
                'state': 'pass-through value'};*/
				
  var params = {'client_id': APP_SETTINGS.client_id,
                'redirect_uri': APP_SETTINGS.redirect_uri,
                'response_type': 'token',
                'scope': APP_SETTINGS.scope,
                'state': 'pass-through value',
				'audience': APP_SETTINGS.audience };

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}


// If there's an access token, try an API request.
// Otherwise, start OAuth 2.0 flow.
function trySampleRequest() {
    var params = getAuthenticationParameters();
    if (params && params['access_token']) {
      var xhr = new XMLHttpRequest();
	  
	  xhr.open('GET',
          APP_SETTINGS.api_uri);
	  xhr.setRequestHeader('Authorization', "Bearer " + params['access_token']);
		  
      xhr.onreadystatechange = function (e) {
        console.log(xhr.response);
      };
      xhr.send(null);
    } else {
      console.log("Não foi possível chamar a API: não autenticado");
    }
}