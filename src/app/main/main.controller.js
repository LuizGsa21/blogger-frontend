export class MainController {
  constructor (Categories) {
    'ngInject';

    this.categories = Categories.query((data) => {
      // on success
      this.categories = data.data;
    }, () => {
      // on fail

    });

  }

}
