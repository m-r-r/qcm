/* @flow */
import type {State, Action} from './types';

import {
  LOAD_EXERCISE,
  LOAD_EXERCISE_SUCCESS,
  LOAD_EXERCISE_FAILURE,
  START_EXERCISE,
  SUBMIT_ANSWER,
  VALIDATE_ANSWER,
  NEXT_QUESTION,
} from './constants';
import * as actions from './actions';

export const INITIAL_STATE: State = {
  status: 'loading',
};

export default function reducer(
  state: State = INITIAL_STATE,
  action: Action
): State {
  switch (action.type) {
    case LOAD_EXERCISE: {
      return INITIAL_STATE;
    }
    case LOAD_EXERCISE_SUCCESS: {
      if (state.status !== 'loading') {
        return state;
      }
      const {metadata, questions, maxScore} = action;
      return {
        status: 'ready',
        metadata,
        questions,
        score: {
          total: 0,
          max: maxScore,
        },
      };
    }

    case LOAD_EXERCISE_FAILURE: {
      if (state.status !== 'loading') {
        return state;
      }
      return {
        status: 'loadError',
        error: action.errorCode,
      };
    }

    case START_EXERCISE: {
      if (state.status === 'ready' || state.status === 'finished') {
        return {
          ...(state: any),
          status: 'askQuestion',
          question: state.questions.slice().sort(() => Math.random() >= 0.5 ? -1 : 1),
          score: {
            ...state.score,
            total: 0,
          },
          currentQuestionIndex: 0,
        };
      } else {
        return state;
      }
    }

    case SUBMIT_ANSWER: {
      return state;
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
