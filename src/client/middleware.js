/* @flow */
import type {State, Answer, Action} from './types';
import type {Dispatch, MiddlewareAPI as Api} from 'redux';
import {NetworkError, DecodeError} from './errors';
import {currentQuestion} from './selectors';
import {
  isCorrectAnswer,
  validateSerializedExercise,
  questionCoefficient,
} from '../common';
import {
  loadExerciseSuccess,
  loadExerciseFailure,
  validateAnswer,
} from './actions';
import {LOAD_EXERCISE, ANSWER_QUESTION} from './constants';

export default (store: Api<State, Action>) => (next: Dispatch<Action>) => (
  action: Action
): Action => {
  action = next(action);
  switch (action.type) {
    case LOAD_EXERCISE: {
      loadExercise(action.payload.uri, next);
      break;
    }

    case ANSWER_QUESTION: {
      const {answer} = action.payload;
      const state = store.getState();
      const question = currentQuestion(state);
      const coefficient = questionCoefficient(question);
      const success = isCorrectAnswer(question, answer);
      next(validateAnswer(success ? coefficient : 0));
      break;
    }
  }
  return action;
};

async function loadExercise(
  uri: string,
  next: Dispatch<Action>
): Promise<void> {
  try {
    let request = await fetch(uri);
    let json = await request.json();
    if (validateSerializedExercise(json)) {
      next(loadExerciseSuccess(json));
    } else {
      next(
        loadExerciseFailure(
          new DecodeError(uri, validateSerializedExercise.errors)
        )
      );
    }
  } catch (err) {
    next(loadExerciseFailure(new NetworkError(uri)));
  }
}
