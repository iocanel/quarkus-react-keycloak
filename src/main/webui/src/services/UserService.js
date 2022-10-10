import Keycloak from 'keycloak-js';
import { useCallback } from 'react';

class GenericUserService {

  login() {
  }

  logout() {
  }

  getToken() {
  }

  updateToken(callback) {
    callback();
  }

  getUsername() {
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  getRoles() {
    return [];
  }

  hasRole(roles) {
    return roles.some((role) => this.getRoles().includes(role));
  }
}

class KeycloakService extends GenericUserService {
  #keycloak;
  init(onAuthenticated) {
    fetch(`http://localhost:8080/api/keycloak/info.json`).then(response => response.json()).then(json => {
      this.#keycloak = new Keycloak(json);
      this.#keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
        checkLoginIframe: false,
      }).then((authenticated) => {
        console.log("User:" + (authenticated ? this.getUsername() : "anonymous."));
        if (onAuthenticated) {
          onAuthenticated();
        }
      }).catch(console.error);
    });
  }

  login() {
    this.#keycloak.login();
  }

  logout() {
    this.#keycloak.logout();
  }

  updateToken(callback) {
    this.#keycloak.updateToken(5).then(callback).catch(() => this.login());
  }

  getToken() {
    return this.#keycloak?.token;
  }

  getUsername() {
    return this.#keycloak.idTokenParsed?.upn;
  }

  getRoles() {
    return this.#keycloak.idTokenParsed?.upn;
  }
}

export const userService = new KeycloakService();
export const getToken = () => userService.getToken();
export const updateToken = (callback) => userService.updateToken(callback);

const UserService = {
  userService,
  getToken,
  updateToken
}
export default UserService;
