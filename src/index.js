const { sep } = require('path');

/**
 * Calculates the directory level/indent for a line from a tree output.
 *
 * @private
 * @param {string} line The line from the unix `tree` command output to process.
 * @returns {number} The directory level or how indented the line is in the tree.
 */
const indent = line => {
    return (line.match(new RegExp('[│├└]', 'g')) || []).length;
};

/**
 * Strips all tree ascii decoration from a line to get just the file/directory name.
 *
 * @private
 * @param {string} line The line from the unix `tree` command output to process.
 * @returns {string} The name of the file/directory on the line, stripped of any decoration or whitespace.
 */
const name = line => {
    return line.replace(new RegExp('^[│├└─\\s]*'), '').trim();
};

/**
 * Stores a new child in the tree, based on a given stack of parents.
 *
 * @private
 * @param {Object} tree The parsed tree object.
 * @param {Array<string>} parents The parents of the new child to store.
 * @param {string} item The new child file/directory to add to the tree.
 */
const store = (tree, parents, item) => {
    let parentObj = tree;
    for (const parent of parents) {
        parentObj = parentObj[parent];
    }
    parentObj[item] = {};
};

/**
 * Parse a string output from the unix `tree` command into an object.
 *
 * Will return an object with files being a key and a blank object as the value,
 * directories will be a key with an object containing children as the value.
 *
 *     {
 *         '.': {                  // Directory
 *             'README.md': {},    // File
 *             'hello': {          // Directory
 *                 'world.md': {}  // File
 *             }
 *         }
 *     }
 *
 * @param {string} input The output of the `tree` command to parse.
 * @returns {Object} The parsed tree, as an object.
 */
const parse = input => {
    const lines = input.trim().split('\n');
    const tree = {}; // The final tree
    const parents = []; // A stack used to track the parents and current child
    let lastIndent = -1; // By starting at -1, the first if statement will handle adding the base dir

    for (const line of lines) {
        const thisIndent = indent(line);
        const thisName = name(line);

        // If the line is empty, ignore
        if (!thisName) continue;

        // If we're indented more than previous, we're inside the last parent
        if (thisIndent > lastIndent) {
            store(tree, parents, thisName); // Store this in the tree
            parents.push(thisName); // Store this as the last parent/child

            lastIndent = thisIndent; // Update indent
            continue; // Done
        }

        // If we're less indented than previous, we're above the last parent
        if (thisIndent < lastIndent) {
            // If we're at zero, we've reached the end of tree
            if (thisIndent === 0) continue;

            parents.pop(); // Remove the last child of the parent we're not in
            parents.pop(); // Remove the parent we're not in
            store(tree, parents, thisName); // Store this in the tree
            parents.push(thisName); // Store this as the last parent/child

            lastIndent = thisIndent; // Update indent
            continue; // Done
        }

        // We're on the same level as last time
        parents.pop(); // Remove the last child
        store(tree, parents, thisName); // Store this in the tree
        parents.push(thisName); // Store this as the last child

        lastIndent = thisIndent; // Update indent
    }

    return tree;
};

/**
 * Get the full path for a child in a given parent.
 *
 * @private
 * @param {string} child The child to join to the parent path.
 * @param {string} parent The path to place the child into.
 * @returns {string} The resulting path for the child in the parent.
 */
const full = (child, parent) => {
    return [parent, child].filter(x => !!x).join(sep);
};

/**
 * Convert a parsed tree object into a list of files with their directories.
 *
 * @param {Object} tree The parsed tree, from the `parse` function in this package/file.
 * @param {string|null} [parent=null] The parent directory for the tree, defaults to null for a top-level tree.
 * @returns {Array<string>} The full list of all files in the tree.
 */
const files = (tree, parent = null) => {
    const entries = [];

    for (const child in tree) {
        if (!tree.hasOwnProperty(child)) continue;

        // If this is a file (empty object as val), simply store it
        if (!Object.keys(tree[child]).length) {
            entries.push(full(child, parent));
            continue;
        }

        // This is a directory, recurse and store what's returned
        entries.push(...files(tree[child], full(child, parent)));
    }

    return entries;
};

module.exports = { parse, files };
