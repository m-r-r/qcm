import React, {Component, PropTypes} from 'react';

import {intercalateWith} from '../utils';

const COMPLETION_PATTERN = /\%/;

export default class CompletableText extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    options: PropTypes.string.isRequired,
    value: PropTypes.objectOf(PropTypes.number).isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  componentWillReceiveProps (props) {
    if (props.text !== this.props.text) {
      this.setState({
        textParts: props.text.split(COMPLETION_PATTERN).map(
          (text) => props.text.replace('%%', '%')
        ),
      });
    }
  }

  render () {
    const {options, value, disabled} = this.props;
    const {textParts} = this.state;

    const selectOptions = options.map(
      (opt, index) => <option value={index}>{opt}</option>
    );

    return (
      <div className='CompletableText'>
      {
        intercalateWith(textParts, (index) => (
          <select onChange={this.handleSelectChange.bind(this, index)}
                  disabled={disabled}
                  value={value[index]}>
            <option value={null}></option>
            {selectOptions}
          </select>
        ))
      }
      </div>
    );
  }

  handleSelectChange (index, event) {
    const {onChange, value} = this.props;
    onChange({...value, [index]: Number(event.target.value)});
  }
}
