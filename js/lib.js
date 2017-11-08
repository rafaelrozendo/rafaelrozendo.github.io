/*
 * Parse the query string to extract access token and other parameters.
 * This code is useful if you set a value for the 'state' parameter when redirecting the user to the OAuth 2.0 server, but otherwise isn't needed.
*/
function getAuthenticationParametersFromUri() {
	var queryString = location.hash.substring(1);
	var params = {};
	var regex = /([^&=]+)=([^&]*)/g, m;
	while (m = regex.exec(queryString)) {
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
	var paramsLocalStorage = getAuthenticationParameters();
	if (paramsLocalStorage && paramsLocalStorage['access_token']) {
		return true;
	}
	if (location.hash !== "") {
		var params = getAuthenticationParametersFromUri();
		if (params.error === undefined) {
			return true;
		}
	}
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
  var params = {'client_id': APP_SETTINGS.client_id,
                'redirect_uri': APP_SETTINGS.redirect_uri,
                'response_type': 'token',
                'scope': APP_SETTINGS.scope,
                'include_granted_scopes': 'true',
                'state': 'pass-through value'};

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

/* Validate the access token received on the query string. */
function validateOAuth2Token(params) {
  var oauth2Endpoint = APP_SETTINGS.validate_token_uri;
  if (params['access_token']) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', oauth2Endpoint + '?access_token=' + params['access_token']);
    xhr.onreadystatechange = function (e) {
      var response = JSON.parse(xhr.response);
      // Verify that the 'aud' property in the response matches YOUR_CLIENT_ID.
      if (xhr.readyState == 4 &&
          xhr.status == 200 &&
          response['aud'] &&
          response['aud'] == APP_SETTINGS.client_id) {
        setAuthenticationParametersInLocalStorage(params);
		console.log('Token validation successful');
      } else if (xhr.readyState == 4) {
        console.log('There was an error processing the token, another ' +
                    'response was returned, or the token was invalid.')
      }
    };
    xhr.send(null);
  }
}


// If there's an access token, try an API request.
// Otherwise, start OAuth 2.0 flow.
function trySampleRequest() {
    var params = getAuthenticationParameters();
    if (params && params['access_token']) {
      var xhr = new XMLHttpRequest();
      /*xhr.open('GET',
          'https://www.googleapis.com/drive/v3/about?fields=user&' +
          'access_token=' + params['access_token']);*/
	  
	  xhr.open('GET',
          'https://www.googleapis.com/drive/v3/about?fields=user');
	  xhr.setRequestHeader('Authorization', "Bearer " + params['access_token']);
		  
      xhr.onreadystatechange = function (e) {
        console.log(xhr.response);
      };
      xhr.send(null);
    } else {
      console.log("Não foi possível chamar a API: não autenticado");
    }
}