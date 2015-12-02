import 'babel-core/polyfill'

export class Events {
  constructor() {
    this.USER_LOGIN = Symbol('USER_LOGIN');
    this.USER_LOGIN_COMPLETE = Symbol('USER_LOGIN_COMPLETE');
    this.USER_LOGIN_FAILED = Symbol('USER_LOGIN_FAILED');
    this.USER_LOGOUT = Symbol('USER_LOGOUT');
    this.USER_LOGOUT_COMPLETE = Symbol('USER_LOGOUT_COMPLETE');
    this.USER_LOGOUT_FAILED = Symbol('USER_LOGOUT_FAILED');
    this.HTTP_REQUEST = Symbol('HTTP_REQUEST');
    this.HTTP_RESPONSE = Symbol('HTTP_RESPONSE');
  }
}
