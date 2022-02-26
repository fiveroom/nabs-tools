const { resolve } = require("path");

const srcPath = path => {
    return resolve(process.cwd(), "src", path);
};

const outPath = (path = "") => {
    return resolve(process.cwd(), "release", path);
};

module.exports = {
    outPath,
    srcPath,
};
