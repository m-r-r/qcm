
export function intercalateWith (array, func) {
  return array.reduce((acc, item, index) => {
    if (index !== 0) {
      acc.push(func(index - 1));
    }
    acc.push(item);
    return acc;
  }, []);
}

let lastId = 0;

export function newId (prefix = 'id') {
  return `${prefix}${++lastId}`;
}

export function arePermutations (a, b) {
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

export function propertiesEqual (a, b) {
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

function replacePlaceholder (text) {
  return text === '%%' ? '%' : '￼';
}

export function splitText (text) {
  return text.replace('￼', '')
             .replace(SPLIT_TEXT_REGEX, replacePlaceholder)
             .split('￼');
}
