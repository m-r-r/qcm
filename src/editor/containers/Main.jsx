/* @flow */
import React, {Component} from 'react';
import MetadataForm from './MetadataForm';
import QuestionList from './QuestionList';

export default class Main extends Component {
  render() {
    return (
      <div>
        <MetadataForm />
        <QuestionList />
      </div>
    );
  }
}
