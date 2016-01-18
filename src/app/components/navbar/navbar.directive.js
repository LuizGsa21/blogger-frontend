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
  constructor (Categories) {
    'ngInject';
    // "this.categories" is available by directive option "bindToController: true"

    // load the navbar
    this.categories = this.categories || Categories.query((response) => {
      // on success
        this.categories = response.data;
    }, () => {
      // on fail
    });

    this.isCollapsed = true;
    this.toggleNavbar = () => {
      this.isCollapsed = !this.isCollapsed;
    };
  }
}
