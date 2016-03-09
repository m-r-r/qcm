import { take, put, call, fork } from 'redux-saga/effects';
import { NetworkError, DecodeError } from './errors';
import { validateAnswer, validateExerciseObject } from '../core';
import * as actions from './actions';

export function * watchLoadExercise () {
  while (true) {
    let {payload} = yield take(actions.LOAD_EXERCISE);
    var json;
    try {
      let request = yield call(fetch, payload.uri);
      json = yield call(request.json.bind(request));
    } catch (err) {
      yield put(actions.loadExerciseFailure(new NetworkError(payload.uri)));
    }

    if (validateExerciseObject(json) || true) {
      yield put(actions.loadExerciseSuccess(json));
    } else {
      yield put(actions.loadExerciseFailure(new DecodeError(payload.uri, validateExerciseObject.errors)));
    }
  }
}

export function * watchAnswerQuestion (getState) {
  while (true) {
    let {payload: {answer}} = yield take(actions.ANSWER_QUESTION);

    let state = getState();
    let question = state.questions[state.currentQuestion];
    yield put(actions.validateAnswer(validateAnswer(question, answer)));
  }
}

export default function * rootSaga (getState) {
  yield fork(watchLoadExercise);
  yield fork(watchAnswerQuestion, getState);
}
