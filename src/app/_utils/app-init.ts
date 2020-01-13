import { KeycloakService } from 'keycloak-angular';
import { environment } from '_environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {

    // Try initializing Keycloak
    let initPromise = new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: environment.keycloak,
          initOptions: {
            onLoad: 'check-sso',
            checkLoginIframeInterval: 5,
          },
          enableBearerInterceptor: false, // we will handle this ourselves
        });

        // if the initialization was successful keycloak actually returns if
        // the user is authenticated, so we force true in this case
        resolve(true);
      } catch (error) {
        resolve(error);
      }
    });

    // Create a promise that responds with message in <ms> milliseconds
    let ms = 3000;
    let timeout = new Promise((resolve, reject) => {
      let id = setTimeout(() => {
        clearTimeout(id);
        let msg = 'Time out recovery run after '+ ms + 'ms.';
        resolve(msg)
      }, ms)
    });

    // Return whatever comes first, keycloak initializing, or the timeout, print if error
    return Promise.race([
      initPromise,
      timeout
    ]).then(response => {
      if (response !== true) {
        console.error('Keycloak initialization failed:', response);
      }
    });

  };
}
