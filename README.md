# egg-antd-tmpl

这是一套 egg+react+antd+mongoose+jwt的模板

## 如何使用

`git clone git@github.com:daiyunchao/egg-antd-tmpl.git` 下载下来源代码

`npm i ` 安装modules

`node server.js --env local --port 7005` 启动服务器

`cd client & npm i` 安装前端modules

`npm run start`启动前端dev


## egg更多配置:
> 后端使用 `egg`,代码基本结构是通过`npm init egg --type=simple`而来

1. 设置mongoose的链接:
```js
    //mongodb的配置
    //config/config.local.js
    config.mongoose = {
        url: 'mongodb://127.0.0.1/abc',
        options: {},
      };
```

2. jwt的使用:
```js
//config/config.local.js
//添加配置:
config.jwt = {
        secret: '123456',
    };

//使用jwt: 在路由中添加jwt
app.router.post('/admin/add_admin', app.jwt, app.controller.user.addAdmin);

//生成jwt的token
//在需要的地方,如登录后
const token = app.jwt.sign({
                userId: adminInfo._id,
            },
                app.config.jwt.secret,
                { expiresIn: 60 }
);

```

3. 添加mongoose的Schema,在目录:`//app/models/`中添加对应的`Schema`文件,例如项目中的`adminSchema`文件,然后再`app.js`文件中的`serverDidReady`方法添加如下代码:
```js
 this.app.adminModel = adminSchema.getModal();
 this.app.serverStatusModel = serverStatusSchema.getModal();
```
这样就能直接使用`app`去调用`mongoose`的方法了,如何使用:
```js
//查询:
app.adminModel.findOne()
app.adminModel.find({})
//增加:
 let entity = new app.adminModel({ "loginName": loginName, "password": password, "loginNickName": loginNickName, "adminType": 2 });
        let res = await entity.save();

//删除:
await app.adminModel.remove({ _id: adminId });

//修改:
await app.adminModel.updateOne(
            {
                _id: adminId
            },
            {
                "loginName": loginName,
                "password": password,
                "loginNickName": loginNickName
            }

```

4.设置多级路由:
在`app/router`文件夹中定义路由文件,如:
```js
//admin.js
module.exports = app => {
  app.router.post('/admin/login', app.controller.user.login);
};

//user.js
module.exports = app => {
  app.router.post('/user/login', app.controller.user.login);
};

//在router.js中修改
module.exports = app => {
  // 引用多级路由的文件
  // require('./router/user')(app);
  // require('./router/admin')(app);
};

```

5. 路由中的重定向设置方法:
`app.router.redirect('/', '/index.html', 302);`

6. 解决`react`刷新404的问题:
```js
//router.js中添加
  //解决刷新后404的问题
  app.router.redirect('/', '/index.html', 302);
  app.router.get('/login',app.controller.home.index);
  app.router.get('/main/*',app.controller.home.index);
```


## 前端更多配置:
> 前端使用 `react+ antd + mobx` 实现的,具体代码在`client`文件夹中
前端项目的初始化来自: https://github.com/beichensky/react-mobx-starter
下面对目录结构做一个简单的说明:

`client/config` 配置文件夹

`client/config/devServer.js` 开发前端时会启动一个dev服务器,这里是对这个服务器的配置

`client/config/paths.js` 各种路径的配置,只要被`webpack`打包的时候使用到

`client/config/proxy.js` 代理,单独开发前端模拟数据时使用到

`client/public` 用于存放前端公共资源,一般存放静态资源,打包后会将该文件夹`copy`到目标文件夹中

`client/src` 项目源代码

`client/src/components` 自定义组件

`client/src/components/Layout.js` 后台管理的布局文件

`client/src/components/Footer.js` 统一页脚

`client/src/pages` 页面

`client/src/pages/login` 登录页

`client/src/App.js` 一级导航

`client/src/fetchCommon.js` 通用网络请求帮助

`client/src/GlobalModel.js` 全局状态

`client/src/index.js` 入口页面

`client/webpack` webpack配置文件夹,打包代码使用

`client/webpack/webpack.common.js` 通用配置

`client/webpack/webpack.webpack.config.dev.js` dev时候的配置

`client/webpack/webpack.webpack.config.prod.js` 生成最终代码时使用的打包配置

`babel.config.js` 打包时会使用`babel` 该配置是`babel`使用到的一些插件





1. 菜单配置:
目前还是静态的方式: 需要在`client/src/component/Layout.js`中进行配置,要注意三个地方
显示的item
```js
<Menu.Item key="add-server">
    <Icon type="edit" />
    <span className="nav-text">添加服务器状态</span>
</Menu.Item>
```
点击跳转的路由地址配置
```js
case "add-server":
GlobalModel.goPage('/main/addserver');
title = "添加服务器状态";
desc = "只有添加了服务器的状态才能修改,客户端也才能获取";
break;
```
导航的路由配置
```js
<Route exact path={"/main/addserver"} component={addServer} />
```


2. 跳转页面
调用`GlobalModel.js`文件中的`gopage`函数

3. 判断token,如果没有token就跳转到登录页面:
```js
let token = sessionStorage.getItem('token');
        if (!token) {
            GlobalModel.goPage('/login');
        } else {
            let loginName = sessionStorage.getItem('loginName');
            let loginNickName = sessionStorage.getItem('loginNickName');
            let adminType = sessionStorage.getItem('adminType');
            GlobalModel.token = token;
            GlobalModel.adminInfo.loginName = loginName;
            GlobalModel.adminInfo.loginNickName = loginNickName;
            GlobalModel.adminInfo.adminType = adminType;
            console.log("GlobalModel.adminInfo.adminType===>", sessionStorage, GlobalModel.adminInfo.adminType);
        }
```

4. 打包代码:
在`client`目录下执行`npm run build` 即可,打包后的文件会放到`app/public/`文件夹下
