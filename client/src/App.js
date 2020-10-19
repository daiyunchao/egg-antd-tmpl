import React from 'react';
import { Router, Redirect } from 'react-router'
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import 'ant-design-pro/dist/ant-design-pro.css'
import 'antd/dist/antd.css';
import { createBrowserHistory } from "history"
import styles from './App.less';
import GlobalModal from './GlobalModel'
const history = createBrowserHistory();
GlobalModal.setHistory(history);
// Loading 提示
const loadingComponent = () => <span>Loading</span>;


// Home 组件
const Login = Loadable({
    loader: () => import('pages/login'),
    loading: loadingComponent
});

// Layout 组件
const Layout = Loadable({
    loader: () => import('components/Layout'),
    loading: loadingComponent
});


export default () => {
    console.log("in app.js");
    
    return (
        <div className={styles.app} style={{ height: window.screen.height - 120 + "px" }}>
            <Router history={history}>
                <Switch>
                    <Route  path={"/index.html"} component={Login} />
                    <Route exact path={"/login"} component={Login} />
                    <Route path={"/main"} component={Layout} />
                </Switch>
            </Router>
        </div>
    );
};
