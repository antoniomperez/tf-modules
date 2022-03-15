import Modules from './Modules';

import { TerraformModule } from '../types/modules';

export class TerraformCloud {
  public modules: TerraformModule;

  constructor(token: string) {
    this.modules = new Modules(token);
  }
}
