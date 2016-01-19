export class LoginFormController {

  constructor($scope, $controller, CurrentUser) {
    'ngInject';
    $controller('BaseController', {$scope: $scope});

    $scope.username = '';
    $scope.password = '';
    $scope.hideForm = CurrentUser.isLoggedIn();

    $scope.subscribe($scope.events.USER_LOGIN_COMPLETE, () => {
      $scope.hideForm = true;
      $scope.username = '';
      $scope.password = '';
    });

    $scope.subscribe($scope.events.USER_LOGOUT_COMPLETE, () => $scope.hideForm = false);

    $scope.login = () => {
      $scope.publish($scope.events.USER_LOGIN, [$scope.username, $scope.password]);
    };

    $scope.register = () => {
      $scope.publish($scope.events.USER_REGISTER, [$scope.email, $scope.username, $scope.password]);
    }

  }
}
