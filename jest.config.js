/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */


module.exports = {
    // preset: 'ts-jest',
    // // testEnvironment: 'node',
    // extensionsToTreatAsEsm: ['.ts'],
    // globals: {
    //     'ts-jest': {
    //         useESM: true,
    //     },
    // },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest"
    },
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
};
