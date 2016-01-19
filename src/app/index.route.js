export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('main', {
      url: '/',
      views: {
        '': {
          templateUrl: 'app/main/main.html',
          controller: 'MainController'
        },
        'loginFormView@main': {
          templateUrl: 'app/components/login_form/login_form.html',
          controller: 'LoginFormController'
        }
      }
    })
    .state('articles', {
      url: '/:category/',
      templateUrl: 'app/view_articles/articles.html',
      controller: 'ArticlesController',
      controllerAs: 'articlesCtrl'
    });

  $urlRouterProvider.otherwise('/');
}
