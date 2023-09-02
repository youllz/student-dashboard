/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qkembvrv08phku2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "22mjlxms",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pfsxo3ua",
    "name": "date",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sccmbp20",
    "name": "factor",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 5
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "savpoaqw",
    "name": "note",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 20
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qkembvrv08phku2")

  // remove
  collection.schema.removeField("22mjlxms")

  // remove
  collection.schema.removeField("pfsxo3ua")

  // remove
  collection.schema.removeField("sccmbp20")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
