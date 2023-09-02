/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7la0aalov99471c")

  collection.listRule = "@request.auth.id = ''"
  collection.viewRule = "@request.auth.id = ''"
  collection.createRule = "@request.auth.id = ''"
  collection.updateRule = "@request.auth.id = ''"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2v6ftb3y",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7la0aalov99471c")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null

  // remove
  collection.schema.removeField("2v6ftb3y")

  return dao.saveCollection(collection)
})
