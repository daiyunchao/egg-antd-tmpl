import { Layout, Menu, Breadcrumb, Icon, Avatar, Dropdown, PageHeader } from 'antd';
import {
    HashRouter as Router, Route, Switch, Link, withRouter,
} from 'react-router-dom';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import React from 'react';
import { observer } from 'mobx-react';
import GlobalModel from '../GlobalModel'


import Home from '../pages/home/index'
@observer
class MLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectKey: "add-server"
        }
        let token = sessionStorage.getItem('token');
        if (!token) {
            //GlobalModel.goPage('/login');
        } else {
            // let loginName = sessionStorage.getItem('loginName');
            // let loginNickName = sessionStorage.getItem('loginNickName');
            // let adminType = sessionStorage.getItem('adminType');
            // GlobalModel.token = token;
            // GlobalModel.adminInfo.loginName = loginName;
            // GlobalModel.adminInfo.loginNickName = loginNickName;
            // GlobalModel.adminInfo.adminType = adminType;
            // console.log("GlobalModel.adminInfo.adminType===>", sessionStorage, GlobalModel.adminInfo.adminType);
        }
    }

    handleClick(e) {
        this.setState({
            selectKey: e.key
        });
        let title = "";
        let desc = "";
        switch (e.key) {
            case "add-server":
                GlobalModel.goPage('/main/home');
                title = "欢迎";
                desc = "欢迎您的到来";
                break;
            default:
                break;
        }
        GlobalModel.setTitleAndDesc(title, desc);


    }
    render() {
        console.log("123");

        const menu = (
            <Menu>
                <Menu.Item>
                    <a rel="noopener noreferrer" onClick={() => {
                        sessionStorage.removeItem('loginName');
                        sessionStorage.removeItem('loginNickName');
                        sessionStorage.removeItem('adminType');
                        sessionStorage.removeItem('token');
                        GlobalModel.goPage('/login');
                    }} >
                        登出
                </a>
                </Menu.Item>

            </Menu>
        );


        return (
            <Layout style={{ height: "100%" }}>
                <Header className="header">
                    <span style={{ color: "white", fontSize: "24px" }}>Egg-React-Antd-Tmpl</span>
                    <div style={{ width: "120px", float: "right", cursor: "pointer" }}>
                        <Dropdown overlay={menu} placement="bottomCenter">
                            <Avatar style={{ backgroundColor: "white", color: "#929279", verticalAlign: 'middle' }} size="large">
                                {GlobalModel.adminInfo.loginNickName}
                            </Avatar>
                        </Dropdown>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            onClick={this.handleClick.bind(this)}
                            mode="inline"
                            selectedKeys={this.state.selectKey}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >

                            <Menu.Item key="add-server">
                                <Icon type="edit" />
                                <span className="nav-text">欢迎</span>
                            </Menu.Item>
                           

                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <PageHeader
                            title={GlobalModel.pageTitle}
                            subTitle={GlobalModel.pageDetail}
                        />
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 24,
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                <Route exact path={"/main/home"} component={Home} />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default MLayout;