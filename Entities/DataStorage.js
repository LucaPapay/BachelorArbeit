class InventoryCategory {
    constructor(name, id, parentid) {
        this.id = id;
        this.name = name;
        this.childrenCategoriesElements = [];
        this.data = [];
        this.parentid = parentid;
    }
}

class InventoryEntry {
    constructor(name, id) {
        this.id = id;
        this.name = name;
    }
}

export { InventoryCategory, InventoryEntry };