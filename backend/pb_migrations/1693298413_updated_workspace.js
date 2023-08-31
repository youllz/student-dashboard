/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0w1prqbbllm6p85")

  // remove
  collection.schema.removeField("fsjwoirg")

  // remove
  collection.schema.removeField("cwkqiekp")

  // remove
  collection.schema.removeField("hzssmndn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "179pak9j",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 2,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4h7bm91u",
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
  const collection = dao.findCollectionByNameOrId("0w1prqbbllm6p85")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("179pak9j")

  // remove
  collection.schema.removeField("4h7bm91u")

  return dao.saveCollection(collection)
})
