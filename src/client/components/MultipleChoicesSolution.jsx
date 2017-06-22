/* @flow */
import React, { PropTypes } from 'react';

export type Props = { question: Object };

export default function MultipleChoicesSolution(props: Props) {
  const {question} = props;
  const {options, solution} = question;
  const rightOptions = options.filter((text, index) => solution.indexOf(index) !== -1);
  return (
    <div className='Solution Solution--multiple-choices'>
      <ul>
      {
        rightOptions.map((text, index) =>
          <li key={index}>{text}</li>
        )
      }
      </ul>
    </div>
  );
}
