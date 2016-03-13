import React, { PropTypes } from 'react';

import SingleChoiceSolution from './SingleChoiceSolution';
import MultipleChoicesSolution from './MultipleChoicesSolution';
import CompletableTextSolution from './CompletableTextSolution';

const solutionComponent = (question) => {
  switch (question.type) {
    case 'single-choice':
      return SingleChoiceSolution;
    case 'multiple-choices':
      return MultipleChoicesSolution;
    case 'completable-text':
      return CompletableTextSolution;
    default:
      throw new Error('Invalid question type');
  }
};

export default function Result ({question, score}) {
  const component = solutionComponent(question);
  const success = score > 0;
  const className = 'Result Result--' + (success ? 'success' : 'error');
  const message = success ? 'Vous avez répondu juste.' : 'Vous vous avez répondu faux.';

  return (
    <div className={className}>
      <h5 className='Result__title'>{message}</h5>
      {
        success === false && (
          <div>
            <p>La bonne réponse était :</p>
            {
              React.createElement(component, {
                question,
              })
            }
            <p>{question.explainations || false}</p>
          </div>
        )
      }
    </div>
  );
}

Result.propTypes = {
  question: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired,
};
