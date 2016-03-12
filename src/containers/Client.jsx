import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {actions, steps} from '../client';
import ErrorMessage from '../components/ErrorMessage';
import SingleChoice from '../components/SingleChoice';
import MultipleChoices from '../components/MultipleChoices';
import CompletableText from '../components/CompletableText';
import SingleChoiceSolution from '../components/SingleChoiceSolution';
import MultipleChoicesSolution from '../components/MultipleChoicesSolution';
import CompletableTextSolution from '../components/CompletableTextSolution';

class Client extends Component {
  static propTypes = {
    uri: PropTypes.string,
    step: PropTypes.string,
    loadExercise: PropTypes.func.isRequired,
    error: PropTypes.instanceOf(Error),
    questions: PropTypes.arrayOf(PropTypes.object.isRequired),
    currentQuestion: PropTypes.number,
    userAnswers: PropTypes.object.isRequired,
    userResults: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    startExercise: PropTypes.func.isRequired,
    answerQuestion: PropTypes.func.isRequired,
    nextQuestion: PropTypes.func.isRequired,
  };

  state = {
    answer: null,
  };

  constructor (props, context) {
    super(props, context);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  componentWillMount () {
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
    const {questions, currentQuestion} = this.props;
    const question = questions[currentQuestion];
    switch (question && question.type) {
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

  get solutionComponent () {
    const {questions, currentQuestion} = this.props;
    const question = questions[currentQuestion];
    switch (question && question.type) {
      case 'single-choice':
        return SingleChoiceSolution;
      case 'multiple-choices':
        return MultipleChoicesSolution;
      case 'completable-text':
        return CompletableTextSolution;
      default:
        throw new Error('Invalid question type');
    }
  }

  get currentAnswer () {
    const {step, currentQuestion, userAnswers} = this.props;
    const {answer} = this.state;
    return step === steps.INPUT ? answer : userAnswers[currentQuestion];
  }

  renderContent () {
    const {step, error, metadata, questions, currentQuestion} = this.props;

    switch (step) {
      case steps.LOADING:
        return <p>Chargement...</p>;

      case steps.FAILURE:
        return <ErrorMessage error={error} />;

      case steps.READY:
        return (
          <div>
            <h1>{metadata.title}</h1>
            <p>{metadata.instructions}</p>
          </div>
        );

      case steps.INPUT:
      case steps.SOLUTION:
        const question = questions[currentQuestion];
        return (
          <div>
          {
            React.createElement(this.questionComponent, {
              ...question,
              value: this.currentAnswer,
              onChange: this.handleChangeAnswer,
              disabled: step === steps.SOLUTION,
            })
          }
          { this.renderSolution() }
          </div>
        );

      case steps.FINISHED:
        return <p>Finished</p>;

      default:
        throw new Error('unreachable code has be reached :-(');
    }
  }

  renderSolution () {
    const {step, userResults, currentQuestion, questions} = this.props;

    if (step !== steps.SOLUTION) {
      return false;
    }

    const result = userResults[currentQuestion];
    if (result !== 1) {
      const question = questions[currentQuestion];
      return (
        <div className='Result Result--error'>
          <h5>Faux</h5>
          {
            React.createElement(this.solutionComponent, {
              question,
            })
          }
          <p>{question.explaination || false}</p>
        </div>
      );
    } else {
      return (
        <div className='Result Result--success'>
          <h5>Juste</h5>
          <p>Vous avez répondu juste.</p>
        </div>
      );
    }
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

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect((s) => s, mapDispatchToProps)(Client);
