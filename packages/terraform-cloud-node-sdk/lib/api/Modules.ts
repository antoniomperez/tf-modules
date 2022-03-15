import axios, { AxiosRequestConfig } from 'axios';
import {
  TerraformModule,
  TerraformPrivateModuleAttributes,
} from '../types/modules';

export default class Modules implements TerraformModule {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async createModule(
    organization: string,
    attributes: TerraformPrivateModuleAttributes
  ) {
    const terraformBaseApiUrl = 'https://app.terraform.io/api/v2';

    const axiosConfig: AxiosRequestConfig = {
      baseURL: terraformBaseApiUrl,
      url: `/organizations/${organization}/registry-modules/`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/vnd.api+json',
      },
      data: {
        data: {
          type: 'registry-modules',
          attributes: {
            name: attributes.name,
            provider: attributes.provider,
            'registry-name': attributes.registryName,
          },
        },
      },
    };

    try {
      const response = await axios(axiosConfig);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
