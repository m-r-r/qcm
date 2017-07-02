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
  updateExerciseMetadata: $Type<updateExerciseMetadata>,
};

class MetadataForm extends Component {
  props: Props;

  handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
  };

  handleChange = (event: SyntheticInputEvent) => {
    const input = event.target;
    let {name, value} = input;

    if (typeof name !== 'string') {
      return;
    }

    if (typeof value !== 'string' || value.length === 0) {
      value = null;
    }
    this.props.updateExerciseMetadata({[name]: value});
  }

  render() {
    const {title, instructions, explainations} = this.props.metadata || {};
    return (
      <form onSubmit={this.handleSubmit}
            onChange={this.handleChange}>
        <div>
          <label for="title">Titre</label>
          <input
            id="title"
            name="title"
            value={undefined}
            defaultValue={title}
          />
        </div>
        <div>
          <label for="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={undefined}
            defaultValue={instructions}
          />
        </div>
        <div>
          <label for="explainations">Explainations</label>
          <textarea
            id="explainations"
            name="explainations"
            value={undefined}
            defaultValue={explainations}
          />
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
