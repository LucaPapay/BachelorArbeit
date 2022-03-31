import { ADD_CATEGORY_TO_INVENTORIES, ADD_TO_INVENTORIES, INIT, NEXT_ID, ADD_SUB_CATEGORY } from "./types";
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
        state: null,
    }
}

function nextId(state) {
    return {
        ...state,
        idCounter: state.idCounter + 1
    }
}

function addNewCategory(state, action) {
    let newCategory = new InventoryCategory(action.newEntry, action.id, []);
    return {
        ...state,
        data: [...state.data, newCategory]
    }
}

function addNewEntryToCategory(state, action) {
    let newEntry = new InventoryEntry(action.newEntry, action.id);
    return {
        ...state,
        data: state.data.map((item) => {
            if (item.id != action.parentId) {
                return item
            }
            return {
                ...item,
                data: item.data.concat(newEntry)
            }
        })
    }
}

const recursiveUpdate = (
    subCategories,
    parentIds,
    id,
    newName,
    parentIdsCopy,
) => {
    const recur = (subCategories, parentIds, id, newName, parentIdsCopy) => {
        //found parent
        if (parentIds.length === 1) {
            let x = new InventoryCategory(newName, id, parentIdsCopy);
            return subCategories.map((element) =>
                element.id === parentIds[0]
                    ? { ...element, subCategories: element.subCategories.concat(x) }
                    : element
            );
        }
        const currentParent = parentIds[0];
        //recursively traverse n-tree
        return subCategories.map((element) =>
            element.id === currentParent
                ? {
                    ...element,
                    subCategories: recursiveUpdate(
                        element.subCategories,
                        parentIds.slice(1),
                        id,
                        newName,
                        parentIdsCopy
                    ),
                }
                : element
        );
    };
    return recur(subCategories, parentIds, id, newName, parentIdsCopy);
};

function addSubCategory(state, action) {
    let parentIds = action.parentIds;
    if (parentIds.length === 1) {
        let newEntry = new InventoryCategory(action.newEntry, action.id, action.parentIds);
        return {
            ...state,
            data: state.data.map((item) => {
                if (item.id != parentIds[0]) {
                    return item
                }
                return {
                    ...item,
                    subCategories: item.subCategories.concat(newEntry)
                }
            })
        }
    } else {
        return {
            ...state,
            data: recursiveUpdate(
                state.data,
                parentIds,
                action.id,
                action.newEntry,
                parentIds
            ),
        };
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
        case ADD_SUB_CATEGORY:
            return addSubCategory(state, action);
        case NEXT_ID:
            return nextId(state);
        default:
            return state;
    }
}

export default reducer;