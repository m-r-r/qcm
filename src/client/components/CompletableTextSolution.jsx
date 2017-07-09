/* @flow */
import React from 'react';
import Markup from '../../core/components/Markup';

export type Props = {question: Object};

export default function CompletableTextSolution(props: Props) {
  const {question} = props;
  const {text, options, solution} = question;
  let index = 0;
  return (
    <div className="Solution Solution--completable-text">
      <Markup placeholderComponent="var" value={text} />
    </div>
  );
}
