/* @flow */
import {
  LOAD_EXERCISE,
  LOAD_EXERCISE_SUCCESS,
  LOAD_EXERCISE_FAILURE,
  START_EXERCISE,
  ANSWER_QUESTION,
  VALIDATE_ANSWER,
  NEXT_QUESTION,
} from './constants';

import type {Action, Exercise} from './types';

export const loadExercise = (uri: string): Action => ({
  type: LOAD_EXERCISE,
  payload: {
    uri,
  },
});

export const loadExerciseSuccess = (exercise: Exercise): Action => ({
  type: LOAD_EXERCISE_SUCCESS,
  payload: {
    exercise,
  },
});

export const loadExerciseFailure = (error: Error): Action => ({
  type: LOAD_EXERCISE_FAILURE,
  error: true,
  payload: {
    error,
  },
});

export const startExercise = (): Action => ({
  type: (START_EXERCISE: 'START_EXERCISE'),
  payload: {},
});

export const answerQuestion = (answer: Object): Action => ({
  type: ANSWER_QUESTION,
  payload: {
    answer,
  },
});

export const validateAnswer = (score: number): Action => ({
  type: VALIDATE_ANSWER,
  payload: {
    score,
  },
});

export const nextQuestion = (): Action => ({
  type: (NEXT_QUESTION: 'NEXT_QUESTION'),
  payload: {},
});
