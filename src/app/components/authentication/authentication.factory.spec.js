describe('factory Authentication', () => {
  var module = angular.mock.module;
  var Messaging, Events, Authentication, $httpBackend, requestHandler, constants;

  // Set up the module
  beforeEach(module('bloggerFrontend'));

  // create mock for Messaging service
  beforeEach(() => {
    Messaging = {
      publish: () => {},
      subscribe: () => {}
    };
    spyOn(Messaging, 'subscribe');
    spyOn(Messaging, 'publish');
    // inject mock Messaging service
    module(($provide) => {
      $provide.value('Messaging', Messaging);
    });
  });

  // load global services
  beforeEach(inject(($injector) => {
      Events = $injector.get('Events');
      Authentication = $injector.get('Authentication');
      constants = $injector.get('constants');
    })
  );

  it('should be defined', () => {
    expect(Authentication).toBeDefined();
  });

  it("should expose it's API", () => {
    expect(typeof Authentication.login).toBe('function');
    expect(typeof Authentication.logout).toBe('function');
  });

  it('should subscribe to user login event', () => {
    expect(Messaging.subscribe.calls.argsFor(0)[0]).toEqual(Events.USER_LOGIN);
  });

  it('should subscribe to user logout event', () => {
    expect(Messaging.subscribe.calls.argsFor(1)[0]).toEqual(Events.USER_LOGOUT);
  });

  describe('login()', () => {

    beforeEach(inject(($injector) => {
      $httpBackend = $injector.get('$httpBackend');
      requestHandler = $httpBackend
        .expect('POST', constants.USER_LOGIN_URL)
        .respond({data: {username: 'user1'}});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make request to USER_LOGIN_URL when called', () => {
      Authentication.login('user1', 'password1');
      $httpBackend.flush();
    });

    it('should publish to USER_LOGIN_COMPLETE, upon success', () => {
      Authentication.login('user1', 'password1');
      $httpBackend.flush();
      expect(Messaging.publish).toHaveBeenCalled();
      expect(Messaging.publish.calls.argsFor(0)[0]).toEqual(Events.USER_LOGIN_COMPLETE);
      expect(Messaging.publish.calls.argsFor(0)[1][0].data).toEqual({data: {username: 'user1'}});
    });

    it('should publish to USER_LOGIN_FAILED, upon failure', () => {
      requestHandler.respond(401, 'failed login');
      Authentication.login('user1', 'password1');
      $httpBackend.flush();
      expect(Messaging.publish).toHaveBeenCalled();
      expect(Messaging.publish.calls.argsFor(0)[0]).toEqual(Events.USER_LOGIN_FAILED);
      expect(Messaging.publish.calls.argsFor(0)[1][0].data).toEqual('failed login');
    });
  });

  describe('logout()', () => {
    beforeEach(inject(($injector) => {
      $httpBackend = $injector.get('$httpBackend');
      requestHandler = $httpBackend
        .expect('POST', constants.USER_LOGOUT_URL)
        .respond('success');
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make request to USER_LOGOUT_URL when called', () => {
      Authentication.logout();
      $httpBackend.flush();
    });

    it('should publish to USER_LOGOUT_COMPLETE, upon success', () => {
      Authentication.logout();
      $httpBackend.flush();
      expect(Messaging.publish).toHaveBeenCalled();
      expect(Messaging.publish.calls.argsFor(0)[0]).toEqual(Events.USER_LOGOUT_COMPLETE);
      expect(Messaging.publish.calls.argsFor(0)[1][0].data).toEqual('success');
    });

    it('should publish to USER_LOGIN_FAILED, upon failure', () => {
      requestHandler.respond(401, 'failed');
      Authentication.logout();
      $httpBackend.flush();
      expect(Messaging.publish).toHaveBeenCalled();
      expect(Messaging.publish.calls.argsFor(0)[0]).toEqual(Events.USER_LOGOUT_FAILED);
      expect(Messaging.publish.calls.argsFor(0)[1][0].data).toEqual('failed');
    });
  });

});
