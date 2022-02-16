const { series, parallel } = require('gulp');
const rollup = require('rollup');
const rollupTypescript = require('@rollup/plugin-typescript');
const rollupTerser = require("rollup-plugin-terser");
const del = require('del');
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs')
const clean = (dir) => () => del(...dir);
const nodeResolve = require('@rollup/plugin-node-resolve');


const babelPresets = [
    "@babel/preset-typescript", "@babel/preset-env"
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
                    presets: babelPresets
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
            input: {
                main: 'src/main.ts',
                'string/trimAll': 'src/string/trimAll.ts'
            },
            plugins: [
                rollupTypescript({
                    tsconfig: false
                }),
                // rollupTerser.terser()
            ],
        }).then(bundle => {
            return bundle.write({
                format: 'esm',
                // file: './dist/esm/nabsTools.esm.js',
                dir: './dist/esm',
                // entryFileNames: '[name].js'
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
    buildESModule: series(clean(['./dist/esm']), buildESModule),
    buildBrower: series(clean(['./dist/brower']), buildBrower),
    buildTypes: series(clean(['./types']), buildTypes),
};
