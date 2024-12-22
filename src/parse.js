const nearley = require("nearley");
const grammar = require("./logic.js");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
try {
    parser.feed("3*(4+2)=(9/3)*(19-13)");
    console.log(parser.results);
} catch (e) {
    console.log("Failed!", e.message);
}