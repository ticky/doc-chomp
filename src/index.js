const NEW_LINE = '\n';
import literalToast from 'literal-toast';

function DocChompInternal(indentString = '', lineToDetectFrom, ...templateLiteral) {
  // Bake the document, split into lines
  let documentLines = literalToast(...templateLiteral).split(NEW_LINE);

  // Grab a trimmed version of the first line to determine whether to consider it empty
  const trimmedFirstLine = documentLines[0].trim();

  // Configuration: Determine whether we should be detecting indentation automatically
  let detectFromFirstIndentedLine = true;

  if (typeof lineToDetectFrom !== 'number') {
    // if `lineToDetectFrom` isn't a number, it's fallen back to the default of zero,
    // and we should see if there's a predefined indentation to decide whether to detect
    // the indentation automatically,
    lineToDetectFrom = 0;
    detectFromFirstIndentedLine = !indentString;
  } else {
    // if `lineToDetectFrom` is a number we don!
    detectFromFirstIndentedLine = false;
  }

  // If the first line isn't blank, that's no good 🙅🏻
  if (detectFromFirstIndentedLine && trimmedFirstLine) {
    throw new Error(`doc-chomp: Text supplied on first line! Indentation cannot be reliably determined automatically.`);
  }

  // Trim the first line if it's blank and we haven't bailed already!
  documentLines = documentLines.slice(
    !detectFromFirstIndentedLine && trimmedFirstLine
      ? 0
      : 1
  );

  // If we don't already know what we're trimming, grab the leading indentation from the specified line
  if (!indentString) {
    indentString = documentLines[lineToDetectFrom].match(/^\s*/).shift();
  }

  // Replace the indentation and sew the document back together
  return documentLines
    .map((documentLine) => documentLine.replace(indentString, ''))
    .join(NEW_LINE);
}

export default function DocChomp(maybeConfig, ...args) {
  if (typeof maybeConfig === 'string') {
    // String arguments are treated as overridden indentation definitions
    return DocChompInternal.bind(this, maybeConfig, undefined);
  } else if (typeof maybeConfig === 'number') {
    // Number arguments are treated as the line to measure indentation from
    return DocChompInternal.bind(this, undefined, maybeConfig);
  } else {
    // Otherwise, we are being used as a tag directly, so use defaults
    return DocChompInternal.call(this, undefined, undefined, maybeConfig, ...args);
  }
}
