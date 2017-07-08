/* @flow */
import type {Exercise} from '../src/core/types';

export const unhandledAction: any = {
  type: 'UNHANDLED-def2e0ff-f173-4d2c-9419-ddacb6f24860',
  payload: {},
};

export const exercise1: Exercise = {
  $schema: 'http://ctrlaltbksp.eu/questionnaire/schema-01.json',
  metadata: {},
  questions: [
    {
      type: 'single-choice',
      text: 'Question #1',
      options: ['Options #1', 'Options #2'],
      solution: 1,
    },
    {
      type: 'multiple-choices',
      text: 'Question #2',
      options: ['Options #1', 'Options #2', 'Options #3'],
      solution: [2, 3],
    },
    {
      type: 'completable-text',
      text: 'There are missing % in % sentence.',
      options: ['words', 'this', 'letters', 'that'],
      solution: {
        '0': 0,
        '1': 1,
      },
    },
  ],
};
