import * as actions from './actions';
import { exerciseMaxScore } from '../core';

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
  currentQuestionIndex: null,
  userAnswers: {},
  userScore: {},
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
        currentQuestionIndex: 0,
        userAnswers: {},
        userScore: {
          total: 0,
          max: exerciseMaxScore(state),
        },
      };

    case actions.ANSWER_QUESTION:
      {
        if (state.step !== steps.INPUT) {
          return state;
        }
        const {answer} = payload;
        const {currentQuestionIndex} = state;
        return {
          ...state,
          userAnswers: {
            ...state.userAnswers,
            [currentQuestionIndex]: answer,
          },
        };
      }

    case actions.VALIDATE_ANSWER:
      {
        if (state.step !== steps.INPUT) {
          return state;
        }
        const {score} = payload;
        const {currentQuestionIndex, userScore} = state;
        const total = userScore.total + score;
        return {
          ...state,
          step: steps.SOLUTION,
          userScore: {
            ...userScore,
            [currentQuestionIndex]: score,
            total,
          },
        };
      }

    case actions.NEXT_QUESTION:
      {
        const {questions, currentQuestionIndex} = state;
        if (state.step !== steps.SOLUTION) {
          return state;
        }
        const isLastQuestion = state.currentQuestionIndex === questions.length - 1;

        if (isLastQuestion) {
          return {
            ...state,
            step: steps.FINISHED,
            currentQuestionIndex: null,
          };
        } else {
          return {
            ...state,
            step: steps.INPUT,
            currentQuestionIndex: currentQuestionIndex + 1,
          };
        }
      }

    default:
      return state;
  }
}
