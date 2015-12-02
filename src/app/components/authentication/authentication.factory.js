export function Authentication(messaging, events, $http, constants) {
  'ngInject';

  function onUserLoginSuccess(data) {
    messaging.publish(events.USER_LOGIN_COMPLETE, [data])
  }

  function onUserLoginFailed(data) {
    messaging.publish(events.USER_LOGIN_FAILED, [data])
  }

  function onUserLogoutSuccess(data) {
    messaging.publish(events.USER_LOGOUT_COMPLETE, [data])
  }

  function onUserLogoutFailed(data) {
    messaging.publish(events.USER_LOGOUT_FAILED, [data])
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
  messaging.subscribe(events.USER_LOGIN, login);

  // subscribe to user logout event
  messaging.subscribe(events.USER_LOGOUT, logout);

  return {
    login,
    logout
  }

}
