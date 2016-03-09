import * as actions from './actions';

export const steps = {
  FAILURE: 'FAILURE',
  LOADING: 'LOADING',
  READY: 'READY',
  INPUT: 'INPUT',
  SOLUTION: 'SOLUTION',
  FINISHED: 'FINISHED',
};

export const INITIAL_STATE = {
  step: steps.LOADING,
  metadata: {},
  questions: [],
  error: null,
  currentQuestion: null,
  userAnswers: {},
  userResults: {},
};

export default function reducer (state = INITIAL_STATE, action) {
  const {type, payload} = action;

  switch (type) {
    case actions.LOAD_EXERCISE:
      return {
        ...state,
        step: steps.LOADING,
        error: null,
      };

    case actions.LOAD_EXERCISE_SUCCESS:
      {
        const {exercise: {metadata, questions}} = payload;
        return {
          ...state,
          step: steps.READY,
          error: null,
          metadata,
          questions,
        };
      }
    case actions.LOAD_EXERCISE_FAILURE:
      {
        const {error} = payload;
        return {
          ...state,
          step: steps.FAILURE,
          error,
        };
      }

    case actions.START_EXERCISE:
      if (state.step !== steps.READY && state.step !== steps.FINISHED) {
        return state;
      }
      return {
        ...state,
        step: steps.INPUT,
        currentQuestion: 0,
        userAnswers: {},
        userResults: {},
      };

    case actions.ANSWER_QUESTION:
      {
        if (state.step !== steps.INPUT) {
          return state;
        }
        const {answer} = payload;
        const {currentQuestion} = state;
        return {
          ...state,
          userAnswers: {
            ...state.userAnswers,
            [currentQuestion]: answer,
          },
        };
      }

    case actions.VALIDATE_ANSWER:
      {
        if (state.step !== steps.INPUT) {
          return state;
        }
        const {result} = payload;
        const {currentQuestion} = state;
        return {
          ...state,
          step: steps.SOLUTION,
          userResults: {
            ...state.userResults,
            [currentQuestion]: result ? 1 : 0,
          },
        };
      }

    case actions.NEXT_QUESTION:
      {
        const {questions, currentQuestion} = state;
        if (state.step !== steps.SOLUTION) {
          return state;
        }
        const isLastQuestion = state.currentQuestion === questions.length - 1;

        if (isLastQuestion) {
          return {
            ...state,
            step: steps.FINISHED,
            currentQuestion: null,
          };
        } else {
          return {
            ...state,
            step: steps.INPUT,
            currentQuestion: currentQuestion + 1,
          };
        }
      }

    default:
      return state;
  }
}
