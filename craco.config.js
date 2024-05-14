const path = require("path");

module.exports = {
    webpack: {
        resolve: {
            alias: {
                "app": path.resolve(__dirname, "src/app"),
                "assets": path.resolve(__dirname, "src/assets"),
                "components": path.resolve(__dirname, "src/components"),
                "services": path.resolve(__dirname, "src/services"),
                "types": path.resolve(__dirname, "src/types"),
                "pages": path.resolve(__dirname, "src/pages"),
                "utils": path.resolve(__dirname, "src/utils"),
            },
            fallback: {
                "process": require.resolve("process/browser"),
            },
        },
    },
};
