import React, { PropTypes } from 'react';

export default function SimpleChoiceSolution ({question}) {
  const {options, solution} = question;
  return (
    <div className='Solution Solution--simple-choice'>
      <p>{options[solution]}</p>
    </div>
  );
}

SimpleChoiceSolution.propTypes = {
  question: PropTypes.object.isRequired,
};
