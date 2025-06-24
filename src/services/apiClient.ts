import axios from "axios";
import { API_BASEURL } from "../constants";

const axiosInstance = axios.create({
  baseURL: API_BASEURL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const safeError = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data, 
    };
    return Promise.reject(safeError);
  }
);

// axiosInstance.defaults.transformRequest = undefined;
// axiosInstance.defaults.transformResponse = undefined;

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return axiosInstance
      .get<T[]>(this.endpoint)
      .then((res) => res.data);
  }

  getById = (id: number) => {
    return axiosInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  }

  post = (data: T) => {
    return axiosInstance
      .post<T>(this.endpoint, data)
      .then((res) => res.data);
  }

  update = (data: T) => {
    return axiosInstance
      .put<T>(this.endpoint, data)
      .then((res) => res.data);
  }

  delete<T>(id: number) {
    return axiosInstance
      .delete(this.endpoint + "/" + id)
      .then((res) => res.data);
  }
}

export default APIClient;