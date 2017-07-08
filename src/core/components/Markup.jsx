/* @flow */
import React, {Component} from 'react';
import type Remarkable from 'remarkable';
import RemarkableReact from 'remarkable-react';
import {createParser, placeholderPlugin, PLACEHOLDER_TAG} from '../markup';
import type {Token} from '../markup';

type Props = {
  value: Token[] | string,
  placeholderComponent?: string | Class<any> | Function,
};

class Markup extends Component {
  props: Props;

  _parser: ?Remarkable = null;
  _renderer: ?RemarkableReact = null;

  get parser() {
    if (!this._parser) {
      const {placeholderComponent} = this.props;
      this._parser = createParser();
      if (placeholderComponent) {
        this._parser.use(placeholderPlugin);
      }
    }
    return this._parser;
  }

  get tokens(): Token[] {
    if (Array.isArray(this.props.value)) {
      return this.props.value;
    } else {
      return this.parser.parse(this.props.value, {});
    }
  }

  get renderer(): RemarkableReact {
    if (!this._renderer) {
      this._renderer = new RemarkableReact();
    }
    return this._renderer;
  }

  render() {
    return this.renderer.render(this.tokens);
  }
}
