const { series, parallel, dest, src } = require('gulp');
const vinyl = require('vinyl');
const rollup = require('rollup');
const rollupTypescript = require('@rollup/plugin-typescript');
const rollupTerser = require("rollup-plugin-terser");
const del = require('del');
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs')
const clean = (dir) => () => del(...dir);
const nodeResolve = require('@rollup/plugin-node-resolve');
const through = require('through2');

const { Transform } = require('stream');
const fs = require('fs');

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
    // const r = fs.createWriteStream('./index.d.ts');
    // r.on('pipe', (stream) => {
    //     console.log('Something is piping into the writer.');
    //     debugger
    // })
    return src('./types/**/*.d.ts', { base: './' }).pipe(((path) => {
        let mergeFile = new vinyl({
            path: path,
            contents: Buffer.from('')
        })
        const end = Buffer.from('\n\n');
        return  through.obj(function (file, enc, cb) {
            if (file.isNull()) {
                // 返回空文件
                return cb(null, file);
            }
            let name = Buffer.from(`/*****${file.basename}****/\n`);
            if (file.isBuffer()) {
                mergeFile.contents = Buffer.concat([mergeFile.contents, name, file.contents, end]);
            }
            if (file.isStream()) {
                // file.contents = file.contents.pipe(prefixStream(prefixText));
            }
            return cb(null, mergeFile);
        });
    })('./index.d.ts')).pipe(dest('./dist'))
}


module.exports = {
    build: series(parallel(buildBrower, buildESModule)),
    buildESModule: series(clean(['./dist/nabsTools.esm.js']), buildESModule),
    buildBrower: series(clean(['./dist/nabsTools.brower.js']), buildBrower),
    buildTypes: series(clean(['./types']), buildTypes),
    integrate: series(clean(['./index.d.ts']), integrate),
};
