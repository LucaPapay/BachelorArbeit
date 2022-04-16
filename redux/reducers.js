import { ADD_ITEMGROUP_TO_INVENTORIES, ADD_TO_INVENTORIES, INIT, NEXT_ID, ADD_SUB_ITEMGROUP } from "./types";
import { InventoryItemGroup, InventoryEntry } from "../Entities/DataStorage";

const initalState = {
  data: [],
  idCounter: 1,
};

function setInitial(state) {
  return {
    ...state,
    data: [],
    idCounter: 1,
    state: null,
  };
}

function nextId(state) {
  return {
    ...state,
    idCounter: state.idCounter + 1,
  };
}

function addNewItemGroup(state, action) {
  let newItemGroup = new InventoryItemGroup(action.newEntry, action.id, []);
  return {
    ...state,
    data: [...state.data, newItemGroup],
  };
}

const recursiveAddInventoryEntry = (subItemGroups, parentIds, action, parentIdsCopy) => {
  const recur = (subItemGroups, parentIds, action, parentIdsCopy) => {
    //found parent
    if (parentIds.length === 1) {
      let newInventoryEntry = new InventoryEntry(action.newEntry, action.id, parentIdsCopy, action.parameters);
      return subItemGroups.map((element) =>
        element.id === parentIds[0] ? { ...element, data: element.data.concat(newInventoryEntry) } : element
      );
    }
    const currentParent = parentIds[0];
    //recursively traverse n-tree
    return subItemGroups.map((element) =>
      element.id === currentParent
        ? {
            ...element,
            subItemGroups: recursiveAddInventoryEntry(element.subItemGroups, parentIds.slice(1), action, parentIdsCopy),
          }
        : element
    );
  };
  return recur(subItemGroups, parentIds, action, parentIdsCopy);
};

function addNewEntryToItemGroup(state, action) {
  let parentIds = action.parentIds;
  if (parentIds.length === 1) {
    let newEntry = new InventoryEntry(action.newEntry, action.id, action.parentIds, action.parameters);
    return {
      ...state,
      data: state.data.map((item) => {
        if (item.id != parentIds[0]) {
          return item;
        }
        return {
          ...item,
          data: item.data.concat(newEntry),
        };
      }),
    };
  } else {
    return {
      ...state,
      data: recursiveAddInventoryEntry(state.data, parentIds, action, parentIds),
    };
  }
}

const recursiveAddSubItemGroup = (subItemGroups, parentIds, id, newName, parentIdsCopy) => {
  const recur = (subItemGroups, parentIds, id, newName, parentIdsCopy) => {
    //found parent
    if (parentIds.length === 1) {
      let newSubItemGroup = new InventoryItemGroup(newName, id, parentIdsCopy);
      return subItemGroups.map((element) =>
        element.id === parentIds[0]
          ? { ...element, subItemGroups: element.subItemGroups.concat(newSubItemGroup) }
          : element
      );
    }
    const currentParent = parentIds[0];
    //recursively traverse n-tree
    return subItemGroups.map((element) =>
      element.id === currentParent
        ? {
            ...element,
            subItemGroups: recursiveAddSubItemGroup(
              element.subItemGroups,
              parentIds.slice(1),
              id,
              newName,
              parentIdsCopy
            ),
          }
        : element
    );
  };
  return recur(subItemGroups, parentIds, id, newName, parentIdsCopy);
};

function addSubItemGroup(state, action) {
  let parentIds = action.parentIds;
  if (parentIds.length === 1) {
    let newSubItemGroup = new InventoryItemGroup(action.newEntry, action.id, action.parentIds);
    return {
      ...state,
      data: state.data.map((item) => {
        if (item.id != parentIds[0]) {
          return item;
        }
        return {
          ...item,
          subItemGroups: item.subItemGroups.concat(newSubItemGroup),
        };
      }),
    };
  } else {
    return {
      ...state,
      data: recursiveAddSubItemGroup(state.data, parentIds, action.id, action.newEntry, parentIds),
    };
  }
}

function reducer(state = initalState, action) {
  switch (action.type) {
    case INIT:
      return setInitial(state);
    case ADD_ITEMGROUP_TO_INVENTORIES:
      return addNewItemGroup(state, action);
    case ADD_TO_INVENTORIES:
      return addNewEntryToItemGroup(state, action);
    case ADD_SUB_ITEMGROUP:
      return addSubItemGroup(state, action);
    case NEXT_ID:
      return nextId(state);
    default:
      return state;
  }
}

export default reducer;
