import { join, resolve } from 'path'
const srcPath = path => {
    return resolve(process.cwd(), "src", path);
};

const outPath = (path = "") => {
    return resolve(process.cwd(), "release", path);
};
const excelJSPath = join(process.cwd(), 'node_modules/exceljs/dist/exceljs.min.js');

export {
    outPath,
    srcPath,
    excelJSPath
};
