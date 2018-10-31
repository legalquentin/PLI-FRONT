export class CbConstants {
  public static API_ENDPOINT = 'http://51.38.231.236:80';
  // public static API_ENDPOINT = 'http://51.38.237.214:80';
  // public static API_ENDPOINT = 'http://localhost';
  public static API_KEY = '1234567890987654321';
  public static SESSION_KEY = 'CRYPTOBO4RD_SESSION';

  // "start": "ng serve --aot --host 0.0.0.0 --ssl true --ssl-key ssl/server.key --ssl-cert ssl/server.crt",

  // API METHODS DEFINITIONS
  public static REQUESTS = {
    // AUTH
    REGISTER: {
      PATH: '/register',
      METHOD: 'POST'
    },
    LOGIN: {
      PATH: '/auth',
      METHOD: 'POST'
    },
    // USER(S)
    GET_PROFILE: {
      PATH: '/profil',
      METHOD: 'GET'
    },
    UPDATE_PROFILE: {
      PATH: '/profil',
      METHOD: 'PUT'
    },
    LIST_USERS: {
      PATH: '/users',
      METHOD: 'GET'
    },
    // CONFIGURATIONS
    LIST_CONFIGURATIONS: {
      PATH: '/configuration',
      METHOD: 'GET'
    },
    // PROVIERS
    LIST_PROVIDERS: {
      PATH: '/provider',
      METHOD: 'GET'
    },
    ADD_PROVIDERS: {
      PATH: '/provider',
      METHOD: 'POST'
    },
    DELETE_PROVIDER_ACCOUNT: {
      PATH: '/provider/account',
      METHOD: 'DELETE'
    },
    // EXCHANGES ACCOUNT
    GET_CURRENCIES: {
      PATH: '/account-currency',
      METHOD: 'GET'
    },
    GET_CURRENCIES_DETAILS: {
      PATH: '/account-currency/details',
      METHOD: 'GET'
    },
    GET_VOLUME_VALUE: {
      PATH: '/volume',
      METHOD: 'GET'
    },
    GET_MARKET_INFO: {
      PATH: '/market',
      METHOD: 'GET'
    },
    GET_PAIR: {
      PATH: '/market',
      METHOD: 'GET'
    }
  };
}
