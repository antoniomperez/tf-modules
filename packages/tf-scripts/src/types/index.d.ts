export interface Version {
  firstRelease: boolean;
  dryRun: boolean;
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
