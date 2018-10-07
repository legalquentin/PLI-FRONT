export class CbConstants {
  public static API_ENDPOINT = 'http://51.38.237.214:80';
  public static API_KEY = '1234567890987654321';
  public static SESSION_KEY = 'CRYPTOBO4RD_SESSION';

  // API METHODS DEFINITIONS
  public static REQUESTS = {
    REGISTER: {
      PATH: '/register',
      METHOD: 'POST'
    },
    LOGIN: {
      PATH: '/auth',
      METHOD: 'POST'
    },
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
    LIST_CONFIGURATIONS: {
      PATH: '/configuration',
      METHOD: 'GET'
    },
    LIST_PROVIDERS: {
      PATH: '/provider',
      METHOD: 'GET'
    }
  };
}
