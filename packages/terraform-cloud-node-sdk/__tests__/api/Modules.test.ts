import { server, rest } from '../../testServer';
import { TerraformCloud } from '../../lib/api/TerraformCloud';
import modulesList from '../../lib/mocks/modulesResponse.json';

describe('Terraform Cloud', () => {
  const fakeToken = '98eu948eo4hf84e4o8je4';
  const organization = 'my-organization';
  const endpoint = `https://app.terraform.io/api/v2/organizations/${organization}/registry-modules`;
  const terraform = new TerraformCloud(fakeToken);

  it('should list no modules', async () => {
    server.use(
      rest.get(endpoint, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ data: [] }));
      })
    );

    const modules = await terraform.modules.listModules(organization);
    expect(modules.data).toHaveLength(0);
  });
  it('should list one module', async () => {
    server.use(
      rest.get(endpoint, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ data: [modulesList.data[0]] }));
      })
    );
    const modules = await terraform.modules.listModules(organization);
    expect(modules.data).toHaveLength(1);
  });
});
