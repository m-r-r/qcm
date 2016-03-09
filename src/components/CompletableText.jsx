import React, {Component, PropTypes} from 'react';

import {intercalateWith, newId} from '../utils';

const COMPLETION_PATTERN = /\%/;

const prepareText = (text) => text.split(COMPLETION_PATTERN).map(
  (text) => text.replace('%%', '%')
);

export default class CompletableText extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.objectOf(PropTypes.number),
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
    this.id = newId('ct');
    this.state = {
      textParts: prepareText(props.text),
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentWillReceiveProps (props) {
    if (props.text !== this.props.text) {
      this.id = newId('ct');
      this.setState({
        textParts: prepareText(props.text),
      });
    }
  }

  render () {
    const {options, value, disabled} = this.props;
    const {textParts} = this.state;

    const selectOptions = options.map(
      (opt, index) => <option value={index} key={index}>{opt}</option>
    );

    return (
      <div className='CompletableText'>
      {
        intercalateWith(textParts, (index) => (
          <select onChange={this.handleSelectChange}
                  disabled={disabled}
                  data-index={index} key={index}
                  value={value !== null ? value[index] : null}>
            <option value={null} key={-1}></option>
            {selectOptions}
          </select>
        ))
      }
      </div>
    );
  }

  handleSelectChange (event) {
    const {onChange, value} = this.props;
    const index = event.target.getAttribute('data-index');
    onChange({...value, [index]: Number(event.target.value)});
  }
}
