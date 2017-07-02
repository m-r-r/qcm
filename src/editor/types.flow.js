/* @flow */

import type {Exercise, Question, Answer} from '../core/types';
export type {Exercise, Question, Answer};

export type MetadataFields = $PropertyType<Exercise, 'metadata'>;

export type ErrorCode =
  | 'SAVE_AUTHENTICATION_ERROR'
  | 'SAVE_SERVER_ERROR'
  | 'UNKNOWN_ERROR';

export type Action =
  | {type: 'LOAD_EXERCISE', +payload: {|+exercise: Exercise, +url: ?string|}}
  | {type: 'SAVE_EXERCISE', +payload: {||}}
  | {type: 'SAVE_EXERCISE_SUCCESS', +payload: {||}}
  | {
      type: 'SAVE_EXERCISE_FAILURE',
      +error: true,
      +payload: {|+errorCode: ErrorCode|},
    }
  | {type: 'UPDATE_EXERCISE_METADATA', +payload: MetadataFields};

export type State = {
  isSaving: boolean,
  saveError: ErrorCode | null,
  url: ?string,
  metadata: $PropertyType<Exercise, 'metadata'>,
  questions: $PropertyType<Exercise, 'questions'>,
};
