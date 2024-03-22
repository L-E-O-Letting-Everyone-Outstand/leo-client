import AsyncStorage from "@react-native-async-storage/async-storage";

const setItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // handle storage set item error
    console.error(e);
  }
};

const getItem = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // handle storage get item error
    console.error(e);
  }
};

const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // handle storage remove item error
    console.error(e);
  }
};

export const storage = {
  setItem,
  getItem,
  removeItem,
};
