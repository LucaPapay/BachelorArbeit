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
  constructor(name, id, parentIds, parameters) {
    this.id = id;
    this.name = name;
    this.parentIds = parentIds;
    this.parameters = parameters;
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

export { InventoryItemGroup, InventoryEntry, Parameter, Category };
