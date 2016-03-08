import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {actions, steps} from '../client';
import ErrorMessage from '../components/ErrorMessage';
import SimpleChoice from '../components/SimpleChoice';
import MultipleChoices from '../components/MultipleChoices';
import CompletableText from '../components/CompletableText';

class Client extends Component {
  static propTypes = {
    uri: PropTypes.string,
    step: PropTypes.string,
    loadExercise: PropTypes.func.isRequired,
    error: PropTypes.instanceOf(Error),
    questions: PropTypes.arrayOf(PropTypes.object.isRequired),
    currentQuestion: PropTypes.number,
    userAnswers: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
  };

  state = {
    answer: null,
  };

  constructor (props, context) {
    super(props, context);
    this.handleClickStart = this.handleClickStart.bind(this)
    this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
    this.handleClickContinue = this.handleClickContinue.bind(this);
  }


  componentWillMount () {
    this.props.loadExercise(this.props.uri);
  }

  get className () {
    const {step} = this.props;
    return `QuestionnaireClient QuestionnaireClient--${step.toLowerCase()}`;
  }

  get questionComponent () {
    const {questions, currentQuestion} = this.props;
    const question = questions[currentQuestion];
    switch (question && question.type) {
      case 'single-choice':
        return SimpleChoice;
      case 'multiple-choice':
        return MultipleChoices;
      case 'completable-text':
        return CompletableText;
    }
  }

  renderContent () {
    const {step, error, metadata, questions,  currentQuestion} = this.props;

    switch (step) {
      case steps.LOADING:
        return <p>Chargement...</p>;

      case steps.FAILURE:
        return <ErrorMessage error={error} />;

      case steps.READY:
        return (
          <div>
            <h1>{metadata.title}</h1>
            <button type='button' onClick={this.handleClickStart}>Start</button>
          </div>
        );

      case steps.STARTED:
        const question = questions[currentQuestion];
        const {answer} = this.state;

        return (
          <div>
          {
            React.createElement(this.questionComponent, {
              ...question,
              value: answer,
              onChange: this.handleChangeAnswer,
            })
          }
          <button type="button" onClick={this.handleClickContinue}
                  disabled={answer === null}>
            Continuer
          </button>

          </div>
        );

      case steps.FINISHED:
        return <p>Finished</p>;

      default:
        throw new Error("unreachable code has be reached :-(");
    }
  }

  render () {
    return (
      <div className={this.className}>
        {this.renderContent()}
      </div>
    );
  }

  handleClickStart() {
    this.props.startExercise();
  }

  handleChangeAnswer(answer) {
    this.setState({answer});
  }

  handleSubmitAnswer(answer) {
    const {answerQuestio, currentQuestion} = this.props;
    answerQuestion(currentQuestion, answer);
  }

  handleClickContinue() {
    this.props.nextQuestion();
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect((s) => s, mapDispatchToProps)(Client);
