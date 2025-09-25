module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
  ],
  plugins: [
    'security',
    'node',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    // === SECURITY RULES FOR AUTHENTICATION ===
    
    // General Security Rules
    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'error',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-non-literal-fs-filename': 'error',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-non-literal-require': 'error',
    'security/detect-object-injection': 'error',
    'security/detect-possible-timing-attacks': 'error',
    'security/detect-pseudoRandomBytes': 'error',
    'security/detect-unsafe-regex': 'error',
    
    // Authentication-specific Security Rules
    'no-console': 'warn', // Avoid logging sensitive auth data
    'no-debugger': 'error', // No debug statements in production
    'no-eval': 'error', // Never use eval() - security risk
    'no-implied-eval': 'error', // Avoid setTimeout/setInterval with strings
    'no-new-func': 'error', // Avoid Function constructor
    'no-script-url': 'error', // Avoid javascript: URLs
    
    // Authentication Data Handling
    'prefer-const': 'error', // Use const for immutable auth data
    'no-var': 'error', // Use let/const instead of var
    'no-global-assign': 'error', // Prevent global object modification
    'no-implicit-globals': 'error', // Avoid global scope pollution
    
    // Node.js Security Rules
    'node/no-deprecated-api': 'error', // Avoid deprecated Node.js APIs
    'node/no-extraneous-require': 'error', // Only require declared dependencies
    'node/no-missing-require': 'error', // Ensure required modules exist
    'node/no-process-exit': 'warn', // Avoid process.exit() - use proper error handling
    'node/no-sync': 'warn', // Avoid synchronous methods in production
    'node/no-unpublished-require': 'off', // Allow dev dependencies in dev env
    
    // JWT and Token Security
    'no-unused-vars': ['error', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_'
    }], // Ensure tokens and secrets are used properly
    
    // Password and Hash Security
    'prefer-template': 'error', // Use template literals for string concatenation
    'no-useless-concat': 'error', // Avoid unnecessary string concatenation
    
    // Session Management Security
    'eqeqeq': ['error', 'always'], // Always use strict equality
    'no-implicit-coercion': 'error', // Avoid implicit type coercion
    'no-magic-numbers': ['warn', {
      'ignore': [0, 1, -1, 200, 201, 400, 401, 403, 404, 500],
      'ignoreArrayIndexes': true,
      'enforceConst': true
    }], // Use constants for magic numbers (except common HTTP codes)
    
    // Error Handling for Authentication
    'prefer-promise-reject-errors': 'error', // Proper error rejection
    'no-throw-literal': 'error', // Throw Error objects, not literals
    'handle-callback-err': 'error', // Handle callback errors properly
    
    // Code Quality for Security
    'complexity': ['warn', { 'max': 10 }], // Limit cyclomatic complexity
    'max-depth': ['warn', 4], // Limit nesting depth
    'max-params': ['warn', 4], // Limit function parameters
    'max-statements': ['warn', 20], // Limit statements per function
    
    // Authentication Flow Security
    'no-return-assign': 'error', // Avoid return assignments
    'no-sequences': 'error', // Avoid comma operator
    'no-unmodified-loop-condition': 'error', // Avoid infinite loops
    'no-unreachable': 'error', // Detect unreachable code
    'no-unsafe-negation': 'error', // Proper boolean negation
    
    // API Security
    'array-callback-return': 'error', // Ensure array methods return values
    'consistent-return': 'error', // Consistent return statements
    'default-case': 'error', // Always have default case in switch
    'dot-notation': 'error', // Use dot notation when possible
    
    // Memory and Performance Security
    'no-loop-func': 'error', // Avoid functions in loops
    'no-caller': 'error', // Avoid arguments.caller/callee
    'no-extend-native': 'error', // Don't extend native prototypes
    'no-extra-bind': 'error', // Avoid unnecessary bind()
    
    // Environment-specific
    'no-process-env': 'warn', // Control process.env access (use dotenv)
    'no-undef': 'error', // No undefined variables
    'no-unused-expressions': ['error', {
      'allowShortCircuit': true,
      'allowTernary': true
    }], // No unused expressions except short-circuit
  },
  
  // Environment-specific configurations
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true,
        mocha: true,
      },
      rules: {
        'no-console': 'off', // Allow console in tests
        'no-magic-numbers': 'off', // Allow magic numbers in tests
        'max-statements': 'off', // Allow more statements in tests
      }
    },
    {
      files: ['src/config/**/*.js'],
      rules: {
        'no-process-env': 'off', // Allow process.env in config files
      }
    },
    {
      files: ['src/middleware/**/*.js'],
      rules: {
        'no-unused-vars': ['error', { 
          'args': 'after-used',
          'argsIgnorePattern': '^(req|res|next)$'
        }], // Allow unused Express middleware params
      }
    }
  ],
  
  // Global settings
  settings: {
    node: {
      version: '>=18.0.0', // Minimum Node.js version for security
      allowModules: [
        'bcryptjs',
        'jsonwebtoken', 
        'express-session',
        'passport',
        'helmet',
        'cors',
        'express-rate-limit'
      ], // Allowed security-related modules
    }
  }
};
