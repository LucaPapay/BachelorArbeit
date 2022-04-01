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
    constructor(name, id, parentIds) {
        this.id = id;
        this.name = name;
        this.parentIds = parentIds;
    }
}

export { InventoryCategory, InventoryEntry };