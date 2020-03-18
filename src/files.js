const { sep } = require('path');


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
        if (!Object.prototype.hasOwnProperty.call(tree, child)) continue;

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

module.exports = files;
