/*
 * Package @donmahallem/eslint-config
 * Source https://donmahallem.github.io/js-libs/
 */

/* eslint quote-props: ["error", "always"]*/
/* eslint-env es6*/
import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment
const packageInfo = require(path.join(process.cwd(), 'package.json'));

/**
 * Missing rules
 * 'import-spacing','static-this':,'switch-final-break','typedef','whitespace'
 */
module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: [
        'eslint-plugin-jsdoc',
        'eslint-plugin-prefer-arrow',
        'eslint-plugin-import',
        'eslint-plugin-no-null',
        'header',
        '@typescript-eslint',
    ],
    rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'array',
            },
        ],
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    Boolean: {
                        message: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
                    },
                    Function: {
                        message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
                    },
                    Number: {
                        message: 'Avoid using the `Number` type. Did you mean `number`?',
                    },
                    Object: {
                        message: 'Avoid using the `Object` type. Did you mean `object`?',
                    },
                    String: {
                        message: 'Avoid using the `String` type. Did you mean `string`?',
                    },
                    Symbol: {
                        message: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
                    },
                },
            },
        ],
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/explicit-member-accessibility': [
            'off',
            {
                accessibility: 'explicit',
            },
        ],
        '@typescript-eslint/indent': 'error',
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false,
                },
            },
        ],
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                format: ['UPPER_CASE'],
                selector: 'enumMember',
            },
        ],
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-shadow': [
            'error',
            {
                hoist: 'all',
            },
        ],
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-literal-enum-member': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/triple-slash-reference': [
            'error',
            {
                lib: 'always',
                path: 'always',
                types: 'prefer-import',
            },
        ],
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        'arrow-body-style': 'error',
        'brace-style': ['error', '1tbs'],
        'comma-dangle': ['error', 'always-multiline'],
        complexity: 'off',
        'constructor-super': 'error',
        curly: ['error', 'multi-line'],
        'dot-notation': 'error',
        'eol-last': 'error',
        eqeqeq: ['error', 'smart'],
        'guard-for-in': 'error',
        'header/header': [
            2,
            'block',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            ['', ` * Package ${packageInfo.name as string}`, ` * Source ${packageInfo.homepage as string}`, ' '],
            2,
        ],
        'id-blacklist': 'error',
        'id-match': 'error',
        'import/no-deprecated': 'warn',
        'import/order': [
            'error',
            {
                alphabetize: {
                    caseInsensitive: false,
                    order: 'asc',
                },
                groups: [['external', 'builtin'], ['sibling', 'parent', 'internal'], 'index', 'object', 'type'],
            },
        ],
        indent: 'error',
        'jsdoc/check-alignment': 'error',
        'jsdoc/check-indentation': 'error',
        'jsdoc/newline-after-description': 'error',
        'jsdoc/no-types': 'error',
        'max-classes-per-file': ['error', 1],
        'max-len': [
            'error',
            {
                code: 140,
            },
        ],
        'new-parens': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-console': [
            'error',
            {
                allow: [
                    'log',
                    'warn',
                    'dir',
                    'timeLog',
                    'assert',
                    'clear',
                    'count',
                    'countReset',
                    'group',
                    'groupEnd',
                    'table',
                    'dirxml',
                    'error',
                    'groupCollapsed',
                    'Console',
                    'profile',
                    'profileEnd',
                    'timeStamp',
                    'context',
                ],
            },
        ],
        'no-debugger': 'error',
        'no-empty': 'off',
        'no-empty-function': 'off',
        'no-eval': 'error',
        'no-fallthrough': 'error',
        'no-invalid-this': 'off',
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1,
            },
        ],
        'no-new-wrappers': 'error',
        'no-null/no-null': 'error',
        'no-restricted-imports': ['error', 'rxjs/Rx'],
        'no-return-await': 'error',
        'no-shadow': 'off',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'error',
        'no-unsafe-finally': 'error',
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error',
        'no-unused-vars': 'error',
        'no-use-before-define': 'off',
        'no-var': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'prefer-arrow/prefer-arrow-functions': 'error',
        'prefer-const': 'error',
        'prefer-template': 'error',
        'quote-props': ['error', 'as-needed'],
        quotes: ['error', 'single'],
        radix: 'error',
        semi: 'error',
        'sort-keys': [
            'error',
            'asc',
            {
                caseSensitive: true,
                minKeys: 2,
                natural: false,
            },
        ],
        'spaced-comment': [
            'error',
            'always',
            {
                markers: ['/'],
            },
        ],
        'use-isnan': 'error',
        'valid-typeof': 'off',
    },
};
