describe('service events', () => {

  var events;

  beforeEach(angular.mock.module('bloggerFrontend'));

  beforeEach(inject(_events_ => {
    events = _events_;
  }));

  it('should define events for user login.', () => {
    expect(events.USER_LOGIN).toBeDefined();
    expect(events.USER_LOGIN_COMPLETE).toBeDefined();
    expect(events.USER_LOGIN_FAILED).toBeDefined();
    expect(events.USER_LOGOUT).toBeDefined();
    expect(events.USER_LOGOUT_COMPLETE).toBeDefined();
    expect(events.USER_LOGOUT_FAILED).toBeDefined();
  });

  it('should define events for http requests', () => {
    expect(events.HTTP_REQUEST).toBeDefined();
    expect(events.HTTP_RESPONSE).toBeDefined();
  });
});
