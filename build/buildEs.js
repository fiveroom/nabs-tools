const rollup = require("rollup");
const nodeResolve = require("@rollup/plugin-node-resolve");
const babel = require("@rollup/plugin-babel");
const handleImport = require("./tools/gulpHandleImport");
const concat = require("gulp-concat");
const { dest, src } = require("gulp");
const ts = require("gulp-typescript");
const commonjs = require("@rollup/plugin-commonjs");
const { outPath, srcPath } = require("./config");

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
            external: ["exceljs"],
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
        .pipe(handleImport())
        .pipe(dest(outPath()));
};

module.exports = {
    buildES,
    buildTypes,
};
