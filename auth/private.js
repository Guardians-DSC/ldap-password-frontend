import { useState } from 'react';
import withAuth from './withAuth';
import { useUser } from './useUser';
import config from '../config';

require('dotenv').config();

const sendRequest = (setResponse) => {
  config.auth().currentUser.getIdTokenResult(true).then(function(token) {
    const apiUrl = "http://localhost:5001/reset_password"
    const email = token.claims.email
    document.cookie = '__session=' + token.token + ';max-age=3600';
    console.log('Sending request to', apiUrl, 'with ID token in __session cookie.');

    let req = new XMLHttpRequest();
    req.onload = function() {
      console.log(req)
      setResponse(req.responseText);
    };

    req.onerror = function() {
      setResponse('There was an error');
    };

    req.open('POST', apiUrl, true);
    req.setRequestHeader('Access-Control-Allow-Origin', "*")
    req.setRequestHeader('Authorization', 'Bearer ' + token);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    console.log(email)
    req.send(JSON.stringify({
      email: email,
      key: `${process.env.NEXT_PUBLIC_KEY}`
    }));
  });
}


const Private = () => {
  const { user, logout } = useUser();
  const [ response, setResponse ] = useState("");
  const [ disabled, setDisabled ] = useState(false)
  return (
    <div >
    { user?.email && <>
      <div>{user.email}</div>
      <hr />
      <div>
          <button disabled={disabled} onClick={() => setDisabled(true) || sendRequest(setResponse)}>Resetar Senha LCC</button>
          <div>
            { response && <span>{response}</span>}
          </div>
      </div>
      <hr />
      <div>
          <button onClick={() => logout()}>Logout</button>
      </div>
    </>
    }
    </div>
  )
}

export default withAuth(Private);
