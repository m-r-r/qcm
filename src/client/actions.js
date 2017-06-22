import {
  LOAD_EXERCISE,
  LOAD_EXERCISE_SUCCESS,
  LOAD_EXERCISE_FAILURE,
  START_EXERCISE,
  ANSWER_QUESTION,
  VALIDATE_ANSWER,
  NEXT_QUESTION
} from './constants';

export const loadExercise = (uri) => ({
  type: LOAD_EXERCISE,
  payload: {
    uri,
  },
});

export const loadExerciseSuccess = (exercise) => ({
  type: LOAD_EXERCISE_SUCCESS,
  payload: {
    exercise,
  },
});

export const loadExerciseFailure = (error) => ({
  type: LOAD_EXERCISE_FAILURE,
  error: true,
  payload: {
    error,
  },
});

export const startExercise = () => ({
  type: START_EXERCISE,
  payload: null,
});

export const answerQuestion = (answer) => ({
  type: ANSWER_QUESTION,
  payload: {
    answer,
  },
});

export const validateAnswer = (score) => ({
  type: VALIDATE_ANSWER,
  payload: {
    score,
  },
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
  payload: null,
});
