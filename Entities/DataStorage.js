class InventoryCategory {
  constructor(name, id, parentIds) {
    this.id = id;
    this.name = name;
    this.subCategories = [];
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

export { InventoryCategory, InventoryEntry, Parameter };
