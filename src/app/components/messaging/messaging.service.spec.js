describe('service Messaging', () => {
  var mock, Messaging, event = Symbol('event');
  beforeEach(angular.mock.module('services'));

  beforeEach(inject((_Messaging_) => {
    Messaging = _Messaging_;
    mock = {
      callback: () => {}
    };
    spyOn(mock, 'callback');
  }));

  it('should be defined', () => {
    expect(Messaging).toBeDefined();
  });

  it("should expose it's API ", () => {
    expect(typeof Messaging.subscribe).toBe('function');
    expect(typeof Messaging.unsubscribe).toBe('function');
    expect(typeof Messaging.publish).toBe('function');
  });

  it('should be able to add subscribers and publish topics', () => {
    Messaging.subscribe(event, mock.callback);
    Messaging.publish(event, [1, 2, 3]);
    expect(mock.callback).toHaveBeenCalledWith(1, 2, 3);
  });

});
