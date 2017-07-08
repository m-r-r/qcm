/* @flow */
import {test} from 'tape';
import rootReducer, {INITIAL_STATE} from '../../../src/editor/reducer';
import {unhandledAction, exercise1} from '../../fixtures';

test('root reducer', t => {
  t.test('it follows the reducer protocol', t => {
    t.plan(2);

    t.equal(
      rootReducer(undefined, unhandledAction),
      INITIAL_STATE,
      'it must return the initial state'
    );

    t.equal(
      rootReducer(INITIAL_STATE, unhandledAction),
      INITIAL_STATE,
      'it must ignore unknown actions'
    );
  });

  t.test('it handles LOAD_EXERCISE', t => {
    const loadedState = rootReducer(INITIAL_STATE, {
      type: 'LOAD_EXERCISE',
      payload: {
        exercise: exercise1,
        url: null,
      },
    });

    t.deepEqual(loadedState.metadata, exercise1.metadata);
    t.equal(loadedState.questions.order.length, exercise1.questions.length);
    t.end();
  });

  const savingState = rootReducer(INITIAL_STATE, {
    type: 'SAVE_EXERCISE',
    payload: {},
  });

  t.test('it handles SAVE_EXERCISE', t => {
    t.deepEqual(savingState, {
      ...INITIAL_STATE,
      isSaving: true,
      saveError: null,
    });
    t.end();
  });

  t.test('it handles SAVE_EXERCISE_SUCCESS', t => {
    t.deepEqual(
      rootReducer(savingState, {
        type: 'SAVE_EXERCISE_SUCCESS',
        payload: {},
      }),
      {
        ...INITIAL_STATE,
        isSaving: false,
        saveError: null,
      }
    );
    t.end();
  });

  t.test('it handles SAVE_EXERCISE_FAILURE', t => {
    t.deepEqual(
      rootReducer(savingState, {
        type: 'SAVE_EXERCISE_FAILURE',
        error: true,
        payload: {
          errorCode: 'UNKNOWN_ERROR',
        },
      }),
      {
        ...INITIAL_STATE,
        isSaving: false,
        saveError: 'UNKNOWN_ERROR',
      }
    );
    t.end();
  });
});
