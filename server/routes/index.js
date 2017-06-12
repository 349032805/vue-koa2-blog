const config = require('../configs'),
      Router = require('koa-router'),
      router = new Router({
          prefix: config.app.routerBaseApi
      }),
      A = require('../controllers/article.js'),
      T = require('../controllers/tag.js'),
      U = require('../controllers/user.js'),
      M = require('../controllers/me.js'),
      checkToken = require('../middlewares/checkToken.js');


/* HTTP动词
    GET     //查询
    POST    //新建
    PUT     //替换
    PATCH   //更新部分属性
    DELETE  //删除指定ID的文档
*/

router
    .get('/articles/:id', A.getArticleById)                      //获取单个文章
    .post('/articles', checkToken, A.createArticle)                         //创建文章
    .delete('/articles/:id', checkToken, A.deleteArticleById)                   //删除文章
    .patch('/articles/:id', checkToken, A.modifyArticle)                      //修改文章
    .get('/allArticles', checkToken, A.getAllArticles)                      //获取所有文章
    .get('/articles', A.getAllPublishedArticles)                      //获取所以已发布的文章（前台使用）
    .patch('/pubArticles/:id', checkToken, A.ifPublishArticle)                //发布或不发布文章

    .post('/tags', checkToken, T.createTag)                                  //创建标签
    .get('/tags', T.getAllTags)                                    //获取所有标签
    .patch('/tags/:id', checkToken, T.modifyTag)                                //修改单个标签
    .delete('/tags/:id', checkToken, T.deleteTag)                               //删除单个标签

    .post('/login', U.login)                                        //用户登录
    //.post('/logout', checkToken, U.logout)                          用户登出（前台删除token即可）
    // .post('/modifyUser', checkToken, U.updateUserMes)                           //更改用户信息
    // .post('/modifyPwd', checkToken, U.resetPwd)                                //更改用户密码

    .get('/me', M.getMeInfo)                       //获取个人信息
    .patch('/me', checkToken, M.modifyMeInfo);                   //更改个人信息
    
exports = module.exports = router;


