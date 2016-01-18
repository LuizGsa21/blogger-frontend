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
  constructor () {
    'ngInject';
    // "this.categories" is available by directive option "bindToController: true"
    this.isCollapsed = true;
    this.toggleNavbar = () => {
      this.isCollapsed = !this.isCollapsed;
    };
  }
}
