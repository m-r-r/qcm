/* @flow */
import React, {Component} from 'react';

import {intercalateWith, splitText} from '../../utils';

type Props = {
  text: string,
  options: string[],
  value: {[key: number]: number},
  disabled: boolean,
  onChange: Function,
};

export default class CompletableText extends Component {
  props: Props;
  textPartsCache: ?Array<string>;

  static defaultProps = {
    disabled: false,
    onChange: () => void 0,
    value: null,
  };

  handleSelectChange = this.handleSelectChange.bind(this);

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.text !== nextProps.text) {
      this.textPartsCache = null;
    }
  }

  get textParts(): string[] {
    return (
      this.textPartsCache || (this.textPartsCache = splitText(this.props.text))
    );
  }

  render() {
    const {options, value, disabled} = this.props;

    const selectOptions = options.map((opt, index) =>
      <option value={index} key={index}>{opt}</option>
    );

    return (
      <div className="CompletableText">
        {intercalateWith(this.textParts, index =>
          <select
            onChange={this.handleSelectChange}
            disabled={disabled}
            autoFocus={index === 0}
            data-index={index}
            key={index}
            tabIndex={index + 1}
            value={value !== null ? value[index] : null}>
            <option value={null} key={-1} />
            {selectOptions}
          </select>
        )}
      </div>
    );
  }

  handleSelectChange(event: SyntheticInputEvent) {
    const {onChange, value} = this.props;
    const index: number = Number(event.target.getAttribute('data-index'));
    onChange({...value, [index]: Number(event.target.value)});
  }
}
