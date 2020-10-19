'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // require('./router/user')(app);
  // require('./router/admin')(app);
  //解决刷新后404的问题
  app.router.redirect('/', '/index.html', 302);
  app.router.get('/login',app.controller.home.index);
  app.router.get('/main/*',app.controller.home.index);
};
