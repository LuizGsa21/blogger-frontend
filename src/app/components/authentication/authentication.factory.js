export function Authentication(Messaging, Events, $http, constants) {
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

  function login(username, password) {
    $http({
      method: 'POST',
      url: constants.USER_LOGIN_URL,
      data: {data: {username: username, password: password}}
    }).then(onUserLoginSuccess, onUserLoginFailed)
  }

  function logout() {
    $http({
      method: 'POST',
      url: constants.USER_LOGOUT_URL
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
