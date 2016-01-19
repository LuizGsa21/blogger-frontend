/**
 * @ngdoc service
 * @name resources.Users
 *
 * @requires $resource
 * @requires services.Constants.RESOURCE_USERS_URL
 * @requires services.TransformApiResponse
 *
 */
export function Users($resource, Constants, TransformApiResponse) {
  'ngInject';
  return $resource(`${Constants.RESOURCE_USERS_URL}/:id`, {}, {
    query: {
      method: 'GET',
      params: {},
      cache: true,
      transformResponse: TransformApiResponse
    }
  });
}
