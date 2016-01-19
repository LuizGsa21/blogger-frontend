export function config ($logProvider, $httpProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
  $httpProvider.defaults.xsrfCookieName = 'csrf_token';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}
