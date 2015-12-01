describe('service events', () => {

  var events;

  beforeEach(angular.mock.module('bloggerFrontend'));

  beforeEach(inject(_events_ => {
    events = _events_;
  }));

  it('should define events for user login.', () => {
    expect(events.LOGIN_USER).toBeDefined();
    expect(events.LOGIN_USER_COMPLETE).toBeDefined();
    expect(events.LOGIN_USER_FAILED).toBeDefined();
    expect(events.LOGOUT_USER).toBeDefined();
    expect(events.LOGOUT_USER_COMPLETE).toBeDefined();
    expect(events.LOGOUT_USER_FAILED).toBeDefined();
  });

  it('should define events for http requests', () => {
    expect(events.HTTP_REQUEST).toBeDefined();
    expect(events.HTTP_RESPONSE).toBeDefined();
  });
});
