chosen
======

chosen is a node module to make multiple-choice questions easy on CLIs.

Install
-------

`npm install chosen`

Use
---

```js

var choose = require("chosen").choose;

console.log("What is your favorite language?");
choose(
    ["English", "Klingon", "Malbolge"],
    function(answer, index) {
        console.log("I like " + answer + ", too!");
    },
    {} // options
);
```

Styles
------
You can feed any of the following options:

* **style**: one of `[">", "gray", "indent"]`, or an object `{normal: <function>, chosen: <function>}`, where the functions return a formatted version of their inputs

Interaction
-----------
chosen interaction was—ahem—*chosen* to be intuitive:
* `<enter>` and `<space>` select the current choice
* `<esc>` and `<^C>` to escape (sends `null`)
* `(up arrow, down arrow)`, `(k,j)` (vim!),`(q, a)`, and `(p, l)` for scrolling up/down (any other key defaults to "down")
