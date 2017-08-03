/* @flow */
import React, {Component} from 'react';
import Markup from '../../common/components/Markup';
import type {Option, OptionId} from '../types';
import {newId} from '../../utils';

type Props = {
  text: string,
  options: string[],
  value: OptionId[] | OptionId,
  disabled: boolean,
  onChange: Function,
} & ({
  | isMultiple: true, 
    value: ?Array<OptionId>
  
  } | {
    isMltiple: false, 
    value: ?OptionId,
    
  });

type State = {
  checked: {
    [option: OptionId]: boolean,
  },
};

export default class MultipleChoice extends Component {
  static defaultProps = {
    disabled: false,
    onChange: () => void 0,
    value: null,
  };

  props: Props;
  state: State = {
    checked: {},
  };

  id: string = newId(this.constructor.name);

  handleCheckboxChange = this.handleCheckboxChange.bind(this);

  componentWillReceiveProps(props: Props) {
    if (props.value !== this.props.value) {
      this.setState({checked: checkedIndexes(props.value, props.options)});
    }
  }
  
  isChecked(id: OptionId) {
    const {value} = this.props;
    if (Array.isArray(value)) {
      return value.indexOf(id) !== -1;
    } else {
      return value === id;
    }
  }

  render() {
    const {text, options, disabled} = this.props;
    const {checked} = this.state;

    return (
      <div className="MultipleChoices">
        <Markup className="MultipleChoices__text" value={text} />
        <ul className="MultipleChoices__choices">
          {options.map(({id, text}, index) => {
            const htmlId = `${this.id}-${id}`;
            return (
              <li key={htmlId} className="MultipleChoices__choice">
                <input
                  type="checkbox"
                  className="MultipleChoices__checkbox"
                  checked={this.isChecked(id)}
                  autoFocus={index === 0}
                  data-id={id}
                  id={htmlId}
                  disabled={disabled}
                  onChange={this.handleCheckboxChange}
                />
                <Markup inline tagName="label" value={option} htmlFor={htmlId} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  handleCheckboxChange(event: SyntheticInputEvent) {
    const {onChange} = this.props;
    let {checked} = this.state;
    const {id} = event.target;

    if (this.isChecked(id)) {
      
    }

    this.setState({checked});
    onChange(Object.keys(checked).map(Number).filter(key => checked[key]));
  }
}

const checkedIndexes = (
  value: number[] | null,
  options: string[]
): $PropertyType<State, 'checked'> => {
  return options.reduce((acc, text, index) => {
    acc[index] = value && value.indexOf(index) !== -1;
    return acc;
  }, {});
};
