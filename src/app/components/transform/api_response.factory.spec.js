describe('service TransformApiResponse', () => {
  let _fixture, TransformApiResponse;

  beforeEach(angular.mock.module('bloggerFrontend'));

  beforeEach(inject((_TransformApiResponse_, _Model_) => {
    _fixture = $window.fixtures.getArticle3();
    TransformApiResponse = _TransformApiResponse_;
    Model = _Model_;
    spyOn(Model, 'update').and.callThrough();
    result = TransformApiResponse(JSON.stringify(_fixture));
  }));

  it('should use `model.update` to transform response.', () => {
    expect(Model.update).toHaveBeenCalledWith(_fixture['data']);
    expect(Model.update).toHaveBeenCalledWith(_fixture['included']);
    expect(Model.update.calls.count()).toEqual(2);
  });

});
