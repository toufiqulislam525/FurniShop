const domain = "dev-p1gix4nnojy5oq4q.jp.auth0.com";
const clientId = "l0GDFkHEBksgjSTwrwFforHPEw1h4PKz";
const cacheLocation='localstorage'

export const authConfig = {
  domain,
  clientId,
  redirectUri: window.location.origin,
  cacheLocation,
};