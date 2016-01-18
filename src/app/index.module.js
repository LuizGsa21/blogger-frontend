/* global moment:false */

import * as Constants  from './index.constants.js';
import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
//import { ArticlesController } from './view_articles/articles.controller.js';
import { BaseController } from './components/base/base.controller.js';
import { Events } from '../app/components/events/events.service.js';
import { Authentication } from '../app/components/authentication/authentication.factory.js';
import { Messaging } from '../app/components/messaging/messaging.service.js'
import { TransformApiResponse } from '../app/components/transform/api_response.js'
import { Model } from '../app/components/model/model.factory.js'
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { Articles } from '../app/components/resources/articles.factory.js';
import { Users } from '../app/components/resources/users.factory.js';
import { Categories } from '../app/components/resources/categories.factory.js';


/**
 * @ngdoc object
 * @name services
 * @description Contains a collection of services
 */
angular.module('services', [])
  .constant('Constants', Constants)
  .factory('Model', Model)
  .factory('TransformApiResponse', TransformApiResponse)
  .service('Events', Events)
  .service('Messaging', Messaging)
  .service('Authentication', Authentication);

/**
 * @ngdoc object
 * @name resources
 * @description Contains Resources used by the application for CRUD operations.
 */
angular.module('resources', ['services'])
  .factory('Users', Users)
  .factory('Categories', Categories)
  .factory('Articles', Articles);

/**
 * @ngdoc object
 * @name app
 * @description This is the main module.
 */
angular.module('app', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngMessages',
  'ngAria',
  'ngResource',
  'ui.router',
  'ui.bootstrap',
  'resources',
  'services'
])
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .controller('BaseController', BaseController)
  .controller('MainController', MainController)


  //.controller('ArticlesController', ArticlesController)
  .directive('appNavbar', NavbarDirective)
  .run(runBlock);
