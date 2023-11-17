const path = require("path");

module.exports = {
    webpack: {
        resolve: {
            alias: {
                "pages": path.resolve(__dirname, "src/pages"),
                "components": path.resolve(__dirname, "src/components"),
            },
            fallback: {
                "process": require.resolve("process/browser"),
            },
        },
    },
};
