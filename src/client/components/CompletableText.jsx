/* @flow */
import React, { Component, PropTypes } from 'react';

import {intercalateWith, splitText} from '../../utils';

type Props = {
  text: string,
  options: string[],
  value: {[key: number]: number},
  disabled: bool,
  onChange: Function,
};

export default class CompletableText extends Component {
  props: Props;

  static defaultProps = {
    disabled: false,
    onChange: () => void 0,
    value: null,
  };
  
  state = {
    textParts: [],
  };

  handleSelectChange = this.handleSelectChange.bind(this);

  componentWillReceiveProps (props: Props) {
    if (props.text !== this.props.text) {
      this.setState({
        textParts: splitText(props.text),
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
                  disabled={disabled} autoFocus={index === 0}
                  data-index={index} key={index} tabIndex={index + 1}
                  value={value !== null ? value[index] : null}>
            <option value={null} key={-1}></option>
            {selectOptions}
          </select>
        ))
      }
      </div>
    );
  }

  handleSelectChange (event: SyntheticEvent) {
    const {onChange, value} = this.props;
    const target: HTMLSelectElement = (event.target : any);
    const index: number = Number(target.getAttribute('data-index'));
    onChange({...value, [index]: Number(target.value)});
  }
}
