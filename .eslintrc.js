module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "parser": "babel-eslint",
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "no-console": 0,
        "indent": [
            "error"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        //"quotes": [
        //    "error"
        //],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": 0
    }
};