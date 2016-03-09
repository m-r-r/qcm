import React, {Component, PropTypes} from 'react';

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
      <div className='MultipleChoice'>
        <p className='MultipleChoice__text'>{text}</p>
        <ul>
        {
          options.map((option, index) => (
            <li key={index} className='MultipleChoice__choice'>
              <input type='checkbox' className='MultipleChoice__checkbox'
                     checked={!!checked[index]}
                     data-index={index}
                     disabled={disabled} onChange={this.handleCheckboxChange} />
              {option}
            </li>
          ))
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
