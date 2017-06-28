import {steps} from './reducer';

export function currentQuestion(state) {
  switch (state.step) {
    case steps.INPUT:
    case steps.SOLUTION:
      return state.questions[state.currentQuestionIndex];
    default:
      return null;
  }
}

export function currentQuestionAnswer(state) {
  if (state.step === steps.INPUT) {
    return state.userAnswers[state.currentQuestionIndex];
  } else {
    return null;
  }
}

export function currentQuestionScore(state) {
  if (state.step === steps.SOLUTION) {
    return state.userScore[state.currentQuestionIndex];
  } else {
    return null;
  }
}
