/* @flow */

import type {QuestionState} from './types';
import {
  arePermutations,
  propertiesEqual,
  toArray,
  areArraysEqual,
} from '../utils';
import {extractPlaceholders} from '../common/markup';

export function isCorrectAnswer(
  question: QuestionState,
  answer: Answer
): boolean | Error {
  switch (question.type) {
    case 'choices':
      if (Array.isArray(question.solution)) {
        return (
          Array.isArray(answer) && arePermutations(answer, question.solution)
        );
      } else {
        return answer === question.solution;
      }
    case 'complete-text':
      const {options, solution} = question;
      return Array.isArray(answer) && areArraysEqual(answer, question.solution);
    default:
      return new Error('not implemented');
  }
}
