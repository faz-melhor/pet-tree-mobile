import client from "./client";

const register = (userInfo) => client.post("/users", userInfo);

const addTree = (userId, treeInfo) =>
  client.post("/users/" + userId + "/trees", treeInfo);

export default { register, addTree };
