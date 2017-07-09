/* @flow */
import Remarkable from 'remarkable';

export const PLACEHOLDER_TAG = '@qcm/complete-text-placeholder';

export const placeholderPlugin = (md: Remarkable) => {
  const noMatches = [];

  const MUSTACHE = 123; /* { */
  const REVERSE_MUSTACHE = 125; /* } */

  function parseInlinePlaceholders(state: any, silent: boolean) {
    const {src, posMax, level, options} = state;
    let {pos} = state;

    if (level >= options.maxNesting) {
      return false;
    }

    const start = pos;

    if (
      src.charCodeAt(start) !== MUSTACHE ||
      src.charCodeAt(start + 1) !== MUSTACHE
    ) {
      return false;
    }

    const contentStart = start + 2;
    pos = contentStart; // Skip the opening '{{'

    let contentStop = -1;
    toplevel: while (pos <= posMax) {
      switch (src.charCodeAt(pos)) {
        case MUSTACHE:
          return false;
        case REVERSE_MUSTACHE:
          if (pos < posMax && src.charCodeAt(pos + 1) === REVERSE_MUSTACHE) {
            contentStop = pos;
            pos += 2; // Skip the '}}'
            break toplevel;
          } else {
            return false;
          }
      }
      pos++;
    }

    if (!silent) {
      state.push({
        type: PLACEHOLDER_TAG,
        content: src
          .slice(contentStart, contentStop)
          .replace(/[\s\n]+/g, ' ')
          .trim(),
        level: level + 1,
      });
    }
    state.pos = pos;
    return true;
  }
  // $FlowFixMe
  md.inline.ruler.after('escape', PLACEHOLDER_TAG, parseInlinePlaceholders);
};

export function createParser(
  options: Object = {}
): Remarkable {
  // $FlowFixMe
  return new Remarkable('default', {
    html: false,
    linkify: true,
    linkTarget: '_blank',
    ...options,
  });
}

export type Token = {
  +type: string,
  +level: number,
  +children?: Token[];
}
