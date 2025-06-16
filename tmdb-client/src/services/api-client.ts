import axios, { AxiosRequestConfig } from "axios";

export interface Response<T> {
  count: number;
  next: string | null;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export { axiosInstance };

class ApiClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) =>
    axiosInstance
      .get<Response<T>>(this.endpoint, config)
      .then((res) => res.data);

  get = (id: number | string) =>
    axiosInstance.get<T>(this.endpoint + "/" + id).then((res) => res.data);

  delete = (id: number | string) =>
    axiosInstance.delete(this.endpoint + "/" + id).then((res) => res.data);

  // Add a specialized method for favorite deletion which requires two IDs
  deleteFavorite = (userId: number | string, contentId: number | string) =>
    axiosInstance
      .delete(`${this.endpoint}/${userId}/${contentId}`)
      .then((res) => res.data);

  // Add a specialized method for adding favorites
  addFavorite = (userId: number | string, contentId: number | string) =>
    axiosInstance
      .post<T>(this.endpoint, {
        user_id: userId,
        content_id: contentId,
      })
      .then((res) => res.data);

  patch = (id: number | string, data: any) =>
    axiosInstance
      .patch<T>(this.endpoint + "/" + id, data)
      .then((res) => res.data);
}

export default ApiClient;
