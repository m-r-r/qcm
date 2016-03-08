import * as actions from './actions';

export const steps = {
  FAILURE: 'FAILURE',
  LOADING: 'LOADING',
  READY: 'READY',
  STARTED: 'STARTED',
  FINISHED: 'FINISHED',
};

export const INITIAL_STATE = {
  step: steps.LOADING,
  metadata: {},
  questions: [],
  error: null,
  currentQuestion: null,
  userAnswers: {},
  showSolution: false,
};

export default function reducer (state = INITIAL_STATE, action) {
  const {type, payload} = action;

  switch (type) {
    case actions.LOAD_EXERCISE:
      return {
        ...state,
        state: steps.LOADING,
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
        currentQuestion: 0,
        userAnswers: {},
        showSolution: false,
        step: steps.STARTED,
      };

    case actions.ANSWER_QUESTION:
      {
        let {id, answer} = payload;
        if (state.step !== steps.STARTED) {
          return state;
        }
        return {
          ...state,
          userAnswers: {
            ...state.userAnswers,
            [id]: answer,
          },
        };
      }

    case actions.ANSWER_CHECKED:
      {
        let {result} = payload;
        if (state.step !== steps.STARTED) {
          return state;
        }
        if (result === false) {
          return {
            ...state,
            showSolution: true,
          };
        }
        return state;
      }

    case actions.CONTINUE:
      {
        const {questions, currentQuestion, userAnswers} = state;
        if (state.step !== steps.STARTED) {
          return state;
        }
        if (!userAnswers.hasOwnProperty(currentQuestion)) {
          return state;
        }

        const isLastQuestion = state.currentQuestion === questions.length - 1;

        if (isLastQuestion) {
          return {
            ...state,
            finished: true,
            showSolution: false,
            currentQuestion: null,
          };
        } else {
          return {
            ...state,
            showSolution: false,
            currentQuestion: currentQuestion + 1,
          };
        }
      }

    default:
      return state;
  }
}
