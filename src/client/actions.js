export const LOAD_EXERCISE = 'LOAD_EXERCISE';
export const LOAD_EXERCISE_SUCCESS = 'LOAD_EXERCISE_SUCCESS';
export const LOAD_EXERCISE_FAILURE = 'LOAD_EXERCISE_FAILURE';
export const START_EXERCISE = 'START_EXERCISE';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
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

export const answerQuestion = (id, solution) => ({
  type: ANSWER_QUESTION,
  payload: {
    id,
    solution,
  },
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
  payload: null,
});
