module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
            @import "./public/assets/_global.scss";
          `
            }
        }
    }
};