const { series, parallel } = require('gulp');
const rollup = require('rollup');
const rollupTypescript = require('@rollup/plugin-typescript');
const rollupTerser = require("rollup-plugin-terser");
const del = require('del');
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs')
const clean = (dir) => () => del(...dir);
const nodeResolve = require('@rollup/plugin-node-resolve');

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
                tsconfig: './tsconfig.json'
            })
        ]
    }).then(bundle => {
        return bundle.write({
            // format: 'esm',
            // file: './dist/esm/nabsTools.esm.js',
            dir: './types',
            // entryFileNames: '[name].js'
        })
    })
}

module.exports = {
    build: series(parallel(buildBrower, buildESModule)),
    buildESModule: series(clean(['./dist/nabsTools.esm.js']), buildESModule),
    buildBrower: series(clean(['./dist/nabsTools.brower.js']), buildBrower),
    buildTypes: series(clean(['./types']), buildTypes),
};
