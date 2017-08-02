/* @flow */

import type {
  Exercise,
  Question,
  ChoiceQuestion,
  CompleteTextQuestion,
  Option,
  OptionId,
  Answer,
} from '../core/types';
export type {Answer};

export type Action =
  | {type: 'LOAD_EXERCISE', +payload: {|+uri: string|}}
  | {type: 'LOAD_EXERCISE_SUCCESS', +payload: {|+exercise: Exercise|}}
  | {type: 'LOAD_EXERCISE_FAILURE', +error: true, +payload: {|+error: Error|}}
  | {type: 'LOAD_EXERCISE_FAILURE', +error: true, +payload: {|+error: Error|}}
  | {type: 'START_EXERCISE', +payload: {||}}
  | {type: 'ANSWER_QUESTION', +payload: {|+answer: Object|}}
  | {type: 'VALIDATE_ANSWER', +payload: {|+score: number|}}
  | {type: 'NEXT_QUESTION', +payload: {||}};


export type Choice = {
  id: OptionId,
  isCorrect: boolean,
  text: RichText,
};

export type ChoicesQuestion = {
  type: 'choices',
  text: RichText,
  choices: Choice[],
};

export type CompleteTextQuestion = {
  type: 'completable-text',
  text: RichText,
  options: Array<{
    id: number,
    text: RichText,
    position: number,
  }>
};
export type ChoicesQuestionState = ChoicesQuestion &
  (
    | {
        solution: number,
        isMultiple: false,
      }
    | {
        solution: number[],
        isMultiple: true,
      });

export type CompleteTextQuestionState = CompleteTextState & {
  solution: Array<string | null>,
  options: Option[],
};

export type QuestionState = ChoicesQuestionState | CompleteTextQuestionState;

export type State = {
  step: 'LOADING' | 'FAILURE' | 'READY' | 'INPUT' | 'SOLUTION' | 'FINISHED',
  metadata: $PropertyType<Exercise, 'metadata'>,
  questions: $PropertyType<Exercise, 'questions'>,
  error: null | Error,
  currentQuestionIndex: number | null,
  userAnswers: {
    [questionIdx: number]: Answer,
  },
  userScore: {
    total?: number,
    max?: number,
  },
};
