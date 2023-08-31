/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "qkembvrv08phku2",
    "created": "2023-08-29 08:49:26.073Z",
    "updated": "2023-08-29 08:49:26.073Z",
    "name": "notes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "savpoaqw",
        "name": "note",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "96lmuzho",
        "name": "matter",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "7la0aalov99471c",
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
  const collection = dao.findCollectionByNameOrId("qkembvrv08phku2");

  return dao.deleteCollection(collection);
})
