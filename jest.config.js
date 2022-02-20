/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */


module.exports = {
    preset: 'ts-jest',
    // testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },

    transform: {}
};
