/* @flow */

import type { Exercise, Question, Answer } from '../core/types';
export type { Exercise, Question, Answer };

export type Action =
  | { type: 'LOAD_EXERCISE', +payload: {| +uri: string |} }
  | { type: 'LOAD_EXERCISE_SUCCESS', +payload: {| +exercise: Exercise |} }
  | { type: 'LOAD_EXERCISE_FAILURE', +error: true, +payload: {| +error: Error |} }
  | { type: 'LOAD_EXERCISE_FAILURE', +error: true, +payload: {| +error: Error |} }
  | { type: 'START_EXERCISE', +payload: {| |} }
  | { type: 'ANSWER_QUESTION', +payload: {| +answer: Object |} }
  | { type: 'VALIDATE_ANSWER', +payload: {| +score: number |} }
  | { type: 'NEXT_QUESTION', +payload: {| |} }
  ;

type Step =
  | 'FAILURE'
  | 'LOADING'
  | 'READY'
  | 'INPUT'
  | 'SOLUTION'
  | 'FINISHED'
  ;

export type State = {
  step: 'LOADING' | 'FAILURE' | 'READY' | 'INPUT' | 'SOLUTION' | 'FINISHED',
  metadata: $PropertyType<Exercise, 'metadata'>,
  questions: $PropertyType<Exercise, 'questions'>,
  error: null | Error,
  currentQuestionIndex: number | null,
  userAnswers: {
    [questionIdx: number]: Answer
  },
  userScore: {
    total?: number,
    max?: number,
  },
};