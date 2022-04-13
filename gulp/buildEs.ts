import * as rollup from 'rollup';
import * as nodeResolve from "@rollup/plugin-node-resolve"
import * as babel from '@rollup/plugin-babel'
import { gulpHandleImport } from './tools/gulpHandleImport'
import concat from 'gulp-concat'
import {dest, src, parallel} from 'gulp'
import ts from "gulp-typescript"
import commonjs from "@rollup/plugin-commonjs"
import { excelJSPath, outPath, srcPath } from './config'


const buildES = () => {
    return rollup
        .rollup({
            input: srcPath("main.ts"),
            plugins: [
                nodeResolve.nodeResolve({
                    extensions: [".ts"],
                }),
                babel.babel({
                    babelHelpers: "runtime",
                    extensions: [".ts"],
                    presets: [
                        "@babel/preset-typescript",
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    chrome: "60", // es5
                                },
                            },
                        ],
                    ],
                    plugins: ["@babel/plugin-transform-runtime"],
                    configFile: false,
                }),
                commonjs(),
            ],
            external: ["exceljs", "ExcelJS", excelJSPath],
        })
        .then(bundle => {
            return bundle.write({
                format: "esm",
                file: outPath("index.js"),
                sourcemap: true,
            });
        });
};

const buildTypes = () => {
    return src("src/**/*.ts")
        .pipe(
            ts({
                declaration: true,
                emitDeclarationOnly: true,
            })
        )
        .pipe(concat("index.d.ts"))
        .pipe(gulpHandleImport())
        .pipe(dest(outPath()));
};

export default parallel(buildES, buildTypes)
