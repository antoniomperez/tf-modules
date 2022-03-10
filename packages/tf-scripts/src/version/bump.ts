import standardVersion, { Options } from 'standard-version';
import fs from 'fs-extra';
import path from 'path';

import { verifyRepoExist } from '../helpers/version';
// eslint-disable-next-line import/no-unresolved
import { ReleaseFile, Version, LernaRepository } from '../types';

const releaseFileName = 'release.json';

const releaseFile = (repository: LernaRepository) => {
  const releaseFileLocation = `${repository.location}/${releaseFileName}`;

  if (!fs.existsSync(releaseFileLocation)) {
    console.log(`Relase file does not exist in repo: "${repository.name}"`);
  }

  const file: ReleaseFile = fs.readJSONSync(releaseFileLocation);

  return file;
};

const resolveVersion = (name: string) => {
  const ALLOWED_RELEASE_TYPES = ['stable', 'rc', 'beta', 'alpha'];

  const repository = verifyRepoExist(name);

  /* const releaseFileLocation = `${repository.location}/${releaseFileName}`;

  if (!fs.existsSync(releaseFileLocation)) {
    console.log(`Relase file does not exist in repo: "${repository.name}"`);
  }

  const releaseFile: ReleaseFile = fs.readJSONSync(releaseFileLocation); */
  const { releaseType } = releaseFile(repository);

  if (!releaseType) {
    throw new Error(`"releaseType" must be defined in ${releaseFile}`);
  }

  if (!ALLOWED_RELEASE_TYPES.includes(releaseType)) {
    throw new Error(
      `releaseType=${releaseType} is not allowed. Allowed values: ${ALLOWED_RELEASE_TYPES.join(
        ','
      )}`
    );
  }

  // Resolve and check that we have a version file
  const versionFile = 'package.json';
  const versionFileLocation = `${repository.location}/${versionFile}`;

  if (!fs.existsSync(versionFileLocation)) {
    throw new Error(`unable to find version file ${versionFile}`);
  }

  const currentVersion = fs.readJSONSync(versionFileLocation).version;

  return {
    version: currentVersion,
    versionFilepath: versionFileLocation,
    changelogFile: path.join(repository.location, 'CHANGELOG.md'),
    prerelease: releaseType !== 'stable' ? releaseType : undefined,
  };
};

const changeReleaseType = (type: string, name: string) => {
  const repo = verifyRepoExist(name);
  const release = releaseFile(repo);
  release.releaseType = type;

  const versionFileLocation = `${repo.location}/${releaseFileName}`;
  fs.writeFileSync(versionFileLocation, JSON.stringify(release, null, 2));
};

// eslint-disable-next-line import/prefer-default-export
export async function createVersion(version: Version) {
  if (verifyRepoExist(version.name) === undefined) {
    console.error(`This repository does not exist ${version.name}`);
    process.exit(1);
  }

  if (version.alpha) {
    changeReleaseType('alpha', version.name);
  }

  if (version.beta) {
    changeReleaseType('beta', version.name);
  }

  if (version.rc) {
    changeReleaseType('rc', version.name);
  }

  if (version.stable) {
    changeReleaseType('stable', version.name);
  }

  const ver = resolveVersion(version.name);
  console.log(ver);

  const opts: Options = {
    firstRelease: version.firstRelease || undefined,
    dryRun: version.dryRun || undefined,
    tagPrefix: `${version.name}-v`,
    packageFiles: [ver.versionFilepath],
    bumpFiles: [ver.versionFilepath],
    infile: ver.changelogFile,
    prerelease: ver.prerelease,
    releaseAs: '1.0.0-alpha.0', //version.releaseAs || undefined,
    path: ver.versionFilepath,
  };

  await standardVersion(opts);
}
