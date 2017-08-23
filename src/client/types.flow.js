/* @flow */

import type {
  SerializedExercise,
  SerializedQuestion,
  ChoiceId,
  RichText,
} from '../common/types';

export type Action =
  | {type: 'LOAD_EXERCISE', +uri: string}
  | {
      type: 'LOAD_EXERCISE_SUCCESS',
      +metadata: ExerciseMetadata,
      +questions: QuestionState[],
      +maxScore: number,
    }
  | {type: 'LOAD_EXERCISE_FAILURE', +error: true, +errorCode: string}
  | {type: 'START_EXERCISE'}
  | {type: 'SUBMIT_ANSWER', +answer: Answer}
  | {type: 'NEXT_QUESTION'}
  | {type: 'PREVIOUS_QUESTION'}
  | {type: 'SHOW_ANSWERS'};

export type ExerciseMetadata = $PropertyType<SerializedExercise, 'metadata'>;

export type Choice = {
  id: ChoiceId,
  isCorrect: boolean,
  text: RichText,
};

export type QuestionId = string;

export type ChoicesState = {|
  +id: QuestionId,
  +type: 'choices',
  +text: RichText,
  +choices: Choice[],
|} & (
  | {
      +solution: ChoiceId,
      +isMultiple: false,
      +userAnswer: ?ChoiceId,
    }
  | {
      +solution: ChoiceId[],
      +isMultiple: true,
      +userAnswer: ?(ChoiceId[]),
    });

export type CompleteTextState = {|
  +id: QuestionId,
  +type: 'complete-text',
  +text: RichText,
  +options: Array<{
    id: ChoiceId,
    text: RichText,
    position: number,
  }>,
  +userAnswer: ?Array<ChoiceId | null>,
|};

export type QuestionState = ChoicesState | CompleteTextState;

export type Answer = ChoiceId | ChoiceId[] | Array<ChoiceId | null>;

export type State =
  | {
      status: 'loading',
    }
  | {
      status: 'loadError',
      error: string,
    }
  | {
      status: 'ready',
      metadata: ExerciseMetadata,
      questions: QuestionState[],
      score: {
        max: number,
        total: 0,
      },
    }
  | {
      status: 'askQuestion',
      metadata: ExerciseMetadata,
      questions: QuestionState[],
      score: {
        max: number,
        total: number,
      },
      currentQuestionIndex: number,
    }
  | {
      status: 'finished',
      metadata: ExerciseMetadata,
      questions: QuestionState[],
      score: {
        max: number,
        total: number,
      },
    }
  | {
      status: 'showAnswer',
      metadata: ExerciseMetadata,
      questions: QuestionState[],
      score: {
        max: number,
        total: number,
      },
      currentQuestionId: number,
    };
