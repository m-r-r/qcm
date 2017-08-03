/* @flow */
import {steps} from './reducer';
import type {State, Question, QuestionState, Option} from './types';
import type {Solution, CompleteTextQuestion} from '../../core/types';
import {extractPlaceholders} from '../../core/markup';

export const getQuestions = createSelector(
  (state: State) => state.questions,
  (questions: Question[]) => questions.map(loadQuestion)
);

export const currentQuestion = createSelector(
  state => state.step,
  state => state.currentQuestionIndex,
  getQuestions,
  (step, currentQuestionIndex, questions) => {
    switch (step) {
      case steps.INPUT:
      case steps.SOLUTION:
        return questions[currentQuestionIndex];
      default:
        return null;
    }
  }
);

export function currentQuestionAnswer(state) {
  if (state.step === steps.INPUT) {
    return state.userAnswers[state.currentQuestionIndex];
  } else {
    return null;
  }
}

export function currentQuestionScore(state) {
  if (state.step === steps.SOLUTION) {
    return state.userScore[state.currentQuestionIndex];
  } else {
    return null;
  }
}

const getPlaceholders = createSelector((question: CompleteTextQuestion) =>
  extractPlaceholders(question.text)
);

export const getCompleteTextOptions = createSelector(
  (question: CompleteTextQuestion): Option[] => {
    const placeholders = getPlaceholders(question);
    return placeholders.filter(p => p.length > 0).map((text, id) => ({
      id,
      text,
    }));
  }
);

export const getCompleteTextSolution = createSelector(
  (question: CompleteTextQuestion): Solution => {
    const placeholders = getPlaceholders(question);
    const options = getOptions(question);
    return placeholders.map(placeholder => {
      if (placeholder.length < 1) {
        return null;
      }
      const option = options.find(opt => opt.text === placeholder);
      return option ? option.id : null;
    });
  }
);

export function loadQuestion(question: Question): QuestionState {
  switch (question.type) {
    case 'choices':
      return {
        ...question,
        isMultiple: Array.isArray(question.solution),
      };
    case 'complete-text':
      return {
        ...question,
      };
    default:
      throw new TypeError('Not implemented');
  }
}
