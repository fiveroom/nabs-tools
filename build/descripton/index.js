const { resolve } = require("path");
const replace = require("gulp-replace");
const { src, dest, parallel } = require("gulp");
const rename = require("gulp-rename");
const { outPath } = require("../config");

const buildPkg = () => {
    let cwd = process.cwd();
    let mainPkg = require(resolve(cwd, "package.json"));
    return src(resolve(__dirname, "./_release"))
        .pipe(replace("{{version}}", mainPkg.version))
        .pipe(rename("package.json"))
        .pipe(dest(outPath()));
};

const moveReadme = () => {
    let cwd = process.cwd();
    return src(resolve(cwd, "README.md")).pipe(dest(outPath()));
};

module.exports = {
    buildDesc: parallel(buildPkg, moveReadme),
};
