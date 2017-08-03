/* @flow */
import React from 'react';
import Markup from '../../common/components/Markup';
export type Props = {metadata: Object};

export default function StartScreen(props: Props) {
  const {metadata} = props;
  return (
    <div className="StartScreen">
      <h1 className="StartScreen__title">{metadata.title}</h1>
      <Markup
        className="StartScreen__instructions"
        value={metadata.instructions}
      />
    </div>
  );
}
