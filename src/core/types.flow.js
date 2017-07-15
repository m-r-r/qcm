/* @flow */

type RichText = string;
export type OptionId = string | number;

export type Option = {
  id: OptionId,
  text: RichText,
};

export type ChoicesQuestion = {
  type: 'choices',
  text: RichText,
  options: Option[],
  solution: OptionId | OptionId[],
};

export type CompleteTextQuestion = {
  type: 'completable-text',
  text: RichText,
};

export type Question = ChoicesQuestion | CompleteTextQuestion;

export type Solution = OptionId | OptionId[] | Array<?OptionId>;
export type Answer = Solution;

export type Exercise = {
  metadata?: {
    title?: string,
    instructions?: string,
    explainations?: string,
    gradingScale?: number | '%',
  },
  questions: Question[],
};
