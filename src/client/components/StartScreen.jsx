import React, { PropTypes } from 'react';

export default function StartScreen ({metadata}) {
  return (
    <div className='StartScreen'>
      <h1 className='StartScreen__title'>{metadata.title}</h1>
      <p className='StartScreen__instructions'>{metadata.instructions}</p>
    </div>
  );
}

StartScreen.propTypes = {
  metadata: PropTypes.object.isRequired,
};
