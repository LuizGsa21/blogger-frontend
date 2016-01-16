export function TransformApiResponse(Model) {
  'ngInject';
  var jsonParse = angular.fromJson;
  return (data) => {
    data = jsonParse(data);
    if ('data' in data) {
      data['data'] = Model.update(data['data']);
      if ('included' in data) {
        data['included'] = Model.update(data['included']);
      }
    }
    return data;
  }
}
