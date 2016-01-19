/**
 * @ngdoc service
 * @name services.Authentication
 *
 * @description
 * `Authentication` service leverages {@link services.Messaging Messaging} to receive the requests for
 *  user authentication.
 *
 * @requires $http
 * @requires services.Messaging
 * @requires services.Events
 * @requires services.Constants
 */
export function Authentication($http, Messaging, Events, Constants, $log) {
  'ngInject';

  // User Login
  function onUserLoginSuccess(data) {
    Messaging.publish(Events.USER_LOGIN_COMPLETE, [data])
  }

  function onUserLoginFailed(data) {
    Messaging.publish(Events.USER_LOGIN_FAILED, [data])
  }
  // User Logout
  function onUserLogoutSuccess(data) {
    Messaging.publish(Events.USER_LOGOUT_COMPLETE, [data])
  }

  function onUserLogoutFailed(data) {
    Messaging.publish(Events.USER_LOGOUT_FAILED, [data])
  }

  // User Register
  function onUserRegisterSuccess(data) {
    Messaging.publish(Events.USER_REGISTER_COMPLETE, [data])
  }

  function onUserRegisterFailed(data) {
    Messaging.publish(Events.USER_REGISTER_FAILED, [data])
  }

  /**
   * @ngdoc method
   * @name login
   * @methodOf services.Authentication
   * @description
   * Logs in user using the provided username and password.
   *
   * Publishes {@link services.Events#USER_LOGIN_COMPLETE USER_LOGIN_COMPLETE} on success or
   * {@link services.Events#USER_LOGIN USER_LOGIN} on failure.
   *
   * You may also invoke this method by publishing to {@link services.Events#USER_LOGIN USER_LOGIN} event.
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
  // subscribe to user login event
  Messaging.subscribe(Events.USER_LOGIN, login);

  /**
   * @ngdoc method
   * @name logout
   * @methodOf services.Authentication
   * @description
   * Logs out current user.
   *
   * Publishes {@link services.Events#USER_LOGOUT_COMPLETE USER_LOGOUT_COMPLETE} on success or
   * {@link services.Events#USER_LOGOUT_FAILED USER_LOGOUT_FAILED} on failure.
   *
   * You may also invoke this method by publishing to {@link services.Events#USER_LOGOUT USER_LOGOUT} event.
   */
  function logout() {
    $http({
      method: 'POST',
      url: Constants.USER_LOGOUT_URL
    }).then(onUserLogoutSuccess, onUserLogoutFailed);
  }
  // subscribe to user logout event
  Messaging.subscribe(Events.USER_LOGOUT, logout);


  /**
   * @ngdoc method
   * @name register
   * @methodOf services.Authentication
   * @description
   * Registers a user account using the provided email, username and password.
   *
   * Publishes {@link services.Events#USER_REGISTER_COMPLETE USER_REGISTER_COMPLETE} on success or
   * {@link services.Events#USER_REGISTER_FAILED USER_REGISTER_FAILED} on failure.
   *
   * You may also invoke this method by publishing to {@link services.Events#USER_REGISTER USER_REGISTER} event.
   * @param {string} email user's email
   * @param {string} username user's username
   * @param {string} password user's password
   */
  function register(email, username, password) {
    $http({
      method: 'POST',
      url: Constants.USER_REGISTER_URL,
      data: {data: {type: 'users', attributes: {username: username, password: password, email: email}}}
    }).then(onUserRegisterSuccess, onUserRegisterFailed);
  }
  // subscribe to register event
  Messaging.subscribe(Events.USER_REGISTER, register);

  return {
    login,
    logout,
    register
  }

}
