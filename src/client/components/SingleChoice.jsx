/* @flow */
import React, {Component} from 'react';
import Markup from '../../common/components/Markup';

import {newId} from '../../utils';

type Props = {
  text: string,
  options: string[],
  value: number,
  disabled: boolean,
  onChange: Function,
};

export default class SingleChoice extends Component {
  static defaultProps = {
    disabled: false,
    onChange: () => void 0,
    value: null,
  };

  props: Props;

  radiosName: string;

  componentWillMount() {
    this.radiosName = newId('simple-choice-form-');
  }

  render() {
    const {text, options, value, disabled} = this.props;

    return (
      <div className="SingleChoice">
        <Markup className="SingleChoice__text" value={text} />
        <ul className="SingleChoice__choices">
          {options.map((option, index) => {
            const id = this.radiosName + '-' + index;
            return (
              <li key={index} className="SingleChoice__choice">
                <input
                  type="radio"
                  className="SingleChoice__checkbox"
                  id={id}
                  tabIndex={index + 1}
                  autoFocus={index === 0}
                  name={this.radiosName}
                  value={index}
                  checked={value === index}
                  disabled={disabled}
                  onChange={this.handleCheckboxChange.bind(this, index)}
                />
                <Markup inline tagName="label" value={option} htmlFor={id} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  handleCheckboxChange(index: number, event: SyntheticInputEvent) {
    const checked = Number(event.target.value);
    this.props.onChange(checked);
  }
}
