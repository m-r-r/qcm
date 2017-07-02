/* @flow */
import type {Action, State} from '../types';
import {
  LOAD_EXERCISE,
  SAVE_EXERCISE,
  SAVE_EXERCISE_SUCCESS,
  SAVE_EXERCISE_FAILURE,
  UPDATE_EXERCISE_METADATA,
} from '../constants';

const INITIAL_STATE: State = {
  isSaving: false,
  saveError: null,
  url: null,
  metadata: {},
  questions: [],
};

export default function rootReducer(
  state: State = INITIAL_STATE,
  action: Action
): State {
  switch (action.type) {
    case LOAD_EXERCISE: {
      const {exercise, url} = action.payload;
      return {
        ...state,
        metadata: exercise.metadata,
        questions: exercise.questions,
        url,
      };
    }

    case SAVE_EXERCISE:
      return {
        ...state,
        isSaving: true,
        saveError: null,
      };

    case SAVE_EXERCISE_SUCCESS:
      return {
        ...state,
        isSaving: false,
        saveError: null,
      };

    case (SAVE_EXERCISE_FAILURE: 'SAVE_EXERCISE_FAILURE'):
      return {
        ...state,
        isSaving: false,
        saveError: action.payload.errorCode,
      };

    case UPDATE_EXERCISE_METADATA: {
      return {
        ...state,
        metadata: {
          ...state.metadata,
          ...action.payload,
        },
      };
    };

    default:
      return state;
  }
}
