describe('service messaging', () => {
  var mock, messaging, event = Symbol('event');
  beforeEach(angular.mock.module('bloggerFrontend'));

  beforeEach(inject((_messaging_) => {
    messaging = _messaging_;
    mock = {
      callback: () => {}
    };
    spyOn(mock, 'callback');
  }));

  it('should be defined', () => {
    expect(messaging).toBeDefined();
  });

  it("should expose it's API ", () => {
    expect(typeof messaging.subscribe).toBe('function');
    expect(typeof messaging.unsubscribe).toBe('function');
    expect(typeof messaging.publish).toBe('function');
  });

  it('should be able to add subscribers and publish topics', () => {
    messaging.subscribe(event, mock.callback);
    messaging.publish(event, [1, 2, 3]);
    expect(mock.callback).toHaveBeenCalledWith(1, 2, 3);
  });

});
