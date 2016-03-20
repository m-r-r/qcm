import React, { PropTypes } from 'react';

import {intercalateWith, splitText} from '../../utils';

export default function CompletableTextSolution ({question}) {
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

CompletableTextSolution.propTypes = {
  question: PropTypes.object.isRequired,
};
