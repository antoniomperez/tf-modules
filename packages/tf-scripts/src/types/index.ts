export interface Version {
  firstRelease: boolean;
  dryRun: boolean;
  beta: boolean;
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
