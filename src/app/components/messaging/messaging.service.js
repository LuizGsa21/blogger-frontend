export class Messaging {
  constructor() {
    this.cache = {};
  }

  subscribe(topic, callback) {

    // create a new topic
    if (!this.cache[topic]) this.cache[topic] = [];

    this.cache[topic].push(callback);

    return [topic, callback]
  }

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

  publish(topic, args) {
    var callbacks = this.cache[topic];

    if (callbacks && callbacks.length) {
      for (var i = 0, len = callbacks.length; i < len; i++)
        callbacks[i].apply(this, args || [])
    }
  }

}
