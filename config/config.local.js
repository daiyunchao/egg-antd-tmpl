/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1602734063246_5112';

    // add your middleware config here
    config.middleware = [];

    //配置白名单,伴随着前端开发的dev服务器
    config.security = {
        domainWhiteList: [ 'http://localhost:8000' ], 
        csrf: {
            enable:false
        }
    };
    config.static={
        prefix:""
    }

    //jwt的秘钥
    config.jwt = {
        secret: '123456',
    };

    //mongodb的配置
    config.mongoose = {
        url: 'mongodb://127.0.0.1/abc',
        options: {},
        // mongoose global plugins, expected a function or an array of function and options
        //plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
      };

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    return {
        ...config,
        ...userConfig,
    };
};
