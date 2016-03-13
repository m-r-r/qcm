import jsen from 'jsen';

import { arePermutations, propertiesEqual } from '../utils';
import exerciseSchema from './schema.json';

export const validateExerciseObject = jsen(exerciseSchema);

export function validateAnswer (question, answer) {
  const {type, solution} = question;

  switch (type) {
    case 'single-choice':
      return answer === solution;
    case 'multiple-choices':
      return arePermutations(answer, solution);
    case 'completable-text':
      return propertiesEqual(answer, solution);
    default:
      return new Error('not implemented');
  }
}

export function questionCoefficient (question) {
  if (typeof question.coefficient === 'number' && question.coefficient > 0) {
    return question.coefficient;
  } else {
    return 1;
  }
}

const addCoeff = (total, question) => total + questionCoefficient(question);

export function exerciseMaxScore ({questions}) {
  if (Array.isArray(questions)) {
    return questions.reduce(addCoeff, 0);
  } else {
    return 0;
  }
}
