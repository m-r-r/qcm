import React, { PropTypes } from 'react';

export default function SingleChoiceSolution ({question}) {
  const {options, solution} = question;
  return (
    <div className='Solution Solution--single-choice'>
      <p>{options[solution]}</p>
    </div>
  );
}

SingleChoiceSolution.propTypes = {
  question: PropTypes.object.isRequired,
};
