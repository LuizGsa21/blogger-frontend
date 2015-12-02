describe('factory authentication', () => {
  var module = angular.mock.module;
  var messaging, events, authentication, $httpBackend, requestHandler, constants;

  // Set up the module
  beforeEach(module('bloggerFrontend'));

  // create mock for messaging service
  beforeEach(() => {
    messaging = {
      publish: () => {},
      subscribe: () => {}
    };
    spyOn(messaging, 'subscribe');
    spyOn(messaging, 'publish');
    // inject mock messaging service
    module(($provide) => {
      $provide.value('messaging', messaging);
    });
  });

  // load global services
  beforeEach(inject(($injector) => {
      events = $injector.get('events');
      authentication = $injector.get('authentication');
      constants = $injector.get('constants');
    })
  );

  it('should be defined', () => {
    expect(authentication).toBeDefined();
  });

  it("should expose it's API", () => {
    expect(typeof authentication.login).toBe('function');
    expect(typeof authentication.logout).toBe('function');
  });

  it('should subscribe to user login event', () => {
    expect(messaging.subscribe.calls.argsFor(0)[0]).toEqual(events.USER_LOGIN);
  });

  it('should subscribe to user logout event', () => {
    expect(messaging.subscribe.calls.argsFor(1)[0]).toEqual(events.USER_LOGOUT);
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
      authentication.login('user1', 'password1');
      $httpBackend.flush();
    });

    it('should publish to USER_LOGIN_COMPLETE, upon success', () => {
      authentication.login('user1', 'password1');
      $httpBackend.flush();
      expect(messaging.publish).toHaveBeenCalled();
      expect(messaging.publish.calls.argsFor(0)[0]).toEqual(events.USER_LOGIN_COMPLETE);
      expect(messaging.publish.calls.argsFor(0)[1][0].data).toEqual({data: {username: 'user1'}});
    });

    it('should publish to USER_LOGIN_FAILED, upon failure', () => {
      requestHandler.respond(401, 'failed login');
      authentication.login('user1', 'password1');
      $httpBackend.flush();
      expect(messaging.publish).toHaveBeenCalled();
      expect(messaging.publish.calls.argsFor(0)[0]).toEqual(events.USER_LOGIN_FAILED);
      expect(messaging.publish.calls.argsFor(0)[1][0].data).toEqual('failed login');
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
      authentication.logout();
      $httpBackend.flush();
    });

    it('should publish to USER_LOGOUT_COMPLETE, upon success', () => {
      authentication.logout();
      $httpBackend.flush();
      expect(messaging.publish).toHaveBeenCalled();
      expect(messaging.publish.calls.argsFor(0)[0]).toEqual(events.USER_LOGOUT_COMPLETE);
      expect(messaging.publish.calls.argsFor(0)[1][0].data).toEqual('success');
    });

    it('should publish to USER_LOGIN_FAILED, upon failure', () => {
      requestHandler.respond(401, 'failed');
      authentication.logout();
      $httpBackend.flush();
      expect(messaging.publish).toHaveBeenCalled();
      expect(messaging.publish.calls.argsFor(0)[0]).toEqual(events.USER_LOGOUT_FAILED);
      expect(messaging.publish.calls.argsFor(0)[1][0].data).toEqual('failed');
    });
  });

});
