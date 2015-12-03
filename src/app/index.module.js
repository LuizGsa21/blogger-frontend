/* global malarkey:false, moment:false */

import * as constants  from './index.constants.js';
import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { Events } from '../app/components/events/events.service.js';
import { Authentication } from '../app/components/authentication/authentication.factory.js';
import { Messaging } from '../app/components/messaging/messaging.service.js'
import { model } from '../app/components/model/model.factory.js'
import { NavbarDirective } from '../app/components/navbar/navbar.directive';

angular.module('bloggerFrontend', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr'])
  .constant('constants', constants)
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('events', Events)
  .service('messaging', Messaging)
  .service('authentication', Authentication)
  .factory('model', model)
  .controller('MainController', MainController)
  .directive('appNavbar', NavbarDirective);
