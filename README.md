# 🍴 Doc Chomp

[![npm](https://img.shields.io/npm/v/doc-chomp.svg?maxAge=2592000)](https://www.npmjs.com/package/doc-chomp) ![doc-chomp](https://img.shields.io/npm/l/doc-chomp.svg?maxAge=2592000) [![Build Status](https://travis-ci.org/ticky/doc-chomp.svg?branch=master)](https://travis-ci.org/ticky/doc-chomp) [![codecov](https://codecov.io/gh/ticky/doc-chomp/branch/master/graph/badge.svg)](https://codecov.io/gh/ticky/doc-chomp)

Doc Chomp chomps on your document literals

## Usage

Doc Chomp is useful for keeping nice indentation outside ES6 template literals, while making them internally clean and consistent.

### Automatic

The simplest way to use Doc Chomp is to tag a string!

```javascript
const DocChomp = require('doc-chomp');

let chompedString = DocChomp`
  This string will be trimmed such that all indentation matches this line

  * Extra indentation is supported just fine
    * No problem! 👌🏼

  The line after the DocChomp call shouldn't be used, or Doc Chomp will complain!
  `

function compareStrings() {
  if (chompedString) {
    return chompedString === DocChomp`
      This string will be trimmed such that all indentation matches this line

      * Extra indentation is supported just fine
        * No problem! 👌🏼

      The line after the DocChomp call shouldn't be used, or Doc Chomp will complain!
      `;
  }
}

compareStrings(); // true!
```

In this example, `chompedString` will have two space characters trimmed from each line, and the other one will have six removed from each line.

With this usage, the first blank line (adjacent to `DocChomp`) is removed, and no text may be added on that line as DocChomp. If text was accepted here, Doc Chomp couldn't make a good choice about spacing! If you need to put text on that line, you can use the manual modes below!

### Manual

In both of these modes, note that if the line `DocChomp` is on is blank, it will be omitted from the output, and line numbers begin at the next line.

#### Indentation line

If passed a number, Doc Chomp will detect the indentation from that line of the input.

```javascript
function mcGuffin() {
  if (this.glazed) {
    return chompedString === DocChomp(2)`This string will have six space characters removed from the start of each line

      * Because this line is defined as line 2, and used for indentation detection
        * 👌🏼
      `;
  } else {
    return chompedString === DocChomp(2)`
      This is the "first" line (line 0), according to Doc Chomp, because the above line is blank.

      * Which means this is line 2, and used for indentation detection
        * No problem! 👌🏼
      `;
  }
}
```

#### Indentation string

If passed a string, Doc Chomp will remove exactly that indentation from each line.

```javascript
function mcGuffin() {
  if (this.glazed) {
    return chompedString === DocChomp('      ')`This string will have six space characters removed from the start of each line

      * Extra indentation is supported just fine
        * No problem! 👌🏼
      `;
  } else {
    return chompedString === DocChomp('\t\t\t')`This string will have three tab characters removed from the start of each line

			* Extra indentation is supported just fine
				* No problem! 👌🏼
			`;
  }
}
```
