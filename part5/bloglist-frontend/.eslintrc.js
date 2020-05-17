module.exports = {
    "settings": {
        "react": {
            "version": "latest",
        },
    },
	'env': {
		'commonjs': true,
		'es6': true,
		'node': true,
        'jest': true,
	},
	'extends': ['eslint:recommended', "plugin:react/recommended"],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
    "plugins": [
      "react", "jest"
  ],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'eqeqeq': 'error',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': [
			'error', 'always'
		],
		'arrow-spacing': [
			'error', { 'before': true, 'after': true }
		],
		'no-console': 0,
		'no-unused-vars': ['error', {'args': 'none' } ],
        "react/prop-types": 0
	}
}