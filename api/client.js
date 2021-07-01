import { create } from "apisauce";
import settings from "../config/settings";

const apiClient = create({
  baseURL: settings.apiUrl,
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  return response;
};

export default apiClient;
