const { series, parallel } = require("gulp");
const del = require("del");

require("ts-node").register({
    project: "./gulp/tsconfig.json",
});

// const { buildDesc } = require("./build/descripton");
// const { buildBrower } = require("./build/buildBrower");
// const { buildES, buildTypes } = require("./gulp/buildEs");
const { outPath } = require("./gulp/config");

const clean = () => del([outPath()]);

const { buildES, buildBrowser, buildDesc } = require("./gulp/gulpfile");

module.exports = {
    buildES,
    buildBrower: buildBrowser,
    buildDesc,
    build: series(clean, parallel(buildES, buildBrowser)),
};
