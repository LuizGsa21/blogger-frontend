import 'babel-core/polyfill'

export class Events {
  constructor() {
    this.LOGIN_USER = Symbol('LOGIN_USER');
    this.LOGIN_USER_COMPLETE = Symbol('LOGIN_USER_COMPLETE');
    this.LOGIN_USER_FAILED = Symbol('LOGIN_USER_FAILED');
    this.LOGOUT_USER = Symbol('LOGOUT_USER');
    this.LOGOUT_USER_COMPLETE = Symbol('LOGOUT_USER_COMPLETE');
    this.LOGOUT_USER_FAILED = Symbol('LOGOUT_USER_FAILED');
    this.HTTP_REQUEST = Symbol('HTTP_REQUEST');
    this.HTTP_RESPONSE = Symbol('HTTP_RESPONSE');
  }
}
