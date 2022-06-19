import {
  ADD_TO_INVENTORIES,
  INIT,
  ADD_ITEMGROUP_TO_INVENTORIES,
  NEXT_ID,
  ADD_SUB_ITEMGROUP,
  ADD_NEW_CATEGORY,
  EDIT_ITEMGROUP_ENTRY,
  ADD_LOW_STOCK_ENTRY,
  DELETE_LOW_STOCK_ENTRY,
  DELETE_ITEM_GROUP,
  DELETE_ENTRY,
  ADD_SUB_ITEMGROUP_WITHOUT_PARENTIDS,
} from "./types";

export const addItemGroupToInventories = (entry, id) => ({
  type: ADD_ITEMGROUP_TO_INVENTORIES,
  newEntry: entry,
  id: id,
});
export const addEntryToItemGroup = (id, entry, parentIds, parameters, icon) => ({
  type: ADD_TO_INVENTORIES,
  id: id,
  newEntry: entry,
  parentIds: parentIds,
  parameters: parameters,
  icon: icon,
});
export const addSubItemGroup = (id, entry, parentIds) => ({
  type: ADD_SUB_ITEMGROUP,
  id: id,
  newEntry: entry,
  parentIds: parentIds,
});
export const addSubItemGroupWithoutParentIds = (id, entry, parentIds) => ({
  type: ADD_SUB_ITEMGROUP_WITHOUT_PARENTIDS,
  id: id,
  newEntry: entry,
  parentIds: parentIds,
});
export const addNewCategory = (id, name, parameters, iconName) => ({
  type: ADD_NEW_CATEGORY,
  id: id,
  name: name,
  parameters: parameters,
  iconName: iconName,
});
export const editItemGroupEntry = (id, editedEntry) => ({
  type: EDIT_ITEMGROUP_ENTRY,
  id: id,
  editedEntry: editedEntry,
});
export const addLowStockEntry = (entryName, entryId, entryParentIds) => ({
  type: ADD_LOW_STOCK_ENTRY,
  entryId: entryId,
  entryName: entryName,
  entryParentIds: entryParentIds,
});
export const deleteLowStockEntry = (entryId) => ({
  type: DELETE_LOW_STOCK_ENTRY,
  entryId: entryId,
});

export const deleteItemGroup = (id, parentIds) => ({
  type: DELETE_ITEM_GROUP,
  id: id,
  parentIds: parentIds,
});

export const deleteEntry = (id, parentIds) => ({
  type: DELETE_ENTRY,
  id: id,
  parentIds: parentIds,
});

export const initalState = () => ({ type: INIT });
export const nextId = () => ({ type: NEXT_ID });
