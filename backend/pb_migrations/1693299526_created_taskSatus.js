/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "dj8newfgy6tt0f2",
    "created": "2023-08-29 08:58:46.516Z",
    "updated": "2023-08-29 08:58:46.516Z",
    "name": "taskSatus",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7frac527",
        "name": "list",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "njclqrva",
        "name": "task",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "mazeo3qdpg9l9y0",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dj8newfgy6tt0f2");

  return dao.deleteCollection(collection);
})
