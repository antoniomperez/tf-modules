import axios, { AxiosRequestConfig } from 'axios';
import fs from 'fs';

import {
  TerraformModule,
  TerraformPrivateModuleAttributes,
  TerraformModuleVersionAttributes,
  // eslint-disable-next-line import/no-unresolved
} from '../types/modules';

export default class Modules implements TerraformModule {
  private token: string;

  private terraformBaseApiUrl: string;

  constructor(token: string) {
    this.token = token;
    this.terraformBaseApiUrl = 'https://app.terraform.io/api/v2';
  }

  async createModule(
    organization: string,
    attributes: TerraformPrivateModuleAttributes
  ) {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: this.terraformBaseApiUrl,
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

  async createModuleVersion(
    organization: string,
    attributes: TerraformModuleVersionAttributes
  ) {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: this.terraformBaseApiUrl,
      url: `/organizations/${organization}/registry-modules/private/${organization}/${attributes.name}/${attributes.provider}/versions`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/vnd.api+json',
      },
      data: {
        data: {
          type: 'registry-modules-version',
          attributes: {
            version: attributes.version,
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

  // eslint-disable-next-line class-methods-use-this
  async uploadModule(uploadLink: string, filePath: string) {
    const axiosConfig: AxiosRequestConfig = {
      url: uploadLink,
      method: 'put',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      data: fs.createReadStream(filePath),
    };

    try {
      const response = await axios(axiosConfig);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
