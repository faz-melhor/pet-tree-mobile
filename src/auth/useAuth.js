import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import jwtDecode from "jwt-decode";
import usersApi from "../api/users";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  const logIn = async (token, user) => {
    authStorage.storeToken(token);
    setUserInfo(user);
  };

  const setUserInfo = async (user) => {
    authStorage.storeUser(user);
    setUser(user);
  };

  const getUserInfo = async (token) => {
    if (!token) return false;
    decodedToken = jwtDecode(token);
    userInfo = await usersApi.getUser(decodedToken.sub, token);
    if (!userInfo.ok) return false;
    return userInfo.data;
  };

  return { user, logIn, logOut, getUserInfo, setUserInfo };
};
