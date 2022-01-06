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

const updateTree = (userId, treeId, treeInfo) =>
  client.patch("/users/" + userId + "/trees/" + treeId, treeInfo);

export default {
  register,
  getUser,
  addTree,
  updateTree,
  getUserTrees,
  updateUserInfo,
};
