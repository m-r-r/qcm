/* @flow */
import React from 'react';

import { LoadError, NetworkError, DecodeError } from '../errors';

export type Props = {
  error: Error,
  children?: Object,
};

export default function ErrorMessage (props: Props) {
  const {error, children} = props;
  var message = 'Error';
  var details = 'An unknown error occured';
  if (error instanceof LoadError) {
    message = 'Could not load the exercise';
    if (error instanceof NetworkError) {
      details = 'The data could not be downloaded from the Web sever.';
    } else if (error instanceof DecodeError) {
      details = 'Invalid data was received from the Web server.';
    }
  }

  return (
    <div className='ErrorMessage'>
      <h1 className='ErrorMessage__title'>{message}</h1>
      <p className='ErrorMessage__details'>{details}</p>
      {children && <div className='ErrorMessage__children'>{children}</div>}
    </div>
  );
}
