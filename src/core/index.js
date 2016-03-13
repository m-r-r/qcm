import tv4 from 'tv4';

import { arePermutations, propertiesEqual } from '../utils';
import exerciseSchema from './schema.json';

tv4.addSchema(exerciseSchema.id, exerciseSchema);

export const validateExerciseObject = (json) => {
  const result = tv4.validate(json, exerciseSchema);
  validateExerciseObject.errors = tv4.error ? [tv4.error] : [];
  return result;
};

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
