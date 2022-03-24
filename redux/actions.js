import { ADD_TO_INVENTORIES, INIT, ADD_CATEGORY_TO_INVENTORIES } from "./types";

export const addCategoryToInventories = (entry) => ({ type: ADD_CATEGORY_TO_INVENTORIES, newEntry: entry });
export const addEntryToCategory = (title, entry) => ({ type: ADD_TO_INVENTORIES, title: title, newEntry: entry });
export const initalState = () => ({ type: INIT });