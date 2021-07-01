const settings = {
  dev: {
    apiUrl: "http://192.168.0.106:4000/v1",
  },
  staging: {
    apiUrl: "http://192.168.0.106:9000/v1",
  },
  prod: {
    apiUrl: "http://192.168.0.106:9000/v1",
  },
};

const getCurrentSettings = () => {
  return settings.dev;
};

export default getCurrentSettings();
