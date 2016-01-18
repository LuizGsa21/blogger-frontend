/**
 * @ngdoc object
 * @name services.Constants
 */

/**
 * @ngdoc property
 * @name services.Constants#BASE_API_URL
 * @propertyOf services.Constants
 */
export const BASE_API_URL = 'http://blogger.com/api/v1';

/**
 * @ngdoc property
 * @name services.Constants#USER_LOGIN_URL
 * @propertyOf services.Constants
 */
export const USER_LOGIN_URL = `${BASE_API_URL}/auth/login`;

/**
 * @ngdoc property
 * @name services.Constants#USER_LOGOUT_URL
 * @propertyOf services.Constants
 */
export const USER_LOGOUT_URL = `${BASE_API_URL}/auth/logout`;

/**
 * @ngdoc property
 * @name services.Constants#RESOURCE_USERS_URL
 * @propertyOf services.Constants
 */
export const RESOURCE_USERS_URL = `${BASE_API_URL}/users`;

/**
 * @ngdoc property
 * @name services.Constants#RESOURCE_CATEGORIES_URL
 * @propertyOf services.Constants
 */
export const RESOURCE_CATEGORIES_URL = `${BASE_API_URL}/categories`;

/**
 * @ngdoc property
 * @name services.Constants#RESOURCE_ARTICLES_URL
 * @propertyOf services.Constants
 */
export const RESOURCE_ARTICLES_URL = `${BASE_API_URL}/articles`;
