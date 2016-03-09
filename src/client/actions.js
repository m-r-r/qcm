export const LOAD_EXERCISE = 'LOAD_EXERCISE';
export const LOAD_EXERCISE_SUCCESS = 'LOAD_EXERCISE_SUCCESS';
export const LOAD_EXERCISE_FAILURE = 'LOAD_EXERCISE_FAILURE';
export const START_EXERCISE = 'START_EXERCISE';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const VALIDATE_ANSWER = 'VALIDATE_ANSWER';
export const NEXT_QUESTION = 'NEXT_QUESTION';

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

export const validateAnswer = (result) => ({
  type: VALIDATE_ANSWER,
  payload: {
    result,
  },
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
  payload: null,
});
