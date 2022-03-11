interface TerraformOrganization {
  organization: string;
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
