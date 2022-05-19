import {
  ADD_ITEMGROUP_TO_INVENTORIES,
  ADD_TO_INVENTORIES,
  INIT,
  NEXT_ID,
  ADD_SUB_ITEMGROUP,
  ADD_NEW_CATEGORY,
  EDIT_ITEMGROUP_ENTRY,
  ADD_LOW_STOCK_ENTRY,
  DELETE_LOW_STOCK_ENTRY,
  DELETE_ITEM_GROUP,
  DELETE_ENTRY,
} from "./types";
import { InventoryItemGroup, InventoryEntry, Category, LowStockEntry } from "../Entities/DataStorage";

const initalState = {
  data: [],
  idCounter: 1,
  categories: [],
  lowStockEntrys: [],
};

function setInitial(state) {
  return {
    ...state,
    data: [],
    idCounter: 1,
    categories: [],
    lowStockEntrys: [],
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

const swapMatchingEntry = (data, action) => {
  return data.map((dataEntry) => (dataEntry.id === action.id ? action.editedEntry : dataEntry));
};

const recursiveEditInventoryEntry = (subItemGroups, parentIds, action) => {
  const recur = (subItemGroups, parentIds, action) => {
    //found parent
    if (parentIds.length === 1) {
      return subItemGroups.map((element) =>
        element.id === parentIds[0]
          ? {
              ...element,
              data: swapMatchingEntry(element.data, action),
            }
          : element
      );
    }
    const currentParent = parentIds[0];
    //recursively traverse n-tree
    return subItemGroups.map((element) =>
      element.id === currentParent
        ? {
            ...element,
            subItemGroups: recursiveEditInventoryEntry(element.subItemGroups, parentIds.slice(1), action),
          }
        : element
    );
  };
  return recur(subItemGroups, parentIds, action);
};

function editItemGroupEntry(state, action) {
  let parentIds = action.editedEntry.parentIds;
  return {
    ...state,
    data: recursiveEditInventoryEntry(state.data, parentIds, action),
  };
}

const recursiveAddInventoryEntry = (subItemGroups, parentIds, action, parentIdsCopy) => {
  const recur = (subItemGroups, parentIds, action, parentIdsCopy) => {
    //found parent
    if (parentIds.length === 1) {
      let newInventoryEntry = new InventoryEntry(
        action.newEntry,
        action.id,
        parentIdsCopy,
        action.parameters,
        action.icon
      );
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
    let newEntry = new InventoryEntry(action.newEntry, action.id, action.parentIds, action.parameters, action.icon);
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

function addNewCategory(state, action) {
  let newCategory = new Category(action.name, action.id, action.parameters, action.iconName);
  return {
    ...state,
    categories: [...state.categories, newCategory],
  };
}

function addNewLowStockEntry(state, action) {
  let newLowStockEntry = new LowStockEntry(action.entryName, action.entryId, action.entryParentIds);
  if (state.lowStockEntrys.some((e) => e.entryId === action.entryId)) {
    return state;
  } else {
    return {
      ...state,
      lowStockEntrys: [...state.lowStockEntrys, newLowStockEntry],
    };
  }
}

function deleteLowStockEntry(state, action) {
  return {
    ...state,
    lowStockEntrys: state.lowStockEntrys.filter((e) => e.entryId !== action.entryId),
  };
}

const recursiveDeleteSubItemGroup = (subItemGroups, parentIds, id) => {
  const recur = (subItemGroups, parentIds, id) => {
    //found parent
    if (parentIds.length === 0) {
      return subItemGroups.filter((e) => e.id !== id);
    }
    const currentParent = parentIds[0];
    //recursively traverse n-tree
    return subItemGroups.map((element) =>
      element.id === currentParent
        ? {
            ...element,
            subItemGroups: recursiveDeleteSubItemGroup(element.subItemGroups, parentIds.slice(1), id),
          }
        : element
    );
  };
  return recur(subItemGroups, parentIds, id);
};

function deleteItemGroup(state, action) {
  let parentIds = action.parentIds;
  if (parentIds.length === 0) {
    return {
      ...state,
      data: state.data.filter((e) => e.id !== action.id),
    };
  }
  if (parentIds.length === 1) {
    return {
      ...state,
      data: state.data.map((item) => {
        if (item.id != parentIds[0]) {
          return item;
        }
        return {
          ...item,
          subItemGroups: item.subItemGroups.filter((e) => e.id !== action.id),
        };
      }),
    };
  } else {
    return {
      ...state,
      data: recursiveDeleteSubItemGroup(state.data, parentIds, action.id),
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
    case ADD_NEW_CATEGORY:
      return addNewCategory(state, action);
    case EDIT_ITEMGROUP_ENTRY:
      return editItemGroupEntry(state, action);
    case ADD_LOW_STOCK_ENTRY:
      return addNewLowStockEntry(state, action);
    case DELETE_LOW_STOCK_ENTRY:
      return deleteLowStockEntry(state, action);
    case DELETE_ITEM_GROUP:
      return deleteItemGroup(state, action);
    default:
      return state;
  }
}

export default reducer;
