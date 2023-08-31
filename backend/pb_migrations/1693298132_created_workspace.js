/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "0w1prqbbllm6p85",
    "created": "2023-08-29 08:35:32.790Z",
    "updated": "2023-08-29 08:35:32.790Z",
    "name": "workspace",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wonlhcdg",
        "name": "beginning_of_the_year",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "rpeblrn0",
        "name": "end_of_the_year",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "fsjwoirg",
        "name": "session",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "cwkqiekp",
        "name": "beginning_of_the_session",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "hzssmndn",
        "name": "end_of_the_session",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
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
  const collection = dao.findCollectionByNameOrId("0w1prqbbllm6p85");

  return dao.deleteCollection(collection);
})
