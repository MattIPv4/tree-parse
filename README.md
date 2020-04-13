# tree-parse

A super simple package to parse the string output of the unix tree command into an object.

---

Use the `parse` function to convert the output of the unix `tree` command into an object.
The object will contain keys for each file or directory found.

Each file will have a value that is an empty object,
with each directory's value being an object containing all its children.

Use the `files` function to convert the output of the `tree` function into a single array of files, as strings.

---

```javascript
const { parse } = require('tree-parse');

const demo = `
.
├── README.md
├── example.png
├── package-lock.json
├── package.json
├── src
│   ├── app.js
│   ├── util.js
│   └── test
│       └── test.js
└── index.js

2 directories, 8 files
`;

const tree = parse(demo);
console.log(tree);
```

```json
{
    ".": {
        "README.md": {},
        "example.png": {},
        "package-lock.json": {},
        "package.json": {},
        "src": {
            "app.js": {},
            "util.js": {},
            "test": {
                "test.js": {}
            }
        },
        "index.js": {}
    }
}
```

```javascript
const { parse, files } = require('tree-parse');

const demo = `
.
├── README.md
├── example.png
├── package-lock.json
├── package.json
├── src
│   ├── app.js
│   ├── util.js
│   └── test
│       └── test.js
└── index.js

2 directories, 8 files
`;

const tree = parse(demo);
const list = files(tree);
console.log(list);
```

```json
[
    "./README.md",
    "./example.png",
    "./package-lock.json",
    "./package.json",
    "./src/app.js",
    "./src/util.js",
    "./src/test/test.js",
    "./index.js"
]
```
