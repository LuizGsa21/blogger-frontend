/**
 * @ngdoc service
 * @name resources.Articles
 *
 * @requires $resource
 * @requires services.Constants.RESOURCE_ARTICLES_URL
 * @requires services.TransformApiResponse
 *
 */
export function Articles($resource, Constants, TransformApiResponse) {
  'ngInject';
  return $resource(`${Constants.RESOURCE_ARTICLES_URL}/:id`, {}, {
    query: {
      method: 'GET',
      params: {},
      cache: true,
      transformResponse: TransformApiResponse
    },
    byCategory: {
      method: 'GET',
      params: {category: '@category'},
      cache: true,
      transformResponse: TransformApiResponse
    }
  });
}
