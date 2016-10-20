/* global describe, it, expect */

import DocChomp from './index';

describe('Doc Chomp', () => {
  describe('does some basic integrity checkups', () => {
    it('throws when used other than for template literals', () => {
      expect(() => DocChomp([])).toThrow();
      expect(() => DocChomp(null, [])).toThrow();
      expect(() => DocChomp(undefined, [])).toThrow();
      expect(() => DocChomp(1)('a')).toThrow();
      expect(() => DocChomp('1')(3)).toThrow();
      expect(() => DocChomp(1)(3)).toThrow();
    });

    it('throws when supplied text on the first line', () => {
      expect(() => DocChomp`This shouldn't work`).toThrow();
    });

    it(`doesn't throw when supplied with a predefined indentation and text on the first line`, () => {
      expect(() => DocChomp('  ')`  This should work`).not.toThrow();
      expect(DocChomp('  ')`  This should work`).toMatchSnapshot();
    });

    it(`doesn't throw when supplied with a line for detection and text on the first line`, () => {
      expect(() => DocChomp(0)`  This should work`).not.toThrow();
      expect(DocChomp(0)`  This should work`).toMatchSnapshot();
    });
  });

  describe('makes ethical decisions about your whitespace', () => {
    describe('when detecting it automatically', () => {
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

    describe('when predefined', () => {
      it('likes space indentation', () => {
        expect(
          /* eslint indent: ["error", 2] */
          DocChomp('    ')`
            This document is indented with ${'spaces'}!

            * Spaces are flexible and ${'versatile'}
              * Spaces are ubiquitous
              * Spaces are ${'not'} everything

            These are Doc Chomp's mentor's preferred type of indentation.
            `
          /* eslint indent: ["error", 2] */
        ).toMatchSnapshot();

        expect(
          /* eslint indent: ["error", 2] */
          DocChomp('            ')`
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
					DocChomp('						')`
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

    describe('when the line for detection is overridden', () => {
      it(`doesn't truncate the first line if non-empty`, () => {
        expect(
          /* eslint indent: ["error", 2] */
          DocChomp(2)`This document is indented with ${'spaces'}!

            * Spaces are flexible and ${'versatile'}
              * Spaces are ubiquitous
              * Spaces are ${'not'} everything

            These are Doc Chomp's mentor's preferred type of indentation.
            `
          /* eslint indent: ["error", 2] */
        ).toMatchSnapshot();

        expect(
          /* eslint indent: ["error", "tab"] */
					DocChomp(2)`This document is indented with ${'tabs'}!

						* Tabs are ${'uniform'}
							* Tabs adjust to viewer's ${'preferences'}
							* Tabs can mislead when attempting to align to syntax

						What fun.
						`
          /* eslint indent: ["error", 2] */
        ).toMatchSnapshot();
      });

      it('likes space indentation', () => {
        expect(
          /* eslint indent: ["error", 2] */
          DocChomp(2)`
            This document is indented with ${'spaces'}!

            * Spaces are flexible and ${'versatile'}
              * Spaces are ubiquitous
              * Spaces are ${'not'} everything

            These are Doc Chomp's mentor's preferred type of indentation.
            `
          /* eslint indent: ["error", 2] */
        ).toMatchSnapshot();

        expect(
          /* eslint indent: ["error", 2] */
          DocChomp(6)`
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
					DocChomp(2)`
						This document is indented with ${'tabs'}!

						* Tabs are ${'uniform'}
							* Tabs adjust to viewer's ${'preferences'}
							* Tabs can mislead when attempting to align to syntax

						What fun.
						`
          /* eslint indent: ["error", 2] */
        ).toMatchSnapshot();

        expect(
          /* eslint indent: ["error", "tab"] */
					DocChomp(6)`
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
});
