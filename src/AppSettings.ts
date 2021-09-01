export const server = 'https://localhost:44369';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'dev-l67srxr5.us.auth0.com',
  client_id: 'Xe0Tb26x1bS2l8P0OA7UR4tLV3B4CDML',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'openid profile QandAAPI email',
  audience: 'https://qanda',
};
