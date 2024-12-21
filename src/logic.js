// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "expression", "symbols": ["comparison"], "postprocess": id},
    {"name": "comparison", "symbols": ["arithmetic", "comparison_op", "arithmetic"], "postprocess": 
        ([left, op, right]) => {
            const ops = {
                ">": (a,b) => a > b,
                "<": (a,b) => a < b,
                "=": (a,b) => a === b,
                "!=": (a,b) => a !== b,
                ">=": (a,b) => a >= b,
                "<=": (a,b) => a <= b
            };
            return ops[op](left, right);
        }
                },
    {"name": "comparison", "symbols": ["arithmetic"], "postprocess": id},
    {"name": "comparison_op", "symbols": [/[<>=]/], "postprocess": id},
    {"name": "comparison_op$string$1", "symbols": [{"literal":"!"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comparison_op", "symbols": ["comparison_op$string$1"], "postprocess": id},
    {"name": "comparison_op$string$2", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comparison_op", "symbols": ["comparison_op$string$2"], "postprocess": id},
    {"name": "comparison_op$string$3", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comparison_op", "symbols": ["comparison_op$string$3"], "postprocess": id},
    {"name": "arithmetic", "symbols": ["term", "operation", "arithmetic"], "postprocess": 
        ([left, op, right]) => {
            const ops = {
                "+": (a,b) => a + b,
                "-": (a,b) => a - b
            };
            return ops[op](left, right);
        }
                },
    {"name": "arithmetic", "symbols": ["term"], "postprocess": id},
    {"name": "operation", "symbols": [/[+-]/], "postprocess": id},
    {"name": "term", "symbols": ["factor", "term_op", "term"], "postprocess": 
        ([left, op, right]) => {
            const ops = {
                "*": (a,b) => a * b,
                "/": (a,b) => a / b
            };
            return ops[op](left, right);
        }
                },
    {"name": "term", "symbols": ["factor"], "postprocess": id},
    {"name": "term_op", "symbols": [/[*/]/], "postprocess": id},
    {"name": "factor", "symbols": [{"literal":"("}, "arithmetic", {"literal":")"}], "postprocess": data => data[1]},
    {"name": "factor", "symbols": ["decimal"], "postprocess": id},
    {"name": "decimal", "symbols": ["integers", {"literal":"."}, "integers"], "postprocess": ([whole, _, decimal]) => parseFloat(whole + "." + decimal)},
    {"name": "decimal", "symbols": ["integers"], "postprocess": ([n]) => parseInt(n)},
    {"name": "integers", "symbols": ["digit", "integers"], "postprocess": ([d,ds]) => d + ds},
    {"name": "integers", "symbols": ["digit"], "postprocess": id},
    {"name": "digit", "symbols": [/[0-9]/], "postprocess": id}
]
  , ParserStart: "expression"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
