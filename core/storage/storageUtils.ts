import AsyncStorage from "@react-native-async-storage/async-storage";

export const storageUtils = () => {
  const storeValue = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log("Value stored!");
    } catch (error) {
      console.error("Error storing value:", error);
    }
  };

  const getValue = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? value : undefined;
    } catch (error) {
      console.error("Error retrieving value:", error);
    }
  };

  const removeValue = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log("Value removed!");
    } catch (error) {
      console.error("Error removing value:", error);
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      console.log("All data cleared!");
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  };

  return {
    storeValue,
    getValue,
    removeValue,
    clearAll,
  };
};
