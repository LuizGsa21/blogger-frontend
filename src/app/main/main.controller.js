/**
 * @ngdoc controller
 * @name app.controller:MainController
 * @description
 * This controller displays the index page.
 *
 * @requires $scope
 * @requires $controller
 * @requires app.BaseController
 */
export class MainController {
  constructor ($scope, $controller) {
    'ngInject';
    $controller('BaseController', {$scope: $scope});
  }
}
