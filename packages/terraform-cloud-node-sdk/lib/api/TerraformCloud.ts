import terraformCloudClient from './TerraformCloudClient';
import Modules from './Modules';

import { TerraformModule } from '../types/modules';

export class TerraformCloud {
  public modules: TerraformModule;

  constructor(token: string) {
    const client = terraformCloudClient(token);
    this.modules = new Modules(client);
  }
}
