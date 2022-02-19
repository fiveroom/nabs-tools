const { series, parallel, dest, src } = require('gulp');
const vinyl = require('vinyl');
const rollup = require('rollup');
// const rollupTypescript = require('@rollup/plugin-typescript');
const rollupTerser = require("rollup-plugin-terser");
const del = require('del');
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs')
const through = require('through2');
const fs = require('fs');
const { Transform } = require('stream');
const ts = require('gulp-typescript');

const clean = (dir) => () => del(...dir);
const babelTs = ["@babel/preset-typescript"];
var merge = require('merge2');
const babelPresets = [
    ...babelTs,
    [
        "@babel/preset-env",
        {
            targets: "defaults, not ie 9, not ie_mob 11"
        }
    ]
]

// {
//     "presets": [
//         "@babel/preset-typescript",
//         [
//             "@babel/preset-env"
//             // ,
//             // {
//             //     "useBuiltIns": "usage",
//             //     "corejs": 3

//             // }
//         ]
//     ]
//     ,
//     "plugins": [
//         // [
//         //     "@babel/plugin-transform-runtime"
//         // ],
//         "@babel/plugin-external-helpers"
//     ]
// }

// 浏览器包含polly
const buildBrower = () => {
    return rollup
        .rollup({
            input: './src/main.ts',
            plugins: [
                commonjs(),
                babel.babel({
                    babelHelpers: "bundled",
                    extensions: [".ts"],
                    presets: babelPresets,
                    targets: []
                }),
                rollupTerser.terser({
                    ecma: 2020
                })
            ],
        })
        .then((bundle) => {
            return bundle.write(
                {
                    format: 'iife',
                    name: 'nabsTools',
                    file: './dist/brower/nabsTools.brower.js',
                    sourcemap: true,
                }
            );
        });
};

const buildESModule = () => {
    return rollup
        .rollup({
            input: 'src/main.ts',
            plugins: [
                babel.babel({
                    babelHelpers: "runtime",
                    extensions: [".ts"],
                    presets: [...babelTs, "@babel/preset-env"],
                    plugins: ["@babel/plugin-transform-runtime"]
                }),
            ],
        }).then(bundle => {
            return bundle.write({
                format: 'esm',
                file: './dist/nabsTools.esm.js',
                sourcemap: true
            })
        })
}

const buildTypes = () => {
    return rollup.rollup({
        input: './src/main.ts',
        plugins: [
            rollupTypescript({
                tsconfig: './tsconfig.json',
            })
        ]
    }).then(bundle => {
        return bundle.write({
            dir: './types',
        })
    })
}


const integrate = () => {
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

            return through.obj(function (file, enc, cb) {
                if (file.isNull()) {
                    // 返回空文件
                    // return cb(null, file);
                    return cb(null)
                }
                let name = Buffer.from(`/*****${file.basename}****/\n`);
                if (file.isBuffer()) {
                    writeSteream.write(Buffer.concat([mergeFile.contents, name, file.contents, end]))
                    // mergeFile.contents = Buffer.concat([mergeFile.contents, name, file.contents, end]);
                }
                if (file.isStream()) {
                    // file.contents = file.contents.pipe(prefixStream(prefixText));
                }
                cb(null)
                // return cb(null, mergeFile);
            });
        })('./index.d.ts'))
}


module.exports = {
    build: series(parallel(buildBrower, buildESModule)),
    buildESModule: series(clean(['./dist/nabsTools.esm.js']), buildESModule),
    buildBrower: series(clean(['./dist/nabsTools.brower.js']), buildBrower),
    buildTypes: series(clean(['./types']), buildTypes),
    integrate: series(clean(['./index.d.ts']), integrate),
};
