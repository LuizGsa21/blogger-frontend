describe('directive navbar', function() {
  let element;
  let $element;
  let scope;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(($compile, $rootScope) => {
    let categories = {
      data: [
        {id: 1, attributes: {name: 'PHP'}, links: {self: '/categories/1'}},
        {id: 2, attributes: {name: 'Python'}, links: {self: '/categories/2'}},
        {id: 3, attributes: {name: 'JavaScript'}, links: {self: '/categories/3'}}
      ]
    };

    scope = $rootScope.$new();
    scope.items = categories.data;
    element = angular.element(`<app-navbar categories="items"></app-navbar>`);
    $element = angular.element(element[0]);
    $compile(element)(scope);
    scope.$digest();
  }));

  it('should be compiled', () => {
    expect(element.html()).not.toEqual(null);
  });

  it('should have all categories listed.', () => {
    var $links = $element.find('.dropdown-menu > li');
    expect($links.length).toBe(3);
  });
});
