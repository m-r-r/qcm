import React, { PropTypes } from 'react';
import { round10 } from '../utils';

export default function EndScreen ({metadata, score, scale}) {
  const total = round10(scale === '%' ? 100 : scale, -2);
  const grade = round10(score * total, -2);
  return (
    <div className='EndScreen'>
      <h2>Terminé !</h2>
      {
        metadata.explainations && (
          <p className='EndScreen__explainations'>{metadata.explainations}</p>
        )
      }
      <p>Votre score :
        {' '}
        <span className='EndScreen__score'>
          <var>{grade.toLocaleString()}{scale === '%' ? '%' : ''}</var>
          {
            scale !== '%' && (
              <var>/{total.toLocaleString()}</var>
            )
          }
        </span>
      </p>
    </div>
  );
}

EndScreen.propTypes = {
  metadata: PropTypes.object.isRequired,
  scale: PropTypes.oneOfType([
    PropTypes.oneOf(['%']),
    PropTypes.number,
  ]).isRequired,
  score: PropTypes.number.isRequired,
};

EndScreen.defaultProps = {
  scale: '%',
};
