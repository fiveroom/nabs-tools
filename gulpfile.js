const { series, parallel } = require("gulp");
const del = require("del");

const { buildDesc } = require("./build/descripton");
const { buildBrower } = require("./build/buildBrower");
const { buildES, buildTypes } = require("./build/buildEs");
const { outPath } = require("./build/config");

const clean = () => del([outPath()]);

module.exports = {
    build: series(clean, parallel(buildBrower, buildES, buildTypes)),
    buildDesc,
    buildBrower,
    buildES,
    buildTypes,
    clean,
};
