/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';

export interface TerraformOrganization {
  name: string;
}

interface TerraformVersionStatus {
  version: string;
  status: string;
}
export interface TerraformModuleResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      name: string;
      provider: string;
      namespace: string;
      'registry-name': string;
      status: string;
      'version-statuses': [TerraformVersionStatus] | [];
      'created-at': string;
      'updated-at': string;
      permissions: {
        'can-delete': boolean;
        'can-resync': boolean;
        'can-retry': boolean;
      };
    };
    relationships: {
      organization: {
        data: {
          id: string;
          type: string;
        };
      };
    };
    links: {
      self: string;
    };
  };
}

export interface TerraformPrivateModuleAttributes {
  name: string;
  provider: string;
  registryName: 'private' | 'public';
}
export interface TerraformModule {
  createModule(
    organization: string,
    attributes: TerraformPrivateModuleAttributes
  ): Promise<AxiosResponse>;
}
