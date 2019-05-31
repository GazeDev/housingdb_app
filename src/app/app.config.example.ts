export const APP_CONFIG: any = {
  apiURL: 'http://localhost:23085',
  // apiURL: 'https://gaze-housingdb.herokuapp.com',
};

import { KeycloakConfig } from 'keycloak-angular';

export const KEYCLOAK_CONFIG: KeycloakConfig = {
  url: 'https://accounts.gaze.dev/auth',
  realm: 'test-accounts',
  clientId: 'housingdb',
};
