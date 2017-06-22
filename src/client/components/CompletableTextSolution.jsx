/* @flow */
import React, { PropTypes } from 'react';

import {intercalateWith, splitText} from '../../utils';

export type Props = { question: Object };

export default function CompletableTextSolution(props: Props) {
  const {question} = props;
  const {text, options, solution} = question;
  return (
    <div className='Solution Solution--completable-text'>
      <p>
      {
        intercalateWith(splitText(text), (index) => {
          return <var key={index}>{options[solution[index]]}</var>;
        })
      }
      </p>
    </div>
  );
}
