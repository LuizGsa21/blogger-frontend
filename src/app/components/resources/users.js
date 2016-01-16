
export function Users($resource, constants, TransformApiResponse) {
  'ngInject';
  return $resource(`${constants.RESOURCE_USERS_URL}/:id`, {}, {
    query: {
      method: 'GET',
      params: {},
      cache: true,
      transformResponse: TransformApiResponse
    }
  });
}
