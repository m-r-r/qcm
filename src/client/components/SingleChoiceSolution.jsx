/* @flow */
import React from 'react';
import Markup from '../../common/components/Markup';

export type Props = {question: Object};

export default function SingleChoiceSolution(props: Props) {
  const {question} = props;
  const {options, solution} = question;
  return (
    <div className="Solution Solution--single-choice">
      <Markup inline tagName="p" value={options[solution]} />
    </div>
  );
}
