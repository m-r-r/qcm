/* @flow */
import React, {Component} from 'react';
import {updateExerciseMetadata} from '../actions';
import type {State, MetadataFields} from '../types';
import {isReadOnly, getMetadata} from '../selectors';
import {createSelector} from 'reselect';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

type Props = {
  isReadOnly: boolean,
  metadata: MetadataFields,
  updateExerciseMetadata: (fields: MetadataFields) => any,
};

class MetadataForm extends Component {
  props: Props;

  handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
  }

  handleChange = (event: SyntheticInputEvent) => {
    const input = event.target;
    let value: number | string | null = null;

    if (typeof input.name !== 'string') {
      return;
    }

    switch (input.name) {
      case 'gradingScale': {
        // The grading scale can be either an integer or the string "%"
        if (input.value === '%') {
          value = input.value;
        } else {
          const intValue = parseInt(input.value);
          // The grading scale can't be 0 or NaN :
          if (intValue > 0 && !Number.isNaN(intValue)) {
            value = intValue;
          }
        }
        break;
      }

      default: {
        // Others fields are string fields :
        if (typeof input.value === 'string' && input.value.length > 0) {
          value = input.value;
        }
        break;
      }
    }
    this.props.updateExerciseMetadata({[input.name]: value});
  };

  render() {
    const {title, instructions, explainations} = this.props.metadata || {};
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <div>
          <label htmlFor="title">Titre</label>
          <input
            id="title"
            name="title"
            value={undefined}
            defaultValue={title}
          />
        </div>
        <div>
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={undefined}
            defaultValue={instructions}
          />
        </div>
        <div>
          <label htmlFor="explainations">Explainations</label>
          <textarea
            id="explainations"
            name="explainations"
            value={undefined}
            defaultValue={explainations}
          />
        </div>
        <div>
          <label htmlFor="gradingScale">Échelle de notation</label>
          <select id="gradingScale" name="gradingScale">
            <option value="">Pas d'échelle</option>
            <option value={10}>Noter sur 5 points</option>
            <option value={10}>Noter sur 10 points</option>
            <option value={20}>Noter sur 20 points</option>
            <option value="%">Noter en pourcentages</option>
          </select>
        </div>
      </form>
    );
  }
}

const mapStateToProps = createSelector(
  isReadOnly,
  getMetadata,
  (isReadOnly, metadata) => ({
    isReadOnly,
    metadata,
  })
);

const actionCreators = {
  updateExerciseMetadata,
};

export default connect(mapStateToProps, actionCreators)(MetadataForm);
