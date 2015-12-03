export function NavbarDirective() {
  'ngInject';
  'ui.bootstrap';
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
