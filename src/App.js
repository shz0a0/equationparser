import React, { useState } from "react";
import { checkInput } from "./lexer";
import nearley from "nearley";
import grammar from "./logic.js";
import './App.css';

function App() {
  // State variables to store the input expression, result, 
  // validity of the expression and invalid content
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isValid, setIsValid] = useState(null);


  
  // Main function to handle the parsing of the input expression
  const handleParse = () => {
    if (!input.trim()) {
      setIsValid(false);
      setResult('Please enter an expression');
      return;
    }
    const { valid, cleanedInput, message } = checkInput(input);
    setInput(cleanedInput);
    setIsValid(valid);
    if (valid) {
      const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
      parser.feed(cleanedInput);
      setResult(parser.results[0] ? 'True' : 'False');
    } else {
      setResult(message);
    }
  };

  
  // Predefined example expressions for user to test
  const EXAMPLE_EXPRESSIONS = [
    { text: '2 + 2 = 4' },
    { text: '5 * 3 = 15' },
    { text: '10 - 7 = 3' },
    { text: '20 / 4 = 5' },
    { text: '3 * (4 + 2) = 18' },
    { text: '3 * (4 + 2) = (9 / 3) * (19-13)' },
  ];

  // Handle example expression click
  const handleExampleClick = (text) => {
    setInput(text);
  };

  // Main UI render with:
  // 1. Input textarea with Enter key support
  // 2. Parse button
  // 3. Example expressions grid
  // 4. Result display to determine whether the expression is valid or not
  return (
    <div className="App">
      <div className="main-container">
        <h1 className="title">What would you like to parse?</h1>
        <p className="subtitle">Parse and validate mathematical expressions with ease.</p>
        
        <div className="input-wrapper">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your expression..."
            className="input-field"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleParse();
              }
            }}
          />
          <button onClick={handleParse} className="parse-button">
            Parse
          </button>
        </div>

        <div className="examples-section">
          <div className="examples-grid">
            {EXAMPLE_EXPRESSIONS.map((example, index) => (
              <button
                key={index}
                className="example-button"
                onClick={() => handleExampleClick(example.text)}
              >
                {example.text}
              </button>
            ))}
          </div>

        {result && (
          <div className={`result-box ${isValid && result === 'True' ? 'true' : isValid && result === 'False' ? 'false' : ''}`}>
            {result}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
