export function NavbarDirective() {
  'ngInject';
  'ui.bootstrap';
  /**
   * @ngdoc directive
   * @name app.directive:appNavbar
   * @restrict E
   * @scope
   * @description
   * If the `categories` attribute is specified, a dropdown menu specifying each category will be generated.
   *
   * @param {Object[]=} categories an array of categories.
   **/
  return {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {
      categories: '='
    },
    controller: NavbarController,
    controllerAs: 'nv',
    bindToController: true
  };
}

class NavbarController {
  constructor ($scope, $controller, Categories, CurrentUser) {
    'ngInject';
    $controller('BaseController', {$scope: $scope});
    // "this.categories" is available by directive option "bindToController: true"

    // load the dropdown items
    this.categories = this.categories || Categories.query((response) => {
      // on success
        this.categories = response.data;
    }, () => {
      // on fail
        this.categories = [];
    });

    this.isCollapsed = true;
    this.toggleNavbar = () => {
      this.isCollapsed = !this.isCollapsed;
    };

    this.isLoggedIn = CurrentUser.isLoggedIn();


    this.logout = () => {
      $scope.publish($scope.events.USER_LOGOUT);
    };


    this.onUserLogin = () => {
      this.isLoggedIn = true;
    };

    this.onUserLogout = () => {
      this.isLoggedIn = false;
    };

    $scope.subscribe($scope.events.USER_LOGIN_COMPLETE, this.onUserLogin);
    $scope.subscribe($scope.events.USER_LOGOUT_COMPLETE, this.onUserLogout);

  }
}
