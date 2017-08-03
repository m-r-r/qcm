/* @flow */

export type RichText = string;
export type ChoiceId = string | number;

export type SerializedQuestion =
  | {
      type: 'choices',
      text: RichText,
      options: Array<{
        id: ChoiceId,
        text: RichText,
      }>,
      solution: ChoiceId | ChoiceId[],
    }
  | {
      type: 'complete-text',
      text: RichText,
    };

export type SerializedExercise = {
  metadata?: {
    title?: string,
    instructions?: RichText,
    explanations?: RichText,
    gradingScale?: number | '%',
  },
  questions: SerializedQuestion[],
};
