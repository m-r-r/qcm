/* @flow */
import React from 'react';

export type Props = { question: Object };

export default function SingleChoiceSolution (props: Props) {
  const {question} = props;
  const {options, solution} = question;
  return (
    <div className='Solution Solution--single-choice'>
      <p>{options[solution]}</p>
    </div>
  );
}
