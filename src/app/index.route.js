export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('articles', {
      url: '/:category/',
      templateUrl: 'app/view_articles/articles.html',
      controller: 'ArticlesController',
      controllerAs: 'articlesCtrl'
    });

  $urlRouterProvider.otherwise('/');
}
