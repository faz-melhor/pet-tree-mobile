import client from "./client";

const register = (userInfo) => client.post("/users", userInfo);

const getUser = (userId, authToken = null) => {
  authToken ? client.setHeader("Authorization", "Bearer " + authToken) : null;
  return client.get("/users/" + userId);
};

const addTree = (userId, treeInfo) =>
  client.post("/users/" + userId + "/trees", treeInfo);

export default { register, getUser, addTree };
