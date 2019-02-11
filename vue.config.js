module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/graphql": {
        target: "http://localhost:3000",
        secure: false
      }
    }
  }
};
