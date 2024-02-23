import { authRequestUrl } from '../config.js'

function handleLogin(accessToken) {
  // Redirect the user to Spotify for authorization only if the access token is not present
  console.log('Handling login...');
  if (!accessToken) {
    window.location.href = authRequestUrl;
  }
};

export default handleLogin;