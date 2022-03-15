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

export interface TerraformModuleVersionResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      source: string;
      status: string;
      version: string;
      'created-at': string;
      'updated-at': string;
    };
    relationships: {
      'registry-module': {
        data: {
          id: string;
          type: string;
        };
      };
    };
    links: {
      upload: string;
    };
  };
}

interface TerraformModuleAttributes {
  name: string;
  provider: string;
}

interface TerraformModuleVersion {
  version: string;
}

export interface TerraformPrivateModuleAttributes
  extends TerraformModuleAttributes {
  registryName: 'private' | 'public';
}

export interface TerraformModuleVersionAttributes
  extends TerraformModuleAttributes,
    TerraformModuleVersion {}

export interface TerraformModule {
  createModule(
    organization: string,
    attributes: TerraformPrivateModuleAttributes
  ): Promise<TerraformModuleResponse>;
  createModuleVersion(
    organization: string,
    attributes: TerraformModuleVersionAttributes
  ): Promise<TerraformModuleVersionResponse>;
}
