import client from "./client";

//TODO: change status to `accepted`
const getTrees = (params) => client.get("/trees", {...params, status: "pending"});

export default { getTrees };
