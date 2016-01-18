import 'babel-core/polyfill'

/**
 * @ngdoc service
 * @name services.Events
 * @description Contains all custom events defined by the application.
 */
export class Events {
  constructor() {
    /**
     * @ngdoc property
     * @name services.Events#USER_LOGIN
     * @propertyOf services.Events
     */
    this.USER_LOGIN = Symbol('USER_LOGIN');

    /**
     * @ngdoc property
     * @name services.Events#USER_LOGIN_COMPLETE
     * @propertyOf services.Events
     */
    this.USER_LOGIN_COMPLETE = Symbol('USER_LOGIN_COMPLETE');

    /**
     * @ngdoc property
     * @name services.Events#USER_LOGIN_FAILED
     * @propertyOf services.Events
     */
    this.USER_LOGIN_FAILED = Symbol('USER_LOGIN_FAILED');

    /**
     * @ngdoc property
     * @name services.Events#USER_LOGOUT
     * @propertyOf services.Events
     */
    this.USER_LOGOUT = Symbol('USER_LOGOUT');

    /**
     * @ngdoc property
     * @name services.Events#USER_LOGOUT_COMPLETE
     * @propertyOf services.Events
     */
    this.USER_LOGOUT_COMPLETE = Symbol('USER_LOGOUT_COMPLETE');

    /**
     * @ngdoc property
     * @name services.Events#USER_LOGOUT_FAILED
     * @propertyOf services.Events
     */
    this.USER_LOGOUT_FAILED = Symbol('USER_LOGOUT_FAILED');
  }
}
