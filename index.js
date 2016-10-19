const NEW_LINE = '\n';

module.exports = function(strings, ...keys) {
  let value = '';

  if (strings[0].split(NEW_LINE).shift().trim()) {
    throw new Error('doc-chomp: Text supplied on first line! Indentation cannot be properly determined.');
  }

  for (let index = 0; index < (strings.length + keys.length); index++) {
    value += (index % 2 === 0 ? strings : keys)[Math.floor(index / 2)];
  }

  let indent = '';

  return value
    .split(NEW_LINE)
    .slice(1)
    .map((line, index) => {
      if (index === 0) {
        // Glean leading space from first valid line
        indent = line.match(/^\s*/).shift();
      }

      return line.replace(indent, '');
    })
    .join(NEW_LINE);
};
