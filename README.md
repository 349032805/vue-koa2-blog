# vue-koa2-blog server篇

> vue2,koa2和mongo搭建的单用户博客

后续还有**front篇**，**admin篇**还有**部署篇**。为什么写这些文章呢?主要把我在这个项目碰到的一些小坑，难题总结出来，方便日后自己去查阅。（高手还是无视我这么小儿科的东西吧）为了加强练习，该自己写的代码，坚决自己写，能不引用第三方的库和组件绝不引用，这个过程确实能学习到不少东西。

适合人群：想练习vue,vuex,koa2以及想熟悉ES6语法的人。<br/>
[front体验](http://139.199.160.102)<br/>
[admin体验](http://139.199.160.102:8888),账号和密码都是admin,请尽量不要删除或修改文章<br/>
[vue-koa2-blog admin篇](https://github.com/sinner77/vue-koa2-blog/tree/master/admin)


## 展示
![](https://ooo.0o0.ooo/2017/06/21/594a8f7be1a59.png)

![](https://ooo.0o0.ooo/2017/06/21/594a8f7c986f0.png)

![](https://ooo.0o0.ooo/2017/06/21/594a8f79c69af.png)

![](https://ooo.0o0.ooo/2017/06/21/594a8f5e183fe.png)

![](https://ooo.0o0.ooo/2017/06/21/594a8f637a59d.png)


## 目录设计
* app.js -------- 入口文件
* models -------- 数据库模型
* controllers --------- 完成逻辑处理的控制器
* middlewares --------- 自己封装的中间件
* routes --------- 路由
* utils --------- 工具函数
* configs -------- 配置文件
* package.json --------- 项目所需依赖
好的目录设计有利于后期的维护，有规有矩，自己看起来也清爽许多。路由部分必须和控制器分开，这样能做控制器只需关心实现该有的业务逻辑。

## 在koa2中如果优雅的全局捕获错误并打印
```javascript
# 统一错误处理中间件(来自server/middlewares/errorHandle)
// use: 统一错误处理中间件，用来统一捕获其他中间件的错误,在其他中间件使用之前使用 
const tracer = require('tracer'); //使用tracer模块帮助我们自定义打印输出
const fs = require('fs');
const logger = tracer.colorConsole({ //自定义错误输出格式
    level: 'error',
    format: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
	dateformat: "HH:MM:ss.L",
    transport: function(data){  //指定错误输出的文件，存到error.log下
        console.log(data.output);  
        fs.appendFile('./error.log', data.output + '\n', { encoding: 'utf8'}, (err) => {
            if(err){
                throw err;
            };
        });
    }
});
//该中间件关键点：1.位置，2.一上来就先走其他中间件（需理解官网的洋葱图）
module.exports = async (ctx, next) => {
    try{
        await next(); //一上面直接先执行下面的中间件
    }catch(err){
         //.stack为error对象的属性，返回错误或异常的代码跟踪信息
         //打印出来,并将错误继续向上抛出，如果只打印不继续抛出，相当于控制器抛出的错误在这里就停了, 也可以对错误进行一些操作后再输出
        logger.error(err.stack);
        throw(err); 
    }
};
```
[如何优雅的在 koa 中处理错误](https://yq.aliyun.com/articles/8539?spm=5176.100240.searchblog.17.6QGV6Q)

## 用class+async/await写控制器
class+async/await的结合，可以使得我们更好的组织api的逻辑层，语义和结构都会更加清晰。这样做就不用写一个逻辑处理函数都exports一次。直接暴露一个class出去就可以了。async函数作为class的静态方法,所有我们可以直接className.[xxx]来访问这些控制器。

先上代码:
```javascript
# 逻辑层（来自server/controllers/article.js）
const Article = require('../models/article.js');
class ArticleController{
    //创建文章
    static async createArticle(ctx, next){...}
    //发布文章
    static async ifPublishArticle(ctx){...}
    //删除文章
    static async deleteArticleById(ctx){...}
    //修改文章
    static async modifyArticle(ctx){...}
    //获取所有文章
    static async getAllArticles(ctx){...}
    //获取所以已发布的文章
    static async getAllPublishedArticles(ctx){...}
}
exports = module.exports = ArticleController;
```
```javascript
# 接口层(来自server/routes/index.js)
//引入class这个类
const A = require('../controllers/article.js');
router
    .get('/articles/:id', A.getArticleById)                      
    .post('/articles', checkToken, A.createArticle)                         
    .delete('/articles/:id', checkToken, A.deleteArticleById)                 
    .patch('/articles/:id', checkToken, A.modifyArticle)                      
    .get('/allArticles', checkToken, A.getAllArticles)                      
    .get('/articles', A.getAllPublishedArticles)                      
    .patch('/pubArticles/:id', checkToken, A.ifPublishArticle)               
    .post('/tags', checkToken, T.createTag)                                  
    .get('/tags', T.getAllTags)                                    
    .patch('/tags/:id', checkToken, T.modifyTag)                              
    .delete('/tags/:id', checkToken, T.deleteTag)       
```
[如何使用koa2+es6/7打造高质量Restful API](http://sinn.boyagirl.com/detail/58d9072cc1a5bd0001672cdc)详细版本

## 鉴权jsonwebtoken
鉴权其实很简单，登录的时候给予前端token,前端利用axios的拦截器即可使得所有请求都将携带token上来。利用jsonwebtoken这个模块，在封装一个checktoken中间件，就能完成权限的鉴定。
```javascript
# 实例(来自server/routes/index.js)
router
    //修改单个标签
    .patch('/tags/:id', checkToken, T.modifyTag)
    //删除单个标签
    .delete('/tags/:id', checkToken, T.deleteTag)                           
```
看上面的代码，有没有发现，想要修改标签,必须经过checkToken这个中间件，如果checkToken没有向下next(),那么T.modifyTag是没办法执行的。利用这一点，我们利用checkToken对请求进行鉴定，如果没有token或者token过期，那就没办法修改了。
鉴权的代码位置: server/middlewares/checkToken.js
server/utils/index.js


## 封装一个统一相应处理中间件
为什么想写一个统一相应处理的中间件呢？其实这个中间件只是都koa2的ctx.body的再加上一层的封装，直接使用ctx.body和ctx.throw是没问题的。我主要用来它来实现自定义的错误状态码，还有一点好处是能保证输出到前端的数据格式能够单一。
```javascript
// use: 用来给所有请求统一响应--统一响应中间件---要在使用其他中间件之前使用
//在ctx对象上挂载方法，如果在调用的是有些参数没有出入，那么相当这个参数不存在，除非采用默认值的方式
module.exports = async (ctx, next) => {
    //请求成功时
    ctx.success = ({ data, msg, total, success}) => {
        ctx.body = { code: 200, data, msg, total, success };
    };
    await next();
};
```

## 文章的日期格式化处理
moment+mogoose的虚拟属性即可完成自定义的时期格式。
```javascript
# 时期格式化处理
const moment = require('moment');
moment.locale('zh-cn');
//必须先set后get
articleSchema.set('toJSON', { getters: true, virtuals: true });
articleSchema.set('toObject', { getters: true, virtuals: true });
articleSchema.path('createTime').get(function(v) {
  return moment(v).format('YYYY MMMM Do, h:mm:ss a');
});
articleSchema.path('lastEditTime').get(function(v) {
  return moment(v).format('YYYY MMMM Do, h:mm:ss a');
});
```
当我们在控制器里面存日期的时候，直接new Date()存入即可，当我们在取出数据时，mogoose的虚拟属性，先做格式化处理再取出来。
## mongoose的ref
我们知道mongoDB是noSQL数据库，如果我们想也能用其他文档。那么ref+population即可做到。
```javascript
const articleSchema = new Schema({
    .....
    tags: [{ type: Schema.Types.ObjectId, ref: 'tag' }]  //type为tag文档的id
});
```
看,我在定义articleSchema的时候,我把它的tags字段定义成数组，数组存放的时候各个tag的_id。如果我按平时那样去数据,即只能拿到 { title : '标题', ..., tags: ['21312321323', '1231231232313']}类似这样的东西，但如果利用population来取数据
```javascript
result = await Article
                .find({})
                .populate('tags')
                .exec()
```
那么会得到{ title : '标题', ..., tags: ['标签1', '标签2']}，而不是单纯的tagId了。
[mogoose学习进阶](https://cnodejs.org/topic/5206581b44e76d216aae072e)

## 分页查询
当前台在查询文章时，一般不是一次性返回全部文章，而是通过分段来查询文章。
对于数据量不大的博客,我直接用page和limit这两个请求参数来查询文章。如www.xxx.com/api?page=1&&limit=5来请求第一页的数据,每页按5条来分。

```javascript
 let page = +ctx.query.page;
let limit = +ctx.query.limit || 5;
result = await Article
                .find()
                .sort({ 'createTime': -1 })
                .skip(limit * (page - 1))
                .limit(limit)
                .populate('tags')
                .exec()
                .catch(err => {
                    ctx.throw(500, '服务器内部错误-分页查找错误!');
                });
```
想做进一步的优化，请看下面的文章
[mongodb分页优化](https://cnodejs.org/topic/559a0bf493cb46f578f0a601)

## 自定义配置
```javascript
# 可以在configs目录下新建private.js来配置。对象格式要一致。
let config = {
   admin: {
       username: 'admin',           
       password: 'admin'
   },
   jwt: {
       secret: 'secret',            
       exprisesIn: '3600s'          //以秒为单位
   },
   mongodb: {
       host: '127.0.0.1',
       database: 'blog',
       port: 27017,
       user: '',                    //非必填
       password: ''                 //非必填
   },
   app: {
       port: process.env.PORT || 3000,
       routerBaseApi: '/api'
   }
};
```
github地址: https://github.com/sinner77/vue-koa2-blog   
[受启发的项目](http://chuckliu.me/#!/posts)   
[受启发的项目](http://imhjm.com/)






