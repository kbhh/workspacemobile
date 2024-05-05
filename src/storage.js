import {AsyncStorage} from "react-native";

export const storeItem = async (key, item) => {
    try {
        console.log('storing on >> ' + key + ' value >>> ' + item)
        return await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
        console.log(error.message);
    }
};

export const retrieveItem = async (key) => {
    try {
        const retrievedItem = await AsyncStorage.getItem(key);
        return JSON.parse(retrievedItem);
    } catch (error) {
        console.log(error.message);
    }
    return null;
};

export const removeItem = async (key) => {
    try {
        return await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log(error.message)
    }
}