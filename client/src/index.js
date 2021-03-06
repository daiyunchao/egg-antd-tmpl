import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'mobx-react';
import { ConfigProvider } from 'antd';
import { HashRouter } from 'react-router-dom';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import GlobalModel from './GlobalModel';
import App from './App';


ReactDom.render(
    // 使用 Provider 将 globalModel 传递给包裹住的所有组件及子组件
    <Provider globalModel={GlobalModel}>
        <ConfigProvider locale={zh_CN}>
            <App />
        </ConfigProvider>
    </Provider>,
    document.querySelector('#root')
);