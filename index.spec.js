/* global describe, it, expect */
const DocChomp = require('./index');

describe('Doc Chomp', () => {
  describe('does some basic integrity checkups', () => {
    it('throws when supplied text on the first line', () => {
      expect(() => DocChomp`This shouldn't work`).toThrow();
    });
  });

  describe('makes ethical decisions about your whitespace', () => {
    it('likes space indentation', () => {
      expect(
        /* eslint indent: ["error", 2] */
        DocChomp`
          This document is indented with ${'spaces'}!

          * Spaces are flexible and ${'versatile'}
            * Spaces are ubiquitous
            * Spaces are ${'not'} everything

          These are Doc Chomp's mentor's preferred type of indentation.
          `
        /* eslint indent: ["error", 2] */
      ).toMatchSnapshot();
    });

    it('is open to tab indentation', () => {
      expect(
        /* eslint indent: ["error", "tab"] */
				DocChomp`
					This document is indented with ${'tabs'}!

					* Tabs are ${'uniform'}
						* Tabs adjust to viewer's ${'preferences'}
						* Tabs can mislead when attempting to align to syntax

					What fun.
					`
        /* eslint indent: ["error", 2] */
      ).toMatchSnapshot();
    });
  });
});
