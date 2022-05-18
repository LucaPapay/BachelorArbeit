class InventoryItemGroup {
  constructor(name, id, parentIds) {
    this.id = id;
    this.name = name;
    this.subItemGroups = [];
    this.data = [];
    this.parentIds = parentIds;
  }
}

class InventoryEntry {
  constructor(name, id, parentIds, parameters, icon) {
    this.id = id;
    this.name = name;
    this.parentIds = parentIds;
    this.parameters = parameters;
    this.icon = icon;
  }
}

class Parameter {
  constructor(name, type, value) {
    this.name = name;
    this.type = type;
    this.value = value;
  }
}

class Category {
  constructor(name, id, parameters, icon) {
    this.name = name;
    this.id = id;
    this.parameters = parameters;
    this.icon = icon;
  }
}

class LowStockEntry {
  constructor(entryName, entryId, entryParentIds) {
    this.entryName = entryName;
    this.entryId = entryId;
    this.entryParentIds = entryParentIds;
  }
}

export { InventoryItemGroup, InventoryEntry, Parameter, Category, LowStockEntry };
