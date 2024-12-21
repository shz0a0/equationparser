expression
    -> comparison {% id %}

comparison
    -> arithmetic comparison_op arithmetic
        {%
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
        %}
    | arithmetic {% id %}

comparison_op
    -> [<>=] {% id %}
    | "!=" {% id %}
    | ">=" {% id %}
    | "<=" {% id %}

arithmetic
    -> term operation arithmetic
        {%
            ([left, op, right]) => {
                const ops = {
                    "+": (a,b) => a + b,
                    "-": (a,b) => a - b
                };
                return ops[op](left, right);
            }
        %}
    | term {% id %}

operation
    -> [+-] {% id %}

term
    -> factor term_op term 
        {%
            ([left, op, right]) => {
                const ops = {
                    "*": (a,b) => a * b,
                    "/": (a,b) => a / b
                };
                return ops[op](left, right);
            }
        %}
    | factor {% id %}

term_op
    -> [*/] {% id %}

factor
    -> "(" arithmetic ")" {% data => data[1] %}
    | decimal {% id %}

decimal
    -> integers "." integers {% ([whole, _, decimal]) => parseFloat(whole + "." + decimal) %}
    | integers {% ([n]) => parseInt(n) %}

integers
    -> digit integers {% ([d,ds]) => d + ds %}
    | digit {% id %}

digit
    -> [0-9] {% id %}