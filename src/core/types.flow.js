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
      solution: {[pos: number]: number | null},
    };

export type Answer = number | number[] | {[pos: number]: number | null};

export type Exercise = {
  metadata?: {
    title?: string,
    instructions?: string,
    explainations?: string,
    grading_scale?: number | '%',
  },
  questions: Question[],
};
