// const AdminSchema = require("./app/models/adminSchema");
class Root {
    constructor(app) {
        this.app = app;

    }

    configWillLoad() {
        console.log("in configWillLoad");

    }
    serverDidReady() {
        // console.log("didLoad==>", this.app);
        //当服务器启动后,添加mongoose的这些Model到app中方便调用
        // this.app.adminModel = adminSchema.getModal();
        // this.app.serverStatusModel = serverStatusSchema.getModal();

    }
}

module.exports = Root;
