export class LoadError extends Error {
}

export class NetworkError extends LoadError {
  constructor (uri) {
    super(`Could not download ${uri}`);
    this.uri = uri;
  }
}

export class DecodeError extends LoadError {
  constructor (uri, errors) {
    super(`Could not decode ${uri}`);
    this.uri = uri;
    this.error = errors;
  }
}
