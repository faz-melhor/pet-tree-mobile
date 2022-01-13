import client from "./client";

const getTrees = (params) =>
  client.get("/trees", { ...params, status: "accepted" });

export default { getTrees };
