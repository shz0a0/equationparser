import moo from "moo";

// Lexer initialization
const lexer = moo.compile({
  numeric: { match: /[0-9]+(?:\.[0-9]+)?/ },
  operation: ['+', '-', '*', '/'],
  compare: ['=', '!=', '<', '>', '<=', '>='],
  lParen: '(',
  rParen: ')',
  unknown: { match: /./, error: true }
});

export function checkInput(input) {
  let hasError = false; // Flag to check if there is an error
  let processedInput = input.replace(/\s+/g, ''); // Remove all whitespace
  let errorType = null; // Type of error

  // Error types
  const ERROR_TYPES = {
    FORBIDDEN_CHAR: 'Forbidden character detected',
    CORRUPTFAIL: 'Parsing failed or corupted input',
    COMPARISON_COUNT: 'Must have one comparison operator of correct format',
    LEFT_INVALID: 'Invalid Statement on the left hand side',
    RIGHT_INVALID: 'Invalid Statement on the right hand side',
    INVALID_EXPRESSION: 'Invalid mathematical expression on both sides'
  };


// Tokenize input
  const tokens = [];
 // 
  try {        // Check for forbidden characters

      lexer.reset(processedInput);
      for (const piece of lexer) {
          if (piece.type === "unknown") {
              hasError = true;
              errorType = ERROR_TYPES.FORBIDDEN_CHAR;
          }
          tokens.push(piece);
      }
  // Catch block handles critical failures in the tokenization process
  // This includes server crashes and lexer failures, or cases where the input is corrupted input that the lexer cannot process it.
  } catch (err) {
      hasError = true;
      errorType = ERROR_TYPES.CORRUPTFAIL;
      console.error("Tokenization error", err.message);
      tokens.push({type: 'error', value: err.message });

  }

  // Checks for comparison operators 
  const comparisonTokens = tokens.filter(token => token.type === "compare");

  // Check for forbidden characters & checks for comparison operator count
  if (errorType !== ERROR_TYPES.FORBIDDEN_CHAR) {

    if (comparisonTokens.length !== 1) {
        hasError = true;
        errorType = ERROR_TYPES.COMPARISON_COUNT;
    }
  }
  // Check for invalid expressions on both sides
  if (comparisonTokens.length === 1) {
      const [leftHandSide, rightHandSide] = processedInput.split(comparisonTokens[0].value);
      if (!isExpression(leftHandSide) && !isExpression(rightHandSide)) { 
          hasError = true;
          errorType = ERROR_TYPES.INVALID_EXPRESSION;
      }
      else if(!isExpression(rightHandSide)) {// Check for invalid expression on right hand side
          hasError = true;
          errorType = ERROR_TYPES.RIGHT_INVALID;
      }
      else if(!isExpression(leftHandSide)) {//  Check for invalid expression on left hand side
          hasError = true;
          errorType = ERROR_TYPES.LEFT_INVALID;
      }
  }

  // Return error message if there is an error
  if (hasError) {
      return {
          valid: false,
          cleanedInput: processedInput,
          message: `Error: ${errorType}`,
      };
  }
  else { // Return valid input if there is no error
      return {
          valid: true,
          cleanedInput: processedInput,
      };
  }

  //Function to check if an expression is a valid mathematical expression
  function isExpression(expression) {
    if (!expression || !expression.trim()) {
      return false;
    }
  
    const validMathExpression = /^[\d+\-*/%^().\s]+$/;
  
    if (!validMathExpression.test(expression)) {
      return false;
    }
  
    try {
      new Function('return ' + expression);
      return true;
    } catch (e) {
      return false;
    }
  }
  
}