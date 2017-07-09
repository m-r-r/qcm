/* @flow */
import React from 'react';
import Markup from '../../core/components/Markup';
import {round10} from '../../utils';

export type Props = {
  metadata: Object,
  scale: '%' | number,
  score: number,
};

export default function EndScreen(props: Props) {
  const {metadata, score, scale} = props;
  const total = round10(scale === '%' ? 100 : scale, -2);
  const grade = round10(score * total, -2);
  return (
    <div className="EndScreen">
      <h2>Terminé !</h2>
      {metadata.explainations &&
        <Markup
          className="EndScreen__explainations"
          value={metadata.explainations}
        />}
      <p>
        Votre score :
        {' '}
        <span className="EndScreen__score">
          <var>{grade.toLocaleString()}{scale === '%' ? '%' : ''}</var>
          {scale !== '%' && <var>/{total.toLocaleString()}</var>}
        </span>
      </p>
    </div>
  );
}

EndScreen.defaultProps = {
  scale: '%',
};
