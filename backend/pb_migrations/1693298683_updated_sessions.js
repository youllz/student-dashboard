/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("af6tf7pnh16hnkd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2qrosxaw",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("af6tf7pnh16hnkd")

  // remove
  collection.schema.removeField("2qrosxaw")

  return dao.saveCollection(collection)
})
