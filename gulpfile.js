const { series, parallel, dest, src } = require('gulp');
const vinyl = require('vinyl');
const rollup = require('rollup');
const rollupTerser = require("rollup-plugin-terser");
const del = require('del');
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve');
const through = require('through2');
const fs = require('fs');
const ts = require('gulp-typescript');
const { Buffer } = require('buffer')

const clean = (dir) => () => del(...dir);
const babelTs = ["@babel/preset-typescript"];
const babelPresets = [
    ...babelTs,
    [
        "@babel/preset-env",
        {
            targets: "defaults, not ie 9, not ie_mob 11"
        }
    ]
]

// 浏览器包含polly
const buildBrower = () => {
    return rollup
        .rollup({
            input: './src/main.ts',
            plugins: [
                // commonjs(),
                nodeResolve.nodeResolve({
                    extensions: ['.ts']
                }),
                babel.babel({
                    babelHelpers: "bundled",
                    extensions: [".ts"],
                    presets: babelPresets,
                    targets: [],
                    configFile: false
                }),
                rollupTerser.terser({
                    ecma: 2020
                })
            ],
            external: 'exceljs'
        })
        .then((bundle) => {
            return bundle.write(
                {
                    format: 'iife',
                    name: 'nabsTools',
                    file: './release/index.brower.js',
                    sourcemap: true,
                    globals: {
                        'exceljs': 'ExcelJS'
                    }
                }
            );
        });
};

const buildESModule = () => {
    return rollup
        .rollup({
            input: 'src/main.ts',
            plugins: [
                nodeResolve.nodeResolve({
                    extensions: ['.ts']
                }),
                babel.babel({
                    babelHelpers: "runtime",
                    extensions: [".ts"],
                    presets: [...babelTs, "@babel/preset-env"],
                    plugins: ["@babel/plugin-transform-runtime"],
                    configFile: false,
                }),
                commonjs()
            ],
            external: ['exceljs']
        }).then(bundle => {
            return bundle.write({
                format: 'esm',
                file: './release/index.js',
                sourcemap: true
            })
        })
}

const buildTypes = () => {

    return src('src/**/*.ts')
        .pipe(ts({
            declaration: true,
            emitDeclarationOnly: true,
        })).pipe(((path) => {
            let mergeFile = new vinyl({
                path: path,
                contents: Buffer.from('')
            })
            const end = Buffer.from('\n\n');
            let writeSteream = fs.createWriteStream(path);
            const regex = /\bexport\b\s+.*?\bfrom\b\s*("|'){1}[A-Za-z0-9_\.\/]*("|')\s*;?\n*/g;
            return through.obj(function (file, enc, cb) {
                if (file.isNull()) {
                    return cb(null)
                }
                let name = Buffer.from(`// /---------- ${file.basename.replace(/(\.d)(\.ts)$/, "$2")} ----------/\n`);
                if (file.isBuffer()) {
                    writeSteream.write(Buffer.concat([mergeFile.contents, name, Buffer.from(file.contents.toString().replace(regex, '')), end]))
                }
                if (file.isStream()) {
                }
                cb(null)
            });
        })('./release/index.d.ts'))
}

const pkg = () => {
    let read = fs.createReadStream('./_release');
    return read.pipe(fs.createWriteStream('./release/package.json'))
}

const readme = () => {
    return src('./README.md').pipe(dest('./release'))
}

module.exports = {
    build: series(clean(['./release']), parallel(buildBrower, buildESModule), parallel(buildTypes, pkg)),
    buildESModule: series(clean(['./release/index.esm.js']), buildESModule),
    buildBrower: series(clean(['./release/index.brower.js']), buildBrower),
    buildTypes: series(clean(['./release/index.d.ts']), buildTypes),
    buildPkg: parallel(pkg, readme)
};
