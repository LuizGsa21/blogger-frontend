/**
 * @ngdoc service
 * @name services.Messaging
 * @description
 * Publish/Subscribe messaging service that leverages callbacks.
 *
 * Use this service over {@link https://code.angularjs.org/1.4.8/docs/api/ng/type/$rootScope.Scope#$broadcast $broadcast}
 * and {@link https://code.angularjs.org/1.4.8/docs/api/ng/type/$rootScope.Scope#$on $on} methods to reduce strain on the digest loop.
 */
export class Messaging {
  constructor($log) {
    'ngInject';
    /**
     * Holds all the subscribers for each event and their callbacks.
     * @type {services.Events.*: Array}
     */
    this.cache = {};
    this.$log = $log;
  }

  /**
   * @ngdoc method
   * @name subscribe
   * @methodOf services.Messaging
   * @description
   * Subscribes to an event.
   *
   * @param {services.Events.*} topic the {@link services.Events event} to subscribe to.
   * @param {Function} callback callback function to be invoked when event fires.
   * @returns {Array} an array containing the topic and the callback, respectively.
   */
  subscribe(topic, callback) {

    // create a new topic
    if (!this.cache[topic]) this.cache[topic] = [];

    this.cache[topic].push(callback);

    return [topic, callback]
  }

  /**
   * @ngdoc method
   * @name unsubscribe
   * @methodOf services.Messaging
   * @description
   * Unsubscribe to event.
   *
   * @param {Array} handler an array containing the topic and the callback, respectively.
   * This is the same array returned from {@link services.Messaging#subscribe Messaging.subscribe} method.
   */
  unsubscribe(handler) {

    var callbacks = this.cache[handler[0]],
        callback = handler[1];

    if (callbacks && callbacks.length) {
      for (var i = 0, len = callbacks.length; i < len; i++)
        if (callbacks[i] == callback) {
          callbacks.slice(i, 1);
        }
    }

  }

  /**
   * @ngdoc method
   * @name publish
   * @methodOf services.Messaging
   * @description
   * Fires the event
   *
   * @param {services.Events.*} topic the {@link services.Events event} to fire.
   * @param {Array=} args an array containing the arguments to pass to the subscriber.
   */
  publish(topic, args = []) {
    this.$log.debug('Fired event:', topic);
    var callbacks = this.cache[topic];

    if (callbacks && callbacks.length) {
      for (var i = 0, len = callbacks.length; i < len; i++)
        callbacks[i].apply(this, args)
    }
  }

}
