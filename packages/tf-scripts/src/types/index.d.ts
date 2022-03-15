export interface Version {
  firstRelease: boolean;
  dryRun: boolean;
  alpha: boolean;
  beta: boolean;
  rc: boolean;
  stable: boolean;
  releaseAs: string;
  name: string;
}

export interface LernaRepository {
  name: string;
  version: string;
  private: boolean;
  location: string;
}

export interface ReleaseFile {
  releaseType: string;
}

interface TerraformOrganization {
  organization: string;
}
export interface TerraformModuleDetails extends TerraformOrganization {
  name: string;
  provider: string;
}

interface TerraformModuleErrorDetailResponse {
  status: number;
  title: string;
}
interface TerraformModuleErrorReponse {
  data: {
    errors: [TerraformModuleErrorDetailResponse];
  };
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
      'register-name': string;
      status: string;
      'version-statuses': [TerraformVersionStatus];
      'created-at': string;
      'updated-at': string;
      'vcs-repo'?: {
        branch: string;
        'ingress-submodules': boolean;
        identifier: string;
        'display-identifier': string;
        'oauth-token-id': string;
        'webhook-url': string;
      };
      permisions: {
        'can-delete': boolean;
        'can-resync': boolean;
        'can-retry': boolean;
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
