/*
 * @file: GlobalModel
 * @author: beichensky
 * @description: 用来存放全局数据的 Model
 */

import { observable, action, toJS } from 'mobx';

class GlobalModel {
    constructor() {
        if (window.location.href.indexOf("8000") > -1) {
            this.env = "local";
            this.requestHost = "http://localhost:7005";
            this.routerPref = "";
        } else {
            this.env = "pro";
            this.routerPref = "/gate-server";
            this.requestHost = "https://slots-simulate-gate.me2zengame.com/gate-server";
        }
    }

    @observable adminInfo = {
        adminType: 0,
        loginName: "",
        loginNickName: "",
        password: ""
    }
    @observable adminList = [];
    @observable serverStatusList = [];
    @observable token = "";
    @observable username = '小明';
    @observable pageTitle = "服务器状态列表";
    @observable pageDetail = "点击编辑可以修改当前服务器运行状态,如果设置为`维护`则表明服务器需要暂停";
    /**
     * 修改 username 的方法
     */
    @action
    changeUserName = (name) => {
        this.username = name;
    }
    setHistory(history) {
        this.history = history
    }
    goPage(pageName, params) {
        pageName = this.routerPref + pageName;
        this.history.push(pageName, params)
    }

    setTitleAndDesc(title, desc) {
        this.pageTitle = title;
        this.pageDetail = desc;
    }

    setAdminInfo(adminInfo, token) {
        let { loginName, loginNickName, password, adminType } = adminInfo;
        this.adminInfo.loginName = loginName;
        this.adminInfo.loginNickName = loginNickName;
        this.adminInfo.password = password;
        this.adminInfo.adminType = adminType;
        this.token = token;
        sessionStorage.setItem("loginName", loginName);
        sessionStorage.setItem("loginNickName", loginNickName);
        sessionStorage.setItem("adminType", adminType);
        sessionStorage.setItem('token', token);
    }

}
export default new GlobalModel();
