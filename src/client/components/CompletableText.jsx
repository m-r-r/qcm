/* @flow */
import React, {Component} from 'react';
import Markup from '../../core/components/Markup';

type Props = {
  text: string,
  options: string[],
  value: {[key: number]: number},
  disabled: boolean,
  onChange: Function,
};

export default class CompletableText extends Component {
  props: Props;
  selectIndex: number = 0;

  static defaultProps = {
    disabled: false,
    onChange: () => void 0,
    value: null,
  };

  handleSelectChange = this.handleSelectChange.bind(this);

  componentWillUpdate() {
    this.selectIndex = 0;
  }

  renderSelect = () => {
    const {options, value, disabled} = this.props;
    const index = this.selectIndex++;
    return (
      <select
        onChange={this.handleSelectChange}
        disabled={disabled}
        autoFocus={index === 0}
        data-index={index}
        tabIndex={index + 1}
        value={value !== null ? value[index] : ''}>

        <option value={null} key={-1} />
        {options.map((opt, index) =>
          <option value={index} key={index}>{opt}</option>
        )}
      </select>
    );
  };

  render() {
    const {text, value} = this.props;
    return (
      <div className="CompletableText">
        <Markup placeholderComponent={this.renderSelect} value={text}>
          {
            // Force the component to update when the value change
            value
          }
        </Markup>
      </div>
    );
  }

  handleSelectChange(event: SyntheticInputEvent) {
    const {onChange, value} = this.props;
    const index: number = Number(event.target.getAttribute('data-index'));
    onChange({...value, [index]: Number(event.target.value)});
  }
}
