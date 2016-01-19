export class LoginFormController {

  constructor($scope, $controller, CurrentUser) {
    'ngInject';
    $controller('BaseController', {$scope: $scope});

    $scope.username = '';
    $scope.password = '';
    $scope.hideForm = CurrentUser.isLoggedIn();

    $scope.subscribe($scope.events.USER_LOGIN_COMPLETE, () => $scope.hideForm = true);

    $scope.login = () => {
      $scope.publish($scope.events.USER_LOGIN, [$scope.username, $scope.password]);
    };
  }
}
