export function model() {
  var _cache = {}, ng = angular;

  /**
   * Example of a relationship object:
   *  - http://jsonapi.org/format/1.0/#document-resource-object-relationships
   * @param resource
   * @param relationships
   */
  function setRelationships(resource, relationships) {
    ng.forEach(relationships, (obj, relationshipName) => {
      var resourceLinkage = obj.data;
      // update and retrieve relationship object from cache
      if (ng.isArray(resourceLinkage))
        obj = resourceLinkage.map(update);
      else
        obj = update(resourceLinkage);

      // wrap object relationship in a function to prevent circular reference.
      resource[relationshipName] = (attrName) => {
        if (attrName)
          return obj[attrName];
        else return obj;
      };

    }, resource);

  }

  function createResource(model, resource) {
    let cachedResource = model[resource.id] = {};
    // a newly created resource should have the id and type attributes
    cachedResource.id = resource.id;
    cachedResource.type = resource.type;
    return cachedResource;
  }

  function updateCachedResource(cachedResource, resource) {

    if (resource.attributes)
      ng.extend(cachedResource, resource.attributes);

    if (resource.links)
      ng.extend(cachedResource, resource.links);

    if (resource.relationships)
      setRelationships(cachedResource, resource.relationships);

    return cachedResource;
  }

  function update(resource) {
    // get model type, create it if it doesn't exist
    let model = (_cache[resource.type]) || (_cache[resource.type] = {}),
      cachedResource = model[resource.id]; // get cached resource

    if (!cachedResource)
      cachedResource = createResource(model, resource);

    return updateCachedResource(cachedResource, resource);
  }

  return {
    update: (models) => {
      // update and return resources
      if (ng.isArray(models)) return models.map(update);
      // update and return resource
      else return update(models);
    },
    get: (type, id) => {
      var model = _cache[type];

      // return resource by id
      if (ng.isNumber(id)) return _cache[type][id];

      // return resources
      return Object.keys(model).map((key) => model[key]);
    }
  };
}
