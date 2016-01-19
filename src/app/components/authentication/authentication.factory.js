/**
 * @ngdoc service
 * @name services.Authentication
 *
 * @description
 * `Authenticate` service acts as a frontend for the various authentication schemes in the application.
 * It leverages the {@link services.Messaging Messaging} service to receive the requests to use
 * the various authentication services and then sends messages to invoke the login methods of the requested support services.
 *
 * @requires $http
 * @requires services.Messaging
 * @requires services.Events
 * @requires services.Constants
 */
export function Authentication($http, Messaging, Events, Constants, $log) {
  'ngInject';

  function onUserLoginSuccess(data) {
    Messaging.publish(Events.USER_LOGIN_COMPLETE, [data])
  }

  function onUserLoginFailed(data) {
    Messaging.publish(Events.USER_LOGIN_FAILED, [data])
  }

  function onUserLogoutSuccess(data) {
    Messaging.publish(Events.USER_LOGOUT_COMPLETE, [data])
  }

  function onUserLogoutFailed(data) {
    Messaging.publish(Events.USER_LOGOUT_FAILED, [data])
  }

  /**
   * @ngdoc method
   * @name login
   * @methodOf services.Authentication
   * @description
   * Logs in user using the provided username and password.
   *
   * Publishes {@link services.Events#USER_LOGIN_COMPLETE USER_LOGIN_COMPLETE} on success or
   * {@link services.Events#USER_LOGIN_FAILED USER_LOGIN_FAILED} on failure.
   *
   * @param {string} username user's email or username
   * @param {string} password user's password
   */
  function login(username, password) {
    $log.debug(`Logging in user: ${username}`);
    $http({
      method: 'POST',
      url: Constants.USER_LOGIN_URL,
      data: {data: {username: username, password: password}}
    }).then(onUserLoginSuccess, onUserLoginFailed)
  }

  /**
   * @ngdoc method
   * @name logout
   * @methodOf services.Authentication
   * @description
   * Logs out current user.
   *
   * Publishes {@link services.Events#USER_LOGOUT_COMPLETE USER_LOGOUT_COMPLETE} on success or
   * {@link services.Events#USER_LOGIN_FAILED USER_LOGIN_FAILED} on failure.
   *
   */
  function logout() {
    $http({
      method: 'POST',
      url: Constants.USER_LOGOUT_URL
    }).then(onUserLogoutSuccess, onUserLogoutFailed);
  }

  // subscribe to user login event
  Messaging.subscribe(Events.USER_LOGIN, login);

  // subscribe to user logout event
  Messaging.subscribe(Events.USER_LOGOUT, logout);

  return {
    login,
    logout
  }

}
