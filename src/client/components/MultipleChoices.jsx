import React, {Component, PropTypes} from 'react';

import { newId } from '../../utils';

const checkedIndexes = (value, options) => {
  if (value === null) {
    return {};
  } else {
    return options.reduce((acc, text, index) => {
      acc[index] = value.indexOf(index) !== -1;
      return acc;
    }, {});
  }
};

export default class MultipleChoice extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.arrayOf(PropTypes.number),
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    disabled: false,
    onChange: () => void 0,
    value: null,
  };

  constructor (props, context) {
    super(props, context);
    this.state = {
      checked: checkedIndexes(props.value, props.options),
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.id = newId('choice');
  }

  componentWillReceiveProps (props) {
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

  handleCheckboxChange (event) {
    const {onChange} = this.props;
    var {checked} = this.state;
    const index = event.target.getAttribute('data-index');

    checked = {
      ...checked,
      [index]: !checked[index],
    };

    this.setState({checked});
    onChange(Object.keys(checked).map(Number).filter((key) => checked[key]));
  }
}