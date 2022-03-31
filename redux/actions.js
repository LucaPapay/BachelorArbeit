import { ADD_TO_INVENTORIES, INIT, ADD_CATEGORY_TO_INVENTORIES, NEXT_ID, ADD_SUB_CATEGORY } from "./types";

export const addCategoryToInventories = (entry, id) => ({ type: ADD_CATEGORY_TO_INVENTORIES, newEntry: entry, id: id });
export const addEntryToCategory = (id, entry, parentId) => ({ type: ADD_TO_INVENTORIES, id: id, newEntry: entry, parentId: parentId });
export const addSubCategory = (id, entry, parentIds) => ({ type: ADD_SUB_CATEGORY, id: id, newEntry: entry, parentIds: parentIds });
export const initalState = () => ({ type: INIT });
export const nextId = () => ({ type: NEXT_ID });