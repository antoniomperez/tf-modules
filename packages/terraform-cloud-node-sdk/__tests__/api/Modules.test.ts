import { TerraformCloud } from '../../lib/api/TerraformCloud';

it('First test', () => {
  const token =
    's9Jxrm2LRlasGw.atlasv1.lgOgnhkabykgvPlRo7TAnwE6NlMnljRP3GhWTpbNR7JTRCZtZrw1LG7ei6vKR580Uis';

  const terraform = new TerraformCloud(token);
  terraform.modules.getModules('amarquez');
});
