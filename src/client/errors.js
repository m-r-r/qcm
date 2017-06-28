/* @flow */
export class LoadError extends Error {}

export class NetworkError extends LoadError {
  uri: string;

  constructor(uri: string) {
    super(`Could not download ${uri}`);
    this.uri = uri;
  }
}

export class DecodeError extends LoadError {
  uri: string;
  error: any;

  constructor(uri: string, errors: any) {
    super(`Could not decode ${uri}`);
    this.uri = uri;
    this.error = errors;
  }
}
