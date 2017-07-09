/* @flow */
import {test} from 'tape';
import {
  placeholderPlugin,
  createParser,
  PLACEHOLDER_TAG,
} from '../../src/core/markup';

test('commonmark parser', t => {
  const parser = createParser();
  t.test("it doesn't allow HTML tags", t => {
    t.equal(
      parser.render('<a href="#">link</a>'),
      '<p>&lt;a href=&quot;#&quot;&gt;link&lt;/a&gt;</p>\n'
    );
    t.equal(parser.render('<br />'), '<p>&lt;br /&gt;</p>\n');
    t.end();
  });

  t.test("it doesn't allow 'javascript:' URIs", t => {
    t.equal(
      parser.render('[foo](javascript:alert("pwned"))'),
      '<p>[foo](javascript:alert(&quot;pwned&quot;))</p>\n'
    );
    t.end();
  });

  t.test('it creates links automatically', t => {
    t.equal(
      parser.render('Link: https://example.org'),
      '<p>Link: <a href="https://example.org" target="_blank">https://example.org</a></p>\n'
    );
    t.equal(parser.render('<br />'), '<p>&lt;br /&gt;</p>\n');
    t.end();
  });

  t.test("it doesn't change tipography !", t => {
    t.equal(parser.render('-- (c) --- (r) --'), '<p>-- (c) --- (r) --</p>\n');
    t.end();
  });
  t.end();
});

test('placeholders plugin', t => {
  const parser = createParser();
  const parse = (code: string) => parser.parse(code, {});

  t.test('it can be enabled', t => {
    t.doesNotThrow(() => parser.use(placeholderPlugin));
    t.end();
  });

  t.test('it parse placeholders', t => {
    t.deepEqual(parse('foo *bar {{quux}} baz* '), [
      {
        level: 0,
        lines: [0, 1],
        tight: false,
        type: 'paragraph_open',
      },
      {
        children: [
          {
            content: 'foo ',
            level: 0,
            type: 'text',
          },
          {
            level: 0,
            type: 'em_open',
          },
          {
            content: 'bar ',
            level: 1,
            type: 'text',
          },
          {
            content: 'quux',
            level: 2,
            type: PLACEHOLDER_TAG,
          },
          {
            content: ' baz',
            level: 1,
            type: 'text',
          },
          {
            level: 0,
            type: 'em_close',
          },
        ],
        content: 'foo *bar {{quux}} baz*',
        level: 1,
        lines: [0, 1],
        type: 'inline',
      },
      {
        level: 0,
        tight: false,
        type: 'paragraph_close',
      },
    ]);
    t.end();
  });

  t.test("it doesn't parse escaped placeholders", t => {
    t.deepEqual(parse('foo *bar \\{{quux}} baz*'), [
      {
        type: 'paragraph_open',
        tight: false,
        lines: [0, 1],
        level: 0,
      },
      {
        type: 'inline',
        content: 'foo *bar \\{{quux}} baz*',
        level: 1,
        lines: [0, 1],
        children: [
          {
            type: 'text',
            content: 'foo ',
            level: 0,
          },
          {
            type: 'em_open',
            level: 0,
          },
          {
            type: 'text',
            content: 'bar {{quux}} baz',
            level: 1,
          },
          {
            type: 'em_close',
            level: 0,
          },
        ],
      },
      {
        type: 'paragraph_close',
        tight: false,
        level: 0,
      },
    ]);
    t.end();
  });
  t.end();
});
