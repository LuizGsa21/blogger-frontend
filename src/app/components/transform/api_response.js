export function TransformApiResponse(Model) {
  'ngInject';
  var jsonParse = angular.fromJson;
  /**
   * @ngdoc service
   * @name services.TransformApiResponse
   *
   * @description
   * Accepts a JSON API {@link http://jsonapi.org/format/#document-top-level response} and transforms its
   * `data` and `included` attributes to resource objects using {@link services.Model Model.update}.
   * @requires services.Model
   * @param {String} response a valid JSON API {@link http://jsonapi.org/format/#document-top-level response}
   */
  return (response) => {
    // don't transform response if its invalid
    if ( ! response) return response;

    response = jsonParse(response);
    if ('data' in response) {
      response['data'] = Model.update(response['data']);
      if ('included' in response) {
        response['included'] = Model.update(response['included']);
      }
    }
    return response;
  }
}
