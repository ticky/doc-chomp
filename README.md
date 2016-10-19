# 🍴 Doc Chomp

Doc Chomp chomps on your document literals

## Usage

Doc Chomp is useful for keeping nice indentation outside ES6 template literals, while making them internally clean and consistent.

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

In this example, `chompedString` will have two space characters trimmed from each line.

No text should be added on the same line as DocChomp, as if text was accepted here, Doc Chomp couldn't make a good choice about spacing!
