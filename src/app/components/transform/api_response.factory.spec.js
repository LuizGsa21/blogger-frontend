describe('service TransformApiResponse', () => {
  let _fixture, TransformApiResponse, Model;

  beforeEach(angular.mock.module('services'));

  beforeEach(inject(($window, _TransformApiResponse_, _Model_) => {
    _fixture = $window.fixtures.getArticle3();
    TransformApiResponse = _TransformApiResponse_;
    Model = _Model_;
    spyOn(Model, 'update').and.callThrough();
    TransformApiResponse(angular.toJson(_fixture));
  }));

  it('should use `Model.update` to transform response.', () => {
    expect(Model.update).toHaveBeenCalledWith(_fixture['data']);
    expect(Model.update).toHaveBeenCalledWith(_fixture['included']);
    expect(Model.update.calls.count()).toEqual(2);
  });

});
