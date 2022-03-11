import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const terraformCloudClient = (token: string) => {
  const baseUrl = 'https://app.terraform.io/api/v2';
  const client: AxiosInstance = axios.create({ baseURL: baseUrl });

  client.interceptors.request.use((request: AxiosRequestConfig) => {
    request.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/vnd.api+json',
    };
    return request;
  });

  return client;
};

export default terraformCloudClient;
