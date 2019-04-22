import { KeycloakService } from 'keycloak-angular';

import { KEYCLOAK_CONFIG } from '../app.config';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: KEYCLOAK_CONFIG,
          initOptions: {
            onLoad: 'check-sso',
            checkLoginIframeInterval: 5,
          },
          enableBearerInterceptor: false, // we will handle this ourselves
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
