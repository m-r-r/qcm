/* @flow */
import type {Exercise, Question, Answer} from './types';
import tv4 from 'tv4';

import {arePermutations, propertiesEqual} from '../utils';
import exerciseSchema from './schema.json';

tv4.addSchema(exerciseSchema.id, exerciseSchema);

export const validateExerciseObject = (json: Object): boolean => {
  const result = tv4.validate(json, exerciseSchema);
  validateExerciseObject.errors = tv4.error ? [tv4.error] : [];
  return result;
};

export function isCorrectAnswer(
  question: Question,
  answer: Answer
): boolean | Error {
  switch (question.type) {
    case 'single-choice':
      return answer === question.solution;
    case 'multiple-choices':
      return (
        Array.isArray(answer) && arePermutations(answer, question.solution)
      );
    case 'completable-text':
      return (
        answer instanceof Object && propertiesEqual(answer, question.solution)
      );
    default:
      return new Error('not implemented');
  }
}

export function questionCoefficient(question: Question): number {
  if (typeof question.coefficient === 'number' && question.coefficient > 0) {
    return question.coefficient;
  } else {
    return 1;
  }
}

const addCoeff = (total: number, question: Question): number => {
  return total + questionCoefficient(question);
};

export function exerciseMaxScore({questions}: Exercise): number {
  if (Array.isArray(questions)) {
    return questions.reduce(addCoeff, 0);
  } else {
    return 0;
  }
}
