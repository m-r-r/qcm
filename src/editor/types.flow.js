/* @flow */

import type {Exercise, Question, Answer, QuestionType} from '../core/types';
export type {Exercise, Question, Answer, QuestionType};

export type MetadataFields = $PropertyType<Exercise, 'metadata'>;

export type ErrorCode =
  | 'SAVE_AUTHENTICATION_ERROR'
  | 'SAVE_SERVER_ERROR'
  | 'UNKNOWN_ERROR';

export type Action =
  | {type: 'LOAD_EXERCISE', +payload: {|+exercise: Exercise, +url: ?string|}}
  | {type: 'SAVE_EXERCISE', +payload: {||}}
  | {type: 'SAVE_EXERCISE_SUCCESS', +payload: {||}}
  | {
      type: 'SAVE_EXERCISE_FAILURE',
      +error: true,
      +payload: {|+errorCode: ErrorCode|},
    }
  | {type: 'UPDATE_EXERCISE_METADATA', +payload: MetadataFields}
  | {type: 'ADD_QUESTION', +payload: {|+type: QuestionType|}}
  | {type: 'REMOVE_QUESTION', +payload: {|+questionId: string|}};

export type State = {
  +isSaving: boolean,
  +saveError: ErrorCode | null,
  +url: ?string,
  +metadata: $PropertyType<Exercise, 'metadata'>,
  +questions: QuestionsState,
};

export type QuestionsState = {
  +byIds: {[id: string]: QuestionState},
  +order: string[],
  +currentId: string | null,
};

type QuestionStateBase = {
  +id: string,
  +isValid: boolean,
  +text: string,
  +options: {
    [key: string]: Option,
  },
};

export type QuestionState = QuestionStateBase &
  (
    | {
        +type: 'choices',
        +isMultiple: boolean,
      }
    | {
        +type: 'completable-text',
        +tokens: any[],
        +positions: {[pos: string]: ?OptionId},
      });

export type OptionId = string;
export type Option = {
  +id: OptionId,
  +text: string,
  +isCorrect?: boolean,
};
