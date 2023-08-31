/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("af6tf7pnh16hnkd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xfxe9hhr",
    "name": "workspace",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "0w1prqbbllm6p85",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xfxe9hhr",
    "name": "workpace",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "0w1prqbbllm6p85",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
