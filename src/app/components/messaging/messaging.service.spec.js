describe('service messaging', function () {
  var mock;
  beforeEach(angular.mock.module('bloggerFrontend'));

  beforeEach(function () {
    mock = {
      callback: function () {}
    };
    spyOn(mock, 'callback');
  });

  it('should be defined', inject(function (messaging) {
    expect(messaging).toBeDefined();
  }));

  it("should expose it's API ", inject(function (messaging) {
    expect(typeof messaging.subscribe).toBe('function');
    expect(typeof messaging.unsubscribe).toBe('function');
    expect(typeof messaging.publish).toBe('function');
  }));

  it('should be able to add subscribers and publish topics', inject(function (messaging) {
    messaging.subscribe('testing', mock.callback);
    messaging.publish('testing', [1, 2, 3]);
    expect(mock.callback).toHaveBeenCalledWith(1, 2, 3);
  }));


});
