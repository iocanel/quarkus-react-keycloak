import axios from "axios";

const create = (getToken, updateToken) => {
  const client = axios.create();
  client.interceptors.request.use((config) => {
    let token = getToken();
    //Check if authenticated.
    if (token != null && token.length > 0) {
      const callback = () => {
        config.headers.Authorization = `Bearer ${getToken()}`;
        return Promise.resolve(config);
      };
      updateToken(callback);
    }
    return config;
  });
  return client;
}

const AxiosFactory =  { create }
export default AxiosFactory;
