import { ADD_CATEGORY_TO_INVENTORIES, ADD_TO_INVENTORIES, INIT, NEXT_ID } from "./types";
import { InventoryCategory, InventoryEntry } from "../Entities/DataStorage";


const initalState = {
    data: [],
    idCounter: 1,
}

function setInitial(state) {
    return {
        ...state,
        data: [],
        idCounter: 1,
    }
}

function nextId(state) {
    return {
        ...state,
        idCounter: state.idCounter + 1
    }
}

function addNewCategory(state, action) {
    let newCategory = new InventoryCategory(action.newEntry, action.id, 0);
    console.log(newCategory);
    return {
        ...state,
        data: [...state.data, newCategory]
    }
}

function addNewEntryToCategory(state, action) {
    return {
        ...state,
        data: state.data.map((item) => {
            if (item.title != action.title) {
                return item
            }
            return {
                ...item,
                data: item.data.concat(action.newEntry)
            }
        })
    }
}

function reducer(state = initalState, action) {
    switch (action.type) {
        case INIT:
            return setInitial(state);
        case ADD_CATEGORY_TO_INVENTORIES:
            return addNewCategory(state, action);
        case ADD_TO_INVENTORIES:
            return addNewEntryToCategory(state, action);
        case NEXT_ID:
            return nextId(state);
        default:
            return state;
    }
}

export default reducer;