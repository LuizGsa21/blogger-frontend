export class MainController {
  constructor () {
    'ngInject';

    this.categories = [
      {id: 1, name: 'PHP', links: '/categories/1'},
      {id: 2, name: 'Python', links: '/categories/2'},
      {id: 3, name: 'JavaScript', links: '/categories/3'}
    ];

  }
}
