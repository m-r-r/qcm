/* @flow */
import type {
  State,
  MetadataFields,
  QuestionsState,
  QuestionState,
} from './types';
import {createSelector} from 'reselect';

export const isReadOnly = (state: State): boolean => state.isSaving;

export const getMetadata = (state: State): MetadataFields => state.metadata;

const getQuestionsState = (state: State): QuestionsState => state.questions;

export const getQuestions = createSelector(
  getQuestionsState,
  (questions: QuestionsState) => questions.order.map(id => questions.byIds[id])
);
