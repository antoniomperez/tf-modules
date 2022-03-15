// eslint-disable-next-line import/namespace
import { TerraformModuleResponse } from '../../lib/types/modules';

export const ModuleMock: TerraformModuleResponse = {
  data: {
    id: 'mod-fZn7uHu99ZCpAKZJ',
    type: 'registry-modules',
    attributes: {
      name: 'my-module',
      namespace: 'my-organization',
      'registry-name': 'private',
      provider: 'aws',
      status: 'pending',
      'version-statuses': [],
      'created-at': '2020-07-09T19:36:56.288Z',
      'updated-at': '2020-07-09T19:36:56.288Z',
      permissions: {
        'can-delete': true,
        'can-resync': true,
        'can-retry': true,
      },
    },
    relationships: {
      organization: {
        data: {
          id: 'my-organization',
          type: 'organizations',
        },
      },
    },
    links: {
      self: '/api/v2/organizations/my-organization/registry-modules/private/my-organization/my-module/aws',
    },
  },
};

export const ModuleListMock = {
  data: [
    {
      id: 'mod-kwt1cBiX2SdDz38w',
      type: 'registry-modules',
      attributes: {
        name: 'api-gateway',
        namespace: 'my-organization',
        provider: 'alicloud',
        status: 'setup_complete',
        'version-statuses': [
          {
            version: '1.1.0',
            status: 'ok',
          },
        ],
        'created-at': '2021-04-07T19:01:18.528Z',
        'updated-at': '2021-04-07T19:01:19.863Z',
        'registry-name': 'private',
        permissions: {
          'can-delete': true,
          'can-resync': true,
          'can-retry': true,
        },
      },
      relationships: {
        organization: {
          data: {
            id: 'my-organization',
            type: 'organizations',
          },
        },
      },
      links: {
        self: '/api/v2/organizations/my-organization/registry-modules/private/my-organization/api-gateway/alicloud',
      },
    },
    {
      id: 'mod-PopQnMtYDCcd3PRX',
      type: 'registry-modules',
      attributes: {
        name: 'aurora',
        namespace: 'my-organization',
        provider: 'aws',
        status: 'setup_complete',
        'version-statuses': [
          {
            version: '4.1.0',
            status: 'ok',
          },
        ],
        'created-at': '2021-04-07T19:04:41.375Z',
        'updated-at': '2021-04-07T19:04:42.828Z',
        'registry-name': 'private',
        permissions: {
          'can-delete': true,
          'can-resync': true,
          'can-retry': true,
        },
      },
      relationships: {
        organization: {
          data: {
            id: 'my-organization',
            type: 'organizations',
          },
        },
      },
      links: {
        self: '/api/v2/organizations/my-organization/registry-modules/private/my-organization/aurora/aws',
      },
    },
  ],
  links: {
    self: 'https://app.terraform.io/api/v2/organizations/my-organization/registry-modules?page%5Bnumber%5D=1&page%5Bsize%5D=6',
    first:
      'https://app.terraform.io/api/v2/organizations/my-organization/registry-modules?page%5Bnumber%5D=1&page%5Bsize%5D=6',
    prev: null,
    next: 'https://app.terraform.io/api/v2/organizations/my-organization/registry-modules?page%5Bnumber%5D=2&page%5Bsize%5D=6',
    last: 'https://app.terraform.io/api/v2/organizations/my-organization/registry-modules?page%5Bnumber%5D=29&page%5Bsize%5D=6',
  },
  meta: {
    pagination: {
      'current-page': 1,
      'page-size': 6,
      'prev-page': null,
      'next-page': 2,
      'total-pages': 29,
      'total-count': 169,
    },
  },
};
