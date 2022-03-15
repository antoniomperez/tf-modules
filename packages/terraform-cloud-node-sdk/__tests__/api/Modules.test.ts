import nock from 'nock';
import path from 'path';

import { TerraformCloud } from '../../lib/api/TerraformCloud';
import { ModuleMock, ModuleVersionMock } from '../mocks/modules';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

describe('Terraform Private Registry', () => {
  const organization = 'my-organization';
  const provider = 'aws';
  const name = 'my-module';
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

  it('should add new version on the module', async () => {
    nock('https://app.terraform.io/api/v2')
      .post(
        `/organizations/${organization}/registry-modules/private/${organization}/${name}/${provider}/versions`
      )
      .reply(201, ModuleVersionMock);

    const module = await terraform.modules.createModuleVersion(organization, {
      provider,
      name,
      version: '1.2.3',
    });

    expect(module.data.attributes.version).toBe('1.2.3');
  });

  it('should upload the module', async () => {
    const uploadLink = 'https://archivist.terraform.io';
    nock(uploadLink)
      .put('/v1/object/dmF1bHQ6djE6NWJPbHQ4QjV4R1ox')
      .reply(201, 'ok');

    const response = await terraform.modules.uploadModule(
      `${uploadLink}/v1/object/dmF1bHQ6djE6NWJPbHQ4QjV4R1ox`,
      path.join(process.cwd(), '/module.tar.gz')
    );
    console.log(response);
    expect(response).toBe('ok');
  });
});
