import React, {Component, PropTypes} from 'react';

import {newId} from '../utils';

export default class SingleChoice extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.number,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    disabled: false,
    onChange: () => void 0,
    value: null,
  };

  componentWillMount () {
    this.radiosName = newId('simple-choice-form-');
  }

  render () {
    const {text, options, value, disabled} = this.props;

    return (
      <div className='SingleChoice'>
        <p className='SingleChoice__text'>{text}</p>
        <ul>
        {
          options.map((option, index) => {
            const id = this.radiosName + '-' + index;
            return (
              <li key={index} className='SingleChoice__choice'>
                <input type='radio' className='SingleChoice__checkbox'
                       id={id} tabIndex={index + 1} autoFocus={index === 0}
                       name={this.radiosName} value={index} checked={value === index}
                       disabled={disabled} onChange={this.handleCheckboxChange.bind(this, index)} />
                <label htmlFor={id}>{option}</label>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }

  handleCheckboxChange (index, event) {
    const checked = Number(event.target.value);
    this.props.onChange(checked);
  }
}
