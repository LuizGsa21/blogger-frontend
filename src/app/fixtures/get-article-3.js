var fixtures = window.fixtures || (window.fixtures = {});
fixtures.getArticle3 = () => {
  return {
    "data": {
      "attributes": {
        "body": "Article body 2",
        "dateCreated": "2015-11-15T17:41:47.462437",
        "lastModified": "2015-11-15T17:41:47.462472",
        "slug": null,
        "status": null,
        "title": "Article #2"
      },
      "id": "3",
      "links": {
        "self": "http://localhost:7001/api/v1/articles/3"
      },
      "relationships": {
        "category": {
          "data": {
            "id": "1",
            "type": "categories"
          },
          "links": {
            "related": "http://localhost:7001/api/v1/categories/1"
          }
        },
        "comments": {
          "data": [],
          "links": {
            "related": "http://localhost:7001/api/v1/comments"
          }
        },
        "user": {
          "data": {
            "id": "1",
            "type": "users"
          },
          "links": {
            "related": "http://localhost:7001/api/v1/users/1"
          }
        }
      },
      "type": "articles"
    },
    "included": [
      {
        "attributes": {
          "name": "PHP"
        },
        "id": "1",
        "links": {
          "self": "http://localhost:7001/api/v1/categories/1"
        },
        "relationships": {
          "articles": {
            "data": [
              {
                "id": "1",
                "type": "articles"
              },
              {
                "id": "2",
                "type": "articles"
              },
              {
                "id": "3",
                "type": "articles"
              }
            ],
            "links": {
              "related": "http://localhost:7001/api/v1/articles"
            }
          }
        },
        "type": "categories"
      },
      {
        "attributes": {
          "avatarPath": "avatar.jpg",
          "dateJoined": "2015-11-15T17:41:47.450270",
          "firstName": "Jimmy0",
          "lastName": "builder0",
          "role": "user",
          "username": "bob0"
        },
        "id": "1",
        "links": {
          "self": "http://localhost:7001/api/v1/users/1"
        },
        "relationships": {
          "articles": {
            "data": [
              {
                "id": "1",
                "type": "articles"
              },
              {
                "id": "2",
                "type": "articles"
              },
              {
                "id": "3",
                "type": "articles"
              }
            ],
            "links": {
              "related": "http://localhost:7001/api/v1/articles"
            }
          },
          "comments": {
            "data": [],
            "links": {
              "related": "http://localhost:7001/api/v1/comments"
            }
          }
        },
        "type": "users"
      }
    ]
  }
};
