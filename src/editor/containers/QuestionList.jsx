/* @flow */
import React, {Component} from 'react';
import {addQuestion, removeQuestion} from '../actions';
import type {QuestionState, QuestionType, Action} from '../types';
import {isReadOnly, getQuestions} from '../selectors';
import {createSelector} from 'reselect';
import {connect} from 'react-redux';
// $FlowFixMe
import Button from 'material-ui/Button';
// $FlowFixMe
import Menu, {MenuItem} from 'material-ui/Menu';

type Props = {
  isReadOnly: boolean,
  questions: QuestionState[],
  addQuestion: (type: QuestionType) => Action,
  removeQuestion: (is: string) => Action,
};

type State = {
  addMenuOpen: boolean,
};

class QuestionList extends Component {
  props: Props;
  state: State = {
    addMenuOpen: false,
  };
  addMenuButton: ?HTMLElement;

  render() {
    const {isReadOnly, questions} = this.props;
    return (
      <div>
        <Button
          aria-owns="add-question-menu"
          aria-haspopup="true"
          onClick={this.handleAddMenuOpen}>
          Nouvelle question&hellip;
        </Button>
        <Menu
          id="add-question-menu"
          anchorEl={this.addMenuButton}
          open={this.state.addMenuOpen}
          onRequestClose={this.handleAddMenuClose}>
          <MenuItem onClick={this.handleAddMenuClose} data-type="simple-choice">
            Choix simple
          </MenuItem>
          <MenuItem
            onClick={this.handleAddMenuClose}
            data-type="multiple-choices">
            Choix multiple
          </MenuItem>
          <MenuItem
            onClick={this.handleAddMenuClose}
            data-type="completable-text">
            Texte à compléter
          </MenuItem>
        </Menu>
      </div>
    );
  }

  setAddMenuButton = (button: HTMLElement) => {
    this.addMenuButton = button;
  };

  handleAddMenuOpen = (event: any) => {
    this.setState({addMenuOpen: true});
  };

  handleAddMenuClose = (event: SyntheticEvent) => {
    const {type} = (event.target: any).dataset;
    this.setState({addMenuOpen: false});
  };
}

const mapStateToProps = createSelector(
  isReadOnly,
  getQuestions,
  (isReadOnly, questions) => ({
    isReadOnly,
    questions,
  })
);

const actionCreators = {
  addQuestion,
  removeQuestion,
};

export default connect(mapStateToProps, actionCreators)(QuestionList);
