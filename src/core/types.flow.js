/* @flow */

export type Question =
  | {
      type: 'single-choice',
      options: string[],
      solution: number,
    }
  | {
      type: 'multiple-choices',
      options: string[],
      solution: number[],
    }
  | {
      type: 'completable-text',
      options: string[],
      solution: {[pos: string]: number | null},
    };

export type QuestionType = $PropertyType<Question, 'type'>;

export type Answer = number | number[] | {[pos: string]: number | null};

export type Exercise = {
  metadata?: {
    title?: string,
    instructions?: string,
    explainations?: string,
    gradingScale?: number | '%',
  },
  questions: Question[],
};
