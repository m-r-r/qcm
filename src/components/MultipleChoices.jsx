import React, {Component, PropTypes} from 'react';

export default class MultipleChoice extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.arrayOf(PropTypes.number).isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  getDefaultProps () {
    return {
      disabled: false,
      onChange: () => void 0,
    };
  }

  render () {
    const {text, options, value, disabled} = this.props;

    return (
      <div className='MultipleChoice'>
        <p className='MultipleChoice__text'>{text}</p>
        <ul>
        {
          options.map((option, index) => (
            <li key={index} className='MultipleChoice__choice'>
              <input type='checkbox' className='MultipleChoice__checkbox'
                     value={value.indexOf(index) !== -1}
                     disabled={disabled} onChange={this.handleCheckboxChange.bind(this, index)}>
                {option}
              </input>
            </li>
          ))
        }
        </ul>
      </div>
    );
  }

  handleCheckboxChange (id, event) {
    const {value, onChange} = this.props;
    const checked = !!event.target.value;
    const pos = value.indexOf(id);

    if (pos === -1 && checked) {
      onChange([...value, pos].sort());
    } else if (!checked && pos !== -1) {
      onChange(value.slice(0, pos).concat(value.slice(pos + 1)).sort());
    }
  }
}
