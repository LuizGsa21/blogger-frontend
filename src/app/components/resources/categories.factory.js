/**
 * @ngdoc service
 * @name resources.Categories
 *
 * @requires $resource
 * @requires services.Constants#RESOURCE_CATEGORIES_URL
 * @requires services.TransformApiResponse
 *
 */
export function Categories($resource, Constants, TransformApiResponse) {
  'ngInject';
  return $resource(`${Constants.RESOURCE_CATEGORIES_URL}/:id`, {}, {
    query: {
      method: 'GET',
      params: {},
      cache: true,
      transformResponse: TransformApiResponse
    }
  });
}
