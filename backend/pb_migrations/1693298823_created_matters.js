/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "7la0aalov99471c",
    "created": "2023-08-29 08:47:03.318Z",
    "updated": "2023-08-29 08:47:03.318Z",
    "name": "matters",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "e0pim18w",
        "name": "nme",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("7la0aalov99471c");

  return dao.deleteCollection(collection);
})
