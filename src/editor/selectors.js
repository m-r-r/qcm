/* @flow */
import type {State, MetadataFields} from './types';

export const isReadOnly = (state: State): boolean => state.isSaving;

export const getMetadata = (state: State): MetadataFields => state.metadata;
