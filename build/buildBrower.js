const rollup = require("rollup");
const nodeResolve = require("@rollup/plugin-node-resolve");
const babel = require("@rollup/plugin-babel");
const rollupTerser = require("rollup-plugin-terser");
const { outPath, srcPath } = require("./config");

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
                    targets: [],
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

module.exports = {
    buildBrower,
};
