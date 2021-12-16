import client from "./client";

const register = (userInfo) => client.post("/users", userInfo);

const getUser = (userId, authToken = null) => {
  authToken ? client.setHeader("Authorization", "Bearer " + authToken) : null;
  return client.get("/users/" + userId);
};

const getUserTrees = (userId, authToken = null) => {
  authToken ? client.setHeader("Authorization", "Bearer " + authToken) : null;
  return client.get("/users/" + userId + "/trees");
};

const addTree = (userId, treeInfo) =>
  client.post("/users/" + userId + "/trees", treeInfo);

const updateUserInfo = (userId, userInfo) =>
  client.patch("/users/" + userId, userInfo);

export default { register, getUser, addTree, getUserTrees, updateUserInfo };
