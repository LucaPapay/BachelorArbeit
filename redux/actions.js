import { ADD_TO_INVENTORIES, INIT, ADD_ITEMGROUP_TO_INVENTORIES, NEXT_ID, ADD_SUB_ITEMGROUP } from "./types";

export const addItemGroupToInventories = (entry, id) => ({
  type: ADD_ITEMGROUP_TO_INVENTORIES,
  newEntry: entry,
  id: id,
});
export const addEntryToItemGroup = (id, entry, parentIds, parameters) => ({
  type: ADD_TO_INVENTORIES,
  id: id,
  newEntry: entry,
  parentIds: parentIds,
  parameters: parameters,
});
export const addSubItemGroup = (id, entry, parentIds) => ({
  type: ADD_SUB_ITEMGROUP,
  id: id,
  newEntry: entry,
  parentIds: parentIds,
});
export const initalState = () => ({ type: INIT });
export const nextId = () => ({ type: NEXT_ID });
