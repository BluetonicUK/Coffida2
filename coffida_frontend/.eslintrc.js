module.exports = {
  root: true,
  extends: ['@react-native-community',
            "airbnb",
            "plugin:prettier/recommended",
            "prettier/flowtype",
            "prettier/react"
          ],

  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  
  }
};
