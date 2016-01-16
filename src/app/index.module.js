/* global moment:false */

import * as constants  from './index.constants.js';
import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { Events } from '../app/components/events/events.service.js';
import { Authentication } from '../app/components/authentication/authentication.factory.js';
import { Messaging } from '../app/components/messaging/messaging.service.js'
import { TransformApiResponse } from '../app/components/transform/api_response.js'
import { Model } from '../app/components/model/model.factory.js'
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { Articles } from '../app/components/resources/articles.js';
import { Users } from '../app/components/resources/users.js';
import { Categories } from '../app/components/resources/categories.js';

angular.module('bloggerFrontend', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap'])
  .constant('constants', constants)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('Events', Events)
  .service('Messaging', Messaging)
  .service('Authentication', Authentication)
  .factory('Model', Model)
  .factory('Users', Users)
  .factory('Categories', Categories)
  .factory('Articles', Articles)
  .factory('TransformApiResponse', TransformApiResponse)
  .controller('MainController', MainController)
  .directive('appNavbar', NavbarDirective);
