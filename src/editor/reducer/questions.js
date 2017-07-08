/* @flow */
import type {
  Action,
  QuestionType,
  QuestionState,
  QuestionsState,
  Option,
} from '../types';
import {newId} from '../utils';
import {LOAD_EXERCISE, ADD_QUESTION, REMOVE_QUESTION} from '../constants';

export const INITIAL_STATE: QuestionsState = {
  byIds: {},
  order: [],
  currentId: null,
};

export default function rootReducer(
  state: QuestionsState = INITIAL_STATE,
  action: Action
): QuestionsState {
  switch (action.type) {
    case (LOAD_EXERCISE: 'LOAD_EXERCISE'): {
      const {questions} = action.payload.exercise;
      const byIds = questions.reduce((byIds, question) => {
        const id = newId('q');
        byIds[id] = {
          ...question,
          isValid: true,
          id: newId('q'),
        };
        return byIds;
      }, {});
      // $FlowFixMe
      const order = questions.map(question => question.id);
      return {
        ...INITIAL_STATE,
        byIds,
        order,
      };
    }

    case ADD_QUESTION: {
      const question = newQuestion(action.payload.type);
      const {byIds, order} = state;
      return {
        ...state,
        byIds: {
          ...byIds,
          [question.id]: question,
        },
        order: order.concat(question.id),
        currentId: question.id,
      };
    }

    case REMOVE_QUESTION: {
      const {questionId} = action.payload;
      const byIds = {...state.byIds};
      const {currentId, order} = state;
      delete byIds[questionId];
      return {
        ...state,
        byIds,
        order: order.filter(id => id !== questionId),
        currentId: currentId === questionId ? null : currentId,
      };
    }

    default: {
      return state;
    }
  }
}

function newQuestion(type: QuestionType): QuestionState {
  const stateProps: any = {
    id: newId('q'),
    isValid: false,
    text: '',
    options: {},
  };

  switch (type) {
    case 'single-choice':
    case 'multiple-choices':
      return {
        ...stateProps,
        type: 'single-choice',
        isMultiple: type === 'multiple-choices',
      };
    case 'completable-text':
      return {
        ...stateProps,
        type: 'completable-text',
        positions: {},
      };
    default:
      throw new Error('not implemented');
  }
}

function loadQuestion(question: Question): QuestionState {
  const questionState = newQuestion(question.type);
  const {solution} = question;
  
  switch (question.type) {
    case 'single-choice':
    case 'multiple-choices': {
      questionState.options = questions.options.map((text, index) => ({
        id: newId('o'),
        text,
        isCorrect: Array.isArray(solution) ? solution.indexOf(index) > -1 : solution === 'index',
      }));
    }
    case 'completable-text': {
      questionState.options = questions.options.map((text, index) => {
        id: newId('o'),
        text,
      });
    }
    default:
      throw new Error('not implemented');
  }
  
  return questionState;
}