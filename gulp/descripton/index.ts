import { resolve } from 'path'
import replace from 'gulp-replace'
import { src, dest, parallel } from 'gulp'
import rename from 'gulp-rename'
import { outPath, srcPath } from '../config'


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

export default parallel(buildPkg, moveReadme)

