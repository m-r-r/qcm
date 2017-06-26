/* @flow */
import React, { Component } from 'react';

import { newId } from '../../utils';

type Props = {
  text: string,
  options: string[],
  value: number[],
  disabled: bool,
  onChange: Function,
};

type State = {
  checked: {
    [option: number]: bool,
  },
};

export default class MultipleChoice extends Component {
  static defaultProps = {
    disabled: false,
    onChange: () => void 0,
    value: null,
  };
  
  props: Props;
  state: State;
  
  id: string = newId('choice');
  
  handleCheckboxChange = this.handleCheckboxChange.bind(this);
  
  constructor (props: $Shape<Props>, context: Object) {
    super(props, context);
    
    const {value, options} = this.props;
    this.state = {
      checked: checkedIndexes(value, options),
    };
  }

  componentWillReceiveProps (props: Props) {
    if (props.value !== this.props.value) {
      this.setState({checked: checkedIndexes(props.value, props.options)});
    }
  }

  render () {
    const {text, options, disabled} = this.props;
    const {checked} = this.state;

    return (
      <div className='MultipleChoices'>
        <p className='MultipleChoices__text'>{text}</p>
        <ul className='MultipleChoices__choices'>
        {
          options.map((option, index) => {
            const id = this.id + '-' + index;
            return (
              <li key={index} className='MultipleChoices__choice'>
                <input type='checkbox' className='MultipleChoices__checkbox'
                       checked={!!checked[index]} autoFocus={index === 0}
                       data-index={index} tabIndex={index + 1} id={id}
                       disabled={disabled} onChange={this.handleCheckboxChange} />
                <label htmlFor={id}>{option}</label>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }

  handleCheckboxChange (event: SyntheticInputEvent) {
    const {onChange} = this.props;
    let {checked} = this.state;
    const index: number = Number(event.target.getAttribute('data-index'));

    checked = {
      ...checked,
      [index]: !checked[index],
    };

    this.setState({checked});
    onChange(Object.keys(checked).map(Number).filter((key) => checked[key]));
  }
}

const checkedIndexes = (value: number[] | null, options: string[]): $PropertyType<State, 'checked'> => {
  return options.reduce((acc, text, index) => {
    acc[index] = value && value.indexOf(index) !== -1;
    return acc;
  }, {});
};