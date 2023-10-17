module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": '.env'
      }],
      ["module-resolver", {
        "alias": {
          "@Components": "./src/components",
          "@Screens": "./src/screens",
          "@Services": "./src/services",
          "@Store": "./src/store"
        },
        "extensions": [
          ".ts",
          ".tsx"
        ]
      }]
    ]
  };
};
