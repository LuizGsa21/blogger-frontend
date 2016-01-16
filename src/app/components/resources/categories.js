export function Categories($resource, constants, TransformApiResponse) {
  'ngInject';
  return $resource(`${constants.RESOURCE_CATEGORIES_URL}/:id`, {}, {
    query: {
      method: 'GET',
      params: {},
      cache: true,
      transformResponse: TransformApiResponse
    }
  });
}
