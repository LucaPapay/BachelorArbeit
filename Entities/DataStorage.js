class InventoryCategory {
    constructor(name, id, parentids) {
        this.id = id;
        this.name = name;
        this.subCategories = [];
        this.data = [];
        this.parentIds = parentids;
    }
}

class InventoryEntry {
    constructor(name, id) {
        this.id = id;
        this.name = name;
    }
}

export { InventoryCategory, InventoryEntry };