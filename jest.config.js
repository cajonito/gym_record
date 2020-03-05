module.exports = {
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "globals": {
    "ts-jest": {
      "tsConfig": "tsconfig.json"
    }
  },
  "testMatch": [
    "**/tests/**/*.spec.+(ts|tsx|js)"
  ],
  "collectCoverageFrom": [
    "src/**/*.{ts, tsx}"
  ]
};
