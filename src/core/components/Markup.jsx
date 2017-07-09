/* @flow */
import React, {PureComponent, createElement} from 'react';
import type Remarkable from 'remarkable';
import RemarkableReact from 'remarkable-react';
import {createParser, placeholderPlugin, PLACEHOLDER_TAG} from '../markup';
import type {Token} from '../markup';

type Props = {
  value: Token[] | string,
  placeholderComponent?: string | Class<any> | Function,
  inline: boolean,
  tagName: string,
};

export default class Markup extends PureComponent {
  props: Props;

  static defaultProps = {
    tagName: 'div',
    inline: false,
  };

  _parser: ?Remarkable = null;
  _renderer: ?RemarkableReact = null;

  get parser(): Remarkable {
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
    const {value, inline} = this.props;
    if (Array.isArray(value)) {
      return value;
    } else if (inline) {
      return this.parser.parseInline(value, {});
    } else {
      return this.parser.parse(value, {});
    }
  }

  get renderer(): RemarkableReact {
    if (!this._renderer) {
      this._renderer = new RemarkableReact({
        components: {
          [PLACEHOLDER_TAG]: this.props.placeholderComponent || 'span',
          a: renderLink,
        },
        tokens: {
          [PLACEHOLDER_TAG]: PLACEHOLDER_TAG,
        },
      });
    }
    return this._renderer;
  }

  render() {
    const {value, tagName, placeholderComponent, inline, ...props} = this.props;
    return createElement(
      tagName,
      props,
      // $FlowFixMe
      this.renderer.render(this.tokens, this.parser.options)
    );
  }
}

const renderLink = ({options, href, title, children}) => {
  const props: Object = {
    href,
    title,
  };
  if (options.linkTarget) {
    props.target = options.linkTarget;
  }
  return createElement('a', props, children);
};
