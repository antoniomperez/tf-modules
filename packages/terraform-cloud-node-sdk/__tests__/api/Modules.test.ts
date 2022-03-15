import nock from 'nock';

import { TerraformCloud } from '../../lib/api/TerraformCloud';
import { ModuleMock } from '../mocks/modules';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

describe('Terraform Private Registry', () => {
  const organization = 'my-organization';
  const terraform = new TerraformCloud(process.env.TF_CLOUD_TOKEN as string);

  it('should create a new Module', async () => {
    nock('https://app.terraform.io/api/v2')
      .post(`/organizations/${organization}/registry-modules/`)
      .reply(201, ModuleMock);

    const modules = await terraform.modules.createModule(organization, {
      name: 'my-module',
      provider: 'aws',
      registryName: 'private',
    });

    expect(modules.data.attributes.name).toBe('my-module');
    expect(modules.data.attributes.namespace).toBe(organization);
    expect(modules.data.attributes.provider).toBe('aws');
  });
});
