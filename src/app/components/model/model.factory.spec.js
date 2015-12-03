'use strict';
describe('service model', function() {

  var _fixture, Model;

  beforeEach(angular.mock.module('bloggerFrontend'));

  beforeEach(inject(($window, _model_) => {
    _fixture = $window.fixtures.getArticle3();
    Model = _model_;
    Model.update(_fixture['data']);
    Model.update(_fixture['included']);
  }));

  it('should expose the expected api', () => {
    expect(Model.get).toEqual(jasmine.any(Function));
    expect(Model.update).toEqual(jasmine.any(Function));
  });


  describe('get() method', () => {
    it('should be able to fetch resources by type', () => {
      var articles = Model.get('articles');
      expect(articles).toBeDefined();
      expect(articles.length).toBe(3);
      expect(Model.get('articles', 1).type).toBe('articles');
      expect(Model.get('categories', 1).type).toBe('categories');
      expect(Model.get('users', 1).type).toBe('users');
    });

    it('should be able to fetch resource by id', () => {
      expect(Model.get('categories', 1).id).toBe("1");
      expect(Model.get('users', 1).id).toBe("1");
      expect(Model.get('articles', 3).id).toBe("3");
    });
  });

  describe('update() method', () => {
    it('should return an array when an array is passed', () => {
      expect(Model.update([])).toEqual(jasmine.any(Array));
    });

    it('should return an object when an object is passed', () => {
      expect(Model.update({})).toEqual(jasmine.any(Object));
    });
  });


  describe('representation', () => {

    it("should have access to its attributes", () => {
      var article = Model.get('articles', 3);
      expect(article.id).toEqual('3');
      expect(article.title).toBe('Article #2');

      var category = Model.get('categories', 1);
      expect(category.id).toEqual('1');
      expect(category.name).toBe('PHP');
    });

    it("can reference its relationships", () => {
      var article = Model.get('articles', 3);
      expect(article.category('name')).toEqual('PHP');
      var category = Model.get('categories', 1);
      expect(category.articles().length).toBe(3);
    });

    it('should be able to reference itself from within its relationship', () => {
      var category = Model.get('categories', 1);
      expect(category.articles(2).user().articles(2).category('name')).toBe(category.name);
      expect(category.articles(2).category('name')).toBe(category.name);
    });
  });
});
