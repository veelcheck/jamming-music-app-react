
export const clientId = process.env.REACT_APP_CLIENT_ID;
export const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
export const URL_BASE = 'https://api.spotify.com/v1/';

export const authorizationUrl = 'https://accounts.spotify.com/authorize';
export const redirectUri = 'http://localhost:3000/';
export const scope = 'user-read-private%20user-read-email%20playlist-modify-public';
export const authRequestUrl = `${authorizationUrl}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;

