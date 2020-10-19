import React from 'react'
import { observer } from "mobx-react";
import Login from 'ant-design-pro/lib/Login';
import { Alert, Checkbox, Result } from 'antd';
import './index.css'
import Footer from '../../components/Footer'
import FetchCommon from '../../fetchCommon'
import GM from '../../GlobalModel';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;
// @observer
class LoginDemo extends React.Component {
    state = {
        notice: '',
        type: 'tab1',
        autoLogin: true,
    };
    onSubmit = (err, values) => {
        if (err) {
            return;
        }
        console.log('value collected ->', {
            ...values,
            autoLogin: this.state.autoLogin,
        });
        if (this.state.type === 'tab1') {
            this.setState(
                {
                    notice: '',
                },
                async () => {
                    let loginResult = await FetchCommon.post('/admin/login', { loginName: values.username, password: values.password });
                    if (loginResult && loginResult.code == 200) {
                        //登录成功了,跳转页面
                        GM.setAdminInfo(loginResult.data,loginResult.token);
                        GM.goPage('/main/servertables');
                    } else {
                        //登录失败
                        this.setState({
                            notice: loginResult.message ? "登录失败," + loginResult.message : "登录失败",
                        });
                    }
                }
            );
        }
    };
    onTabChange = key => {
        this.setState({
            type: key,
        });
    };
    changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked,
        });
    };
    render() {
        return (
            <div id="scaffold-src-components-Login-demo-basic" style={{ paddingTop: "200px" }}>

                <div className="login-warp">
                    <Login
                        defaultActiveKey={this.state.type}
                        onTabChange={this.onTabChange}
                        onSubmit={this.onSubmit}
                    >
                        <Tab key="tab1" tab="登录">
                            {this.state.notice && (
                                <Alert
                                    style={{ marginBottom: 24 }}
                                    message={this.state.notice}
                                    type="error"
                                    showIcon
                                    closable
                                />
                            )}
                            <UserName name="username" placeholder="登录名" />
                            <Password name="password" placeholder="登录密码" />
                        </Tab>

                        <Submit>登录</Submit>

                    </Login>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default LoginDemo;
