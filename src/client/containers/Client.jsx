/* @flow */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import {actions, steps, selectors} from '../index';
import ErrorMessage from '../components/ErrorMessage';
import SingleChoice from '../components/SingleChoice';
import MultipleChoices from '../components/MultipleChoices';
import CompletableText from '../components/CompletableText';
import StartScreen from '../components/StartScreen';
import EndScreen from '../components/EndScreen';
import Result from '../components/Result';

type Props = {
  uri: string,
  step: string,
  loadExercise: Function,
  error: Error,
  currentQuestion: Object,
  currentQuestionIndex: number,
  currentQuestionAnswer: any,
  currentQuestionScore: any,
  userScore: Object,
  metadata: Object,
  startExercise: Function,
  answerQuestion: Function,
  nextQuestion: Function,
};

type State = {
  answer: any | null,
};

class Client extends Component {
  props: Props;
  state: State;
  
  handleClickStart = this.handleClickStart.bind(this);
  handleChangeAnswer = this.handleChangeAnswer.bind(this);
  handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
  handleClickNext = this.handleClickNext.bind(this);

  componentDidMount () {
    this.props.loadExercise(this.props.uri);
  }

  componentWillReceiveProps (props) {
    if (props.currentQuestion !== this.props.currentQuestion) {
      this.setState({answer: null});
    }
  }

  get className () {
    const {step} = this.props;
    return `QuestionnaireClient QuestionnaireClient--${step.toLowerCase()}`;
  }

  get questionComponent () {
    const {currentQuestion} = this.props;
    switch (currentQuestion && currentQuestion.type) {
      case 'single-choice':
        return SingleChoice;
      case 'multiple-choices':
        return MultipleChoices;
      case 'completable-text':
        return CompletableText;
      default:
        throw new Error('Invalid question type');
    }
  }

  renderContent () {
    const {step, error, metadata, currentQuestion, currentQuestionAnswer} = this.props;

    switch (step) {
      case steps.LOADING:
        return <p>Chargement...</p>;

      case steps.FAILURE:
        return <ErrorMessage error={error} />;

      case steps.READY:
        return <StartScreen metadata={metadata} />;

      case steps.INPUT:
        return React.createElement(this.questionComponent, {
          ...currentQuestion,
          value: step === steps.INPUT ? this.state.answer : currentQuestionAnswer,
          onChange: this.handleChangeAnswer,
          disabled: step === steps.SOLUTION,
        });

      case steps.SOLUTION:
        return this.renderSolution();

      case steps.FINISHED:
        const {userScore: {total, max}} = this.props;
        return <EndScreen metadata={metadata}
                          score={total / max}
                          scale={metadata.grading_scale || max} />;

      default:
        throw new Error('unreachable code has be reached :-(');
    }
  }

  renderSolution () {
    const {step, currentQuestion, currentQuestionScore} = this.props;

    if (step !== steps.SOLUTION) {
      return false;
    }

    return <Result question={currentQuestion} score={currentQuestionScore} />;
  }

  renderButton () {
    const {step} = this.props;

    switch (step) {
      case steps.READY:
        return (
          <button type='button' className='btn btn-primary' tabIndex='1'
                  onClick={this.handleClickStart}>Commencer</button>
        );
      case steps.INPUT:
        const {answer} = this.state;
        return (
          <button type='button' className='btn btn-primary' tabIndex='99'
                  disabled={answer === null}
                  onClick={this.handleSubmitAnswer}>Envoyer</button>
        );
      case steps.SOLUTION:
        return (
          <button type='button' className='btn btn-primary' tabIndex='99'
                  onClick={this.handleClickNext}>Continuer</button>
        );
      case steps.FINISHED:
        return (
          <button type='button' className='btn btn-primary' tabIndex='1'
                  onClick={this.handleClickStart}>Recommencer</button>
        );
      default:
        return false;
    }
  }

  render () {
    return (
      <div className={this.className}>
        <div className='QuestionnaireClient__Content'>
          {this.renderContent()}
        </div>
        <div className='QuestionnaireClient__Controls'>
          {this.renderButton()}
        </div>
      </div>
    );
  }

  handleClickStart () {
    this.props.startExercise();
  }

  handleChangeAnswer (answer) {
    this.setState({answer});
  }

  handleSubmitAnswer () {
    const {answer} = this.state;
    if (answer !== null) {
      this.props.answerQuestion(answer);
    }
  }

  handleClickNext () {
    this.props.nextQuestion();
  }
}

const mapDispatchToProps: $FlowFixMe = (dispatch) => bindActionCreators(actions, dispatch);
const mapStateToProps: $FlowFixMe = createSelector(
  [
    (s) => s,
    selectors.currentQuestion,
    selectors.currentQuestionAnswer,
    selectors.currentQuestionScore,
  ],
  (state, currentQuestion, currentQuestionAnswer, currentQuestionScore) => ({
    ...state,
    currentQuestion,
    currentQuestionAnswer,
    currentQuestionScore,
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(Client);
