import AsyncStorage from '@react-native-async-storage/async-storage';


const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
        // saving error
    }
}


const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}


class InventoryCategory {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.childrenCategoriesElements = [];
        this.childrenCategories = [];
    }
}


export { storeData, getData };