/* @flow */
import type {
  Action,
  Exercise,
  ErrorCode,
  MetadataFields,
  QuestionType,
} from './types';
import {
  LOAD_EXERCISE,
  SAVE_EXERCISE,
  SAVE_EXERCISE_SUCCESS,
  SAVE_EXERCISE_FAILURE,
  UPDATE_EXERCISE_METADATA,
  ADD_QUESTION,
  REMOVE_QUESTION,
} from './constants';
import {getErrorCode} from './errors';

export const loadExercise = (exercise: Exercise, url?: string): Action => ({
  type: (LOAD_EXERCISE: 'LOAD_EXERCISE'),
  payload: {
    exercise,
    url,
  },
});

export const saveExercise = (): Action => ({
  type: (SAVE_EXERCISE: 'SAVE_EXERCISE'),
  payload: {},
});

export const saveExerciseSuccess = (): Action => ({
  type: (SAVE_EXERCISE_SUCCESS: 'SAVE_EXERCISE_SUCCESS'),
  payload: {},
});

export const saveExerciseFailure = (error: Error): Action => ({
  type: (SAVE_EXERCISE_FAILURE: 'SAVE_EXERCISE_FAILURE'),
  error: true,
  payload: {
    errorCode: getErrorCode(error),
  },
});

export const updateExerciseMetadata = (metadata: MetadataFields): Action => ({
  type: (UPDATE_EXERCISE_METADATA: 'UPDATE_EXERCISE_METADATA'),
  payload: metadata,
});

export const addQuestion = (type: QuestionType): Action => ({
  type: (ADD_QUESTION: 'ADD_QUESTION'),
  payload: {
    type,
  },
});

export const removeQuestion = (id: string): Action => ({
  type: (REMOVE_QUESTION: 'REMOVE_QUESTION'),
  payload: {
    questionId: id,
  },
});
