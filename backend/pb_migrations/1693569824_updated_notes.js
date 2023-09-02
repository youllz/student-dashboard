/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qkembvrv08phku2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pyjdslkf",
    "name": "type",
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
  const collection = dao.findCollectionByNameOrId("qkembvrv08phku2")

  // remove
  collection.schema.removeField("pyjdslkf")

  return dao.saveCollection(collection)
})
