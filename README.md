# 个人博客设计（未完待续）
------------ 
## 博客前台
### 导航
* 首页
* 归档
* 个人
* 跳转到github的图标
--------------------
## 博客管理平台

### 功能列表

登录：利用jwt认证，登录有效时间为2个小时，可登出
文章：添加文章，文章列表展示（可以对文章进行修改和删除）
标签：添加标签、删除标签、修改标签

## server

### 目录划分

* app.js
* conf
 * config.js
* controllers
* models
 * mongo.js
* middlewares



### 数据库设计
```javascript
//文章表&&草稿表
let post = new Schema({
  title: String,
  visits: {
    type: Number,
    default: 0
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'tag'
  }],
  createTime: {
    type: Date
  },
  lastEditTime: {
    type: Date,
    default: Date.now
  },
  hidden: Boolean,
  excerpt: String,
  content: String
})
//分类表
let category = new Schema({
  name: String,
  pathName: String
})
//标签表
let tag = new Schema({
  name: String,
  pathName: String
})
//用户表
let user = new Schema({
  name: String,
  displayName: String,
  password: String,
  email: String
})
```
### api设计

服务器直接允许对user模型外的所有模型的GET请求
user表的所有请求, 以及其他表的非 GET 请求, 都必须将 header 中的authorization设置为服务器下发的 Token, 服务器验证通过后才会继续执行 CRUD 操作
#### get请求：
##### 查询所有文章：
xxx
##### 查询所有标签：
xxx
##### 查询_id=xxx的文章：
xxx
##### 查询tag=xxx的文章：
xxx
##### 查询所有文章并按更新时间倒序：
xxx
##### 查询第二页（每页五条）并按时间倒序：
xxx


#### post请求(获取和清除token)
##### 登录：body为{ username: 'sinner77', password: '123456'}
> POST /admin/login

##### 登出：body为{ xxx }
> POST /admin/logout 


#### RESTful api(需要携带token)
##### 新建：body中数据为新建该文档的数据
> POST /api/:modelName

##### 替换：body中数据为替换_id=xxx的文档的数据
> PUT /api/:modelName/:id

##### 更新：body中数据为更新_id=xxx的文档的数据
> PATCH /api/:modelName/:id

##### 删除：body为{ id: _id }
> DELETE /api/:modelName/:id




### store设计

### config.js配置
```javascript
const env = process.env
module.exports = {
  serverPort: env.serverPort || 3000,
  mongoHost: env.mongoHost || '127.0.0.1',
  mongoDatabase: env.mongoDatabase || 'blog',
  mongoPort: env.mongoPort || 27017,
  tokenSecret: env.tokenSecret || 'test',
  tokenExpiresIn: env.tokenExpiresIn || 3600,
  defaultAdminName: env.defaultAdminName || 'admin',
  defaultAdminPassword: env.defaultAdminPassword || 'admin'
}
```















