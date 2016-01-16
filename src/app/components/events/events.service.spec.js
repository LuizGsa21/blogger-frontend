describe('service Events', () => {

  var Events;

  beforeEach(angular.mock.module('bloggerFrontend'));

  beforeEach(inject(_Events_ => {
    Events = _Events_;
  }));

  it('should define Events for user login.', () => {
    expect(Events.USER_LOGIN).toBeDefined();
    expect(Events.USER_LOGIN_COMPLETE).toBeDefined();
    expect(Events.USER_LOGIN_FAILED).toBeDefined();
    expect(Events.USER_LOGOUT).toBeDefined();
    expect(Events.USER_LOGOUT_COMPLETE).toBeDefined();
    expect(Events.USER_LOGOUT_FAILED).toBeDefined();
  });

  it('should define Events for http requests', () => {
    expect(Events.HTTP_REQUEST).toBeDefined();
    expect(Events.HTTP_RESPONSE).toBeDefined();
  });
});
