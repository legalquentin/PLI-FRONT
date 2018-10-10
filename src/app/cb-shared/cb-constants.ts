export class CbConstants {
  public static API_ENDPOINT = 'http://51.38.237.214:80';
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
    }
  };
}
