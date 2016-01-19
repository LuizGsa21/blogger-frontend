export class CurrentUser {

  constructor(Messaging, Events, $cookies) {
    'ngInject';
    this.$cookie = $cookies;
    this._reset();
    Messaging.subscribe(Events.USER_LOGIN_COMPLETE, (user) => this.setCurrentUser(user));
    Messaging.subscribe(Events.USER_LOGOUT_COMPLETE, () => this._reset());
  }

  _reset() {
    this._currentUser = {
      username: 'Guest'
    };
  }

  setCurrentUser(user) {
    this._currentUser = user;
  }

  getCurrentUser() {
    return this._currentUser;
  }

  isLoggedIn() {
    return !!this.$cookie.get('is_logged_in');
  }
}

