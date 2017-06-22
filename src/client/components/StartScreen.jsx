/* @flow */
import React, { PropTypes } from 'react';

export type Props = { metadata: Object };

export default function StartScreen(props: Props) {
  const {metadata} = props;
  return (
    <div className='StartScreen'>
      <h1 className='StartScreen__title'>{metadata.title}</h1>
      <p className='StartScreen__instructions'>{metadata.instructions}</p>
    </div>
  );
}
