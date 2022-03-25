import { ADD_TO_INVENTORIES, INIT, ADD_CATEGORY_TO_INVENTORIES, NEXT_ID } from "./types";

export const addCategoryToInventories = (entry, id) => ({ type: ADD_CATEGORY_TO_INVENTORIES, newEntry: entry, id: id });
export const addEntryToCategory = (title, entry) => ({ type: ADD_TO_INVENTORIES, title: title, newEntry: entry });
export const initalState = () => ({ type: INIT });
export const nextId = () => ({ type: NEXT_ID });