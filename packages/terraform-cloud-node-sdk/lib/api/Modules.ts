import { AxiosInstance } from 'axios';
// eslint-disable-next-line import/no-unresolved
import { TerraformOrganization } from '../types/Modules';

export default class Modules {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getModules(organization: TerraformOrganization) {
    const path = `/organizations/${organization}/registry-modules`;
    console.log('PATH: ', path);
    return await this.client.get(path);
  }
}
