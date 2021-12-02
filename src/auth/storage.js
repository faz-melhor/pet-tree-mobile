import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "authToken";
const key_user = "user";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
    await SecureStore.deleteItemAsync(key_user);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

const getUser = async () => {
  try {
    const string_user = await SecureStore.getItemAsync(key_user);
    user = JSON.parse(string_user);
    return user ? user : null;
  } catch (error) {
    console.log("Error getting the user", error);
  }
};

const storeUser = async (userInfo) => {
  try {
    string_user = JSON.stringify(userInfo);
    await SecureStore.setItemAsync(key_user, string_user);
  } catch (error) {
    console.log("Error storing the user", error);
  }
};

export default { getToken, getUser, storeUser, removeToken, storeToken };
