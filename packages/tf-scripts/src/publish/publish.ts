/* eslint-disable import/no-unresolved */
import { Command } from 'commander';
import axios, { AxiosRequestConfig } from 'axios';
import fs from 'fs';

import {
  TerraformModuleDetails,
  TerraformModuleResponse,
  TerraformModuleVersionResponse,
} from '../types';

const terraformBaseApiUrl = 'https://app.terraform.io/api/v2/organizations/';

async function uploadTerraformModule(link: string) {
  const axiosConfig: AxiosRequestConfig = {
    url: link,
    method: 'put',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    data: fs.createReadStream('./module.tar.gz'),
  };

  try {
    const response = await axios(axiosConfig);
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error.response);
    process.exit(1);
  }
}

async function createTerraformModuleVersion(
  options: TerraformModuleDetails,
  version: string
) {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: terraformBaseApiUrl,
    url: `${options.organization}/registry-modules/private/${options.organization}/${options.name}/${options.provider}/versions`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${process.env.TF_CLOUD_TOKEN}`,
      'Content-Type': 'application/vnd.api+json',
    },
    data: {
      data: {
        type: 'registry-module-version',
        attributes: {
          version,
        },
      },
    },
  };

  try {
    const response: TerraformModuleVersionResponse = await axios(axiosConfig);
    await uploadTerraformModule(response.data.data.links.upload);
    // console.log(response.data.data.links.upload);
    return response;
  } catch (error) {
    console.error(error.response.data);
    process.exit(1);
  }
}

async function createTerraformModule(options: TerraformModuleDetails) {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: terraformBaseApiUrl,
    url: `${options.organization}/registry-modules/`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${process.env.TF_CLOUD_TOKEN}`,
      'Content-Type': 'application/vnd.api+json',
    },
    data: {
      data: {
        type: 'registry-modules',
        attributes: {
          name: options.name,
          provider: options.provider,
          'registry-name': 'private',
        },
      },
    },
  };

  try {
    const response: TerraformModuleResponse = await axios(axiosConfig);
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error.response);
    process.exit(1);
  }
}

async function getTerraformModule(options: TerraformModuleDetails) {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: terraformBaseApiUrl,
    url: `${options.organization}/registry-modules/private/${options.organization}/${options.name}/${options.provider}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${process.env.TF_CLOUD_TOKEN}`,
    },
  };

  try {
    const response: TerraformModuleResponse = await axios(axiosConfig);
    return response;
  } catch (error) {
    console.error(error.response);
    process.exit(1);
  }
}

const publish = () => {
  const program = new Command('publish');

  program
    .description('Publish a private terraform module')
    .requiredOption(
      '-o, --organization <string>',
      'Organization name in terraform cloud'
    )
    .requiredOption('-n, --name <string>', 'name of the module')
    .requiredOption('-p, --provider <string>', 'Terraform provider')
    .action((options: TerraformModuleDetails) => {
      createTerraformModuleVersion(options, '1.9.11');
      /* uploadTerraformModule(
        'https://archivist.terraform.io/v1/object/dmF1bHQ6djE6aDh1S0JHaHJ1c0tZVGFON2JlOXBrZ3lwaFM3ZTkwYi9maUxTVmRRRDZwczhLMnkvV0NvbjdLUjJHaUU4WExLMXFWVXJvSjFxSlJWVnZzaGd6alFRUSs3S0hRaVZkTWRiNU5xUFIxOTNrNTZENC9NeGpQZTR3SGN6UlE5L01OVTNLZnZrOE5sZGhMK2F3Kzk4UDNmYnQ2QnBRVGJ5aFJhQnJvZE40REtWZ1I2dGYrRzFkdzlWSm1pK2llZytpV1ZUSmR6Yi9kMmNCcW9jSG55Y2dzZlZrSTZ6OGk3TURmUmJKLzFpR09qblA5TkFiM1R6TVBwOXBrRWZ5dXpoanpVeVcvakxIT2tMMmQ3dW8vQVRGcE04UWFoUW81MUQrS0x2R01NazhqQ2ZIdUlVM2VjTjh4NEJaUmR6RXNkUnZoeEw4U3NyY1VHNE5Hc2pBcUJ3ekQwc0d2a0pIZk09'
      ); */
      // console.log('DETAILS: ', terraformModuleDetail.data);
      // uploadTerraformModule(terraformModuleDetail.data.links.upload);
      // getTerraformModule(options);
      // createTerraformModule(options);
    });

  return program;
};

export default publish;
