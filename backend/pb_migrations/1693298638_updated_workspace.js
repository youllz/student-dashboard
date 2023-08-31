/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0w1prqbbllm6p85")

  collection.name = "workspaces"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0w1prqbbllm6p85")

  collection.name = "workspace"

  return dao.saveCollection(collection)
})
