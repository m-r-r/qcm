/* @flow */
import type {State, Action} from './types';

import {
  LOAD_EXERCISE,
  LOAD_EXERCISE_SUCCESS,
  LOAD_EXERCISE_FAILURE,
  START_EXERCISE,
  ANSWER_QUESTION,
  VALIDATE_ANSWER,
  NEXT_QUESTION,
} from './constants';
import * as actions from './actions';
import {exerciseMaxScore} from '../common';

export const steps = {
  FAILURE: 'FAILURE',
  LOADING: 'LOADING',
  READY: 'READY',
  INPUT: 'INPUT',
  SOLUTION: 'SOLUTION',
  FINISHED: 'FINISHED',
};

export const INITIAL_STATE: State = {
  step: steps.LOADING,
  metadata: {},
  questions: [],
  error: null,
  currentQuestionIndex: null,
  userAnswers: {},
  userScore: {},
};

export default function reducer(
  state: State = INITIAL_STATE,
  action: Action
): State {
  const {type, payload} = action;

  switch (action.type) {
    case LOAD_EXERCISE:
      return {
        ...state,
        step: steps.LOADING,
        error: null,
      };

    case LOAD_EXERCISE_SUCCESS: {
      const {exercise: {metadata, questions}} = action.payload;
      return {
        ...state,
        step: steps.READY,
        error: null,
        metadata,
        questions,
      };
    }
    case LOAD_EXERCISE_FAILURE: {
      const {error} = action.payload;
      return {
        ...state,
        step: steps.FAILURE,
        error,
      };
    }

    case START_EXERCISE:
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

    case ANSWER_QUESTION: {
      if (state.step !== steps.INPUT) {
        return state;
      }
      const {answer} = action.payload;
      const {currentQuestionIndex} = state;
      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [Number(currentQuestionIndex)]: answer,
        },
      };
    }

    case VALIDATE_ANSWER: {
      if (state.step !== steps.INPUT) {
        return state;
      }
      const {score} = action.payload;
      const {currentQuestionIndex, userScore} = state;
      const total = userScore.total + score;
      return {
        ...state,
        step: steps.SOLUTION,
        userScore: {
          ...userScore,
          [Number(currentQuestionIndex)]: score,
          total,
        },
      };
    }

    case NEXT_QUESTION: {
      const {questions, currentQuestionIndex} = state;
      if (state.step !== steps.SOLUTION) {
        return state;
      }
      const isLastQuestion =
        state.currentQuestionIndex === questions.length - 1;

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
