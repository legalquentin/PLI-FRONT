export class CbConstants {
  public static API_ENDPOINT = 'http://51.38.237.214:80';
  public static API_KEY = '1234567890987654321';
  public static SESSION_KEY = 'session';

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
    LIST_USERS: {
      PATH: '/users',
      METHOD: 'GET'
    },
    LIST_CONFIGURATIONS: {
      PATH: '/configuration',
      METHOD: 'GET'
    }
  };
}
