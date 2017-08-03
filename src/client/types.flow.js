/* @flow */

import type {
  SerializedExercise,
  SerializedQuestion,
  ChoiceId,
  RichText,
} from '../common/types';

export type Action =
  | {type: 'LOAD_EXERCISE', +payload: {|+uri: string|}}
  | {type: 'LOAD_EXERCISE_SUCCESS', +payload: {|+exercise: SerializedExercise|}}
  | {type: 'LOAD_EXERCISE_FAILURE', +error: true, +payload: {|+error: Error|}}
  | {type: 'LOAD_EXERCISE_FAILURE', +error: true, +payload: {|+error: Error|}}
  | {type: 'START_EXERCISE', +payload: {||}}
  | {type: 'ANSWER_QUESTION', +payload: {|+answer: Object|}}
  | {type: 'VALIDATE_ANSWER', +payload: {|+score: number|}}
  | {type: 'NEXT_QUESTION', +payload: {||}};

export type Choice = {
  id: ChoiceId,
  isCorrect: boolean,
  text: RichText,
};

export type QuestionId = string;

export type ChoicesState = {
  +id: QuestionId,
  +type: 'choices',
  +text: RichText,
  +choices: Choice[],
} & (
  | {
      +solution: ChoiceId,
      +isMultiple: false,
      +userAnswer: ?ChoiceId,
    }
  | {
      +solution: ChoiceId[],
      +isMultiple: true,
      +userAnswer: ?(ChoiceId[]),
    });

export type CompleteTextState = {
  +id: QuestionId,
  +type: 'complete-text',
  +text: RichText,
  +options: Array<{
    id: ChoiceId,
    text: RichText,
    position: number,
  }>,
  +userAnswer: ?Array<ChoiceId | null>,
};

export type QuestionState = ChoicesState | CompleteTextState;

export type Answer = ChoiceId | ChoiceId[] | Array<ChoiceId | null>;

export type State =
  | {
    // The exercise is loading
    +isLoading: true,
    +error: null,
  }
  | {
    // The exercise cannot be loaded
    +isLoading: false,
    +error: Error,
  }
  | ({
    // The exercise is loaded
    +isLoading: false,
    +error: null,
    +metadata: $PropertyType<SerializedExercise, 'metadata'>,
    +questions: {[id: QuestionId]: QuestionState[]},
    +userScore: {
      total?: number,
      max?: number,
    },
  } & (
    | {
        // The start screen is displayed to the user
        +showAnswers: false,
        +currentQuestionId: null,
        +isFinished: false,
      }
    | {
        // The current question is displayed to the user
        +showAnswers: false,
        +currentQuestionId: QuestionId,
        +isFinished: false,
      }
    | {
        // The user answered to all the questions
        +showAnswers: false,
        +currentQuestionId: null,
        +isFinished: true,
      }
    | {
        // The answers are displayed to the user
        +showAnswers: true,
        +currentQuestionId: QuestionId,
        +isFinished: true,
      }));
