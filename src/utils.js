/* @flow */

type IntercalateFn = (index: number) => any;

export function intercalateWith (array: any[], func: IntercalateFn): any[] {
  return array.reduce((acc, item, index) => {
    if (index !== 0) {
      acc.push(func(index - 1));
    }
    acc.push(item);
    return acc;
  }, []);
}

let lastId = 0;

export function newId (prefix: string = 'id'): string {
  return `${prefix}${++lastId}`;
}

export function arePermutations (a: any[], b: any[]): bool {
  a = [].concat(a).sort();
  b = [].concat(b).sort();

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

export function propertiesEqual (a: Object, b: Object): bool {
  const props = Object.keys(a);

  if (!arePermutations(props, Object.keys(b))) {
    return false;
  }

  for (let prop of props) {
    if (a[prop] !== b[prop]) {
      return false;
    }
  }
  return true;
}

const SPLIT_TEXT_REGEX = /%%?/gm;

function replacePlaceholder (text: string): string {
  return text === '%%' ? '%' : '￼';
}

export function splitText (text: string): string[] {
  return text.replace('￼', '')
             .replace(SPLIT_TEXT_REGEX, replacePlaceholder)
             .split('￼');
}

export function round10 (number: number, precision: number): number {
  const m = Math.pow(10, Math.abs(+precision));
  return Math.round((+number + 1e-15) * m) / m;
}
