import terraformCloudClient from './TerraformCloudClient';
import Modules from './Modules';

export class TerraformCloud {
  public modules;

  constructor(token: string) {
    const client = terraformCloudClient(token);
    this.modules = new Modules(client);
  }
}
