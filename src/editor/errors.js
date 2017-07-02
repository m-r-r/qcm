/* @flow */
import type {ErrorCode} from './types';

export const getErrorCode = (error: Error): ErrorCode => {
  return typeof error.errorCode === 'string'
    ? (error.errorCode: any)
    : 'UNKNOWN_ERROR';
};
