/**
 * @ngdoc controller
 * @name app.BaseController
 * @description
 * All controllers inherit the `BaseController`. The `BaseController` attaches the {@link services.Messaging Messaging} service to the $scope object
 * and ensures its registered handlers are unpublished upon `$destroy` event.
 *
 * @requires $scope
 * @requires services.Messaging
 * @requires services.Events
 */
export class BaseController {
  constructor ($scope, Messaging, Events) {
    'ngInject';

    $scope.events = Events;

    // contains all controller handlers
    $scope.handlers = [];

    $scope.subscribe = (topic, callback) => {
      var handler = Messaging.subscribe(topic, callback);
      $scope.handlers.push(handler);
    };

    $scope.publish = Messaging.publish.bind(Messaging);

    $scope.$on('$destroy', () => {
      $scope.handlers.forEach(handler => Messaging.unsubscribe(handler));
    });

  }
}
