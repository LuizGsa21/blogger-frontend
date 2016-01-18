/**
 * @ngdoc service
 * @name services.Model
 *
 * @description
 * All application resources are cached within the Model.
 */
export function Model() {
  var ng = angular,
    /**
     * The resources are stored in the following manner:
     *  _cache[RESOURCE_TYPE][RESOURCE_ID]
     *
     * RESOURCE_TYPE
     * @type {Object}
     * @private
     */
    _cache = {};

  /**
   * Adds the relationships to the cachedResource
   * @param {Object} cachedResource cached resource to be updated
   * @param {Object} relationships a {@link http://jsonapi.org/format/1.0/#document-resource-object-relationships relationship} object
   */
  function setRelationships(cachedResource, relationships) {
    ng.forEach(relationships, (obj, relationshipName) => {
      var resourceLinkage = obj.data;
      // update and retrieve relationship object from cache
      if (ng.isArray(resourceLinkage))
        obj = resourceLinkage.map(update);
      else
        obj = update(resourceLinkage);

      // wrap object relationship in a function to prevent circular reference.
      cachedResource[relationshipName] = (attrName) => {
        if (attrName)
          return obj[attrName];
        else return obj;
      };

    });

  }

  /**
   * Updates the Model's cache and returns the newly formatted resource.
   * @param {Object} resource a {@link http://jsonapi.org/format/#document-resource-objects resource}
   * @returns {Object} the formatted resource
   */
  function update(resource) {
    // get the _cache[RESOURCE_TYPE], create it if it doesn't exist
    let cachedResourceType = (_cache[resource.type]) || (_cache[resource.type] = {}),
    // get cached resource
      cachedResource = cachedResourceType[resource.id];

    if ( ! cachedResource) {
      cachedResource = cachedResourceType[resource.id] = {};
      // a newly created resource should have the id and type attributes
      cachedResource.id = resource.id;
      cachedResource.type = resource.type;
    }
    // update attributes
    if (resource.attributes)
      ng.extend(cachedResource, resource.attributes);

    // update links
    if (resource.links)
      ng.extend(cachedResource, resource.links);

    // update relationships
    if (resource.relationships)
      setRelationships(cachedResource, resource.relationships);

    return cachedResource;
  }

  return {
    /**
     * @ngdoc method
     * @name update
     * @methodOf services.Model
     *
     * @description
     * Updates the Model's cache and returns the newly formatted resource or resources.
     *
     * @param {Object|Array} resource a {@link http://jsonapi.org/format/#document-resource-objects resource}
     * or an array of {@link http://jsonapi.org/format/#document-resource-objects resources}.
     *
     * @returns {Object|Array} the formatted resource or resources.
     */
    update: (resource) => {
      // update and return resources
      if (ng.isArray(resource)) return resource.map(update);
      // update and return resource
      else return update(resource);
    },
    /**
     * @ngdoc method
     * @name get
     * @methodOf services.Model
     *
     * @description
     * Returns the cached resource or resources.
     *
     * @param {String} type a resource type
     * @param {Number=} id resource id
     *
     * @returns {Object|Array} the cached resource or resources.
     */
    get: (type, id) => {
      var cachedResourceType = _cache[type];

      // return resource by id
      if (ng.isNumber(id)) return cachedResourceType[id];

      // return resources
      return Object.keys(cachedResourceType).map((key) => cachedResourceType[key]);
    }
  };
}
