import { AxiosInstance } from 'axios';
import { TerraformModule } from '../types/modules';

export default class Modules implements TerraformModule {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async listModules(organization: string) {
    const path = `/organizations/${organization}/registry-modules`;
    const response = await this.client.get(path);
    return response.data;
  }
}
