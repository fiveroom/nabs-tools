import * as nodeResolve from "@rollup/plugin-node-resolve"
import * as babel from '@rollup/plugin-babel'
import * as rollup from 'rollup'
import rollupTerser from 'rollup-plugin-terser'
import { outPath, srcPath } from './config'


const buildBrower = () => {
    return rollup
        .rollup({
            input: srcPath("main.ts"),
            plugins: [
                // commonjs(),
                nodeResolve.nodeResolve({
                    extensions: [".ts"],
                }),
                babel.babel({
                    babelHelpers: "bundled",
                    extensions: [".ts"],
                    presets: [
                        "@babel/preset-typescript",
                        [
                            "@babel/preset-env",
                            {
                                targets: "defaults, not ie 9, not ie_mob 11",
                            },
                        ],
                    ],
                    configFile: false,
                }),
                rollupTerser.terser({
                    ecma: 2020,
                }),
            ],
            external: "exceljs",
        })
        .then(bundle => {
            return bundle.write({
                format: "iife",
                name: "nabsTools",
                file: outPath("index.brower.js"),
                sourcemap: true,
                globals: {
                    exceljs: "ExcelJS",
                },
            });
        });
};

export default buildBrower
