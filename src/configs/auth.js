let baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const authConfig = {
  refresh: baseUrl + '/private/user/profile',
  login: baseUrl + '/public/login',
  logout: baseUrl + '/public/logout',
  register: baseUrl + '/public/register',
  wallet: baseUrl + '/public/wallet',
  walletConnect: baseUrl + '/private/user/connect',

  publicKey: 'publicKey',
  session: 'userSession',

  homeRoute: {
    'public': '/',
    'user': '/',
    'wallet-user': '/',
    'admin': '/admin',
  }
};

export default authConfig;
