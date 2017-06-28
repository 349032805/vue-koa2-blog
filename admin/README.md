# vue-koa2-blog admin篇

这篇文章主要讲的是在写博客后台管理系统中需要解决的一些问题。这些问题可能有点小坑，需要花些时间在上面，至于其他问题，其实真正动手去写就能解决了。<br/>
[front端体验](http://139.199.160.102)<br/>
[admin端体验](http://139.199.160.102:8888)账号密码都是admin,请尽量不要修改或删除文章。<br/>
[vue-koa2-blog server篇](https://github.com/sinner77/vue-koa2-blog)

## Build Setup
``` bash
# install dependencies
npm install
# serve with hot reload at localhost:8080
npm run dev
# build for production with minification
npm run build
# build for production and view the bundle analyzer report
npm run build --report
```

## 展示
![](https://ooo.0o0.ooo/2017/06/27/595229a9de5c3.png)
![](https://ooo.0o0.ooo/2017/06/27/59522a43191b0.png)
![](https://ooo.0o0.ooo/2017/06/27/59522a4757b60.png)

## 后台管理系统的布局方法-内滚动布局
现在的web站点很多有桌面软件的风格，特别是单页面应用，把页面的切换动画做好，使用起来颇有桌面软件的感觉。一般来说，我们经常分为一级路由，二级路由，为了更像native app,建议一级路由以及其同级路由采用fade淡入淡出的方式来进行切换，二级路由以及其同级路由采用左右侧滑的方式来进行切换。好了，说重点。
### 内滚动布局
所谓内滚动布局，其实就是主滚动条在页面内部的布局。我们平常常见的web应用，我们可以看到滚动条是在最外面的，及是相对于传统的html滚动而言的。
大家可以看我的[admin端](http://139.199.160.102:8888),是看不见滚动条的，其实就是内滚动布局+css实现滚动条隐藏这两个知识点的运用。
步骤一: 既然是内滚动布局，就必须要干掉原生html的滚动条
```css
html{
    overflow: hidden;
}
```
步骤二: 如果实现顶部及左侧固定，不跟随滚动，右侧主体内滚动并占满屏幕剩余的部分呢?
```html
# 页面结构
body
    page
    header
    side
    section.content
        div
```
```css
# 绝对定位实现全屏拉伸
.page {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}
```
```css
#头部 header
header{
    height: 60px
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
}
#左侧导航栏
div.navbar{
    width: 100px;
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
}
```
```css
# 主体部分
section.content{
    position: absolute;
    top: 60px;
    left: 100px;
    right: 0;
    bottom: 0;
    overflow-x: hidden;//配置隐藏滚动条
}
```
步骤三: 把很丑的滚动条隐藏起来
隐藏滚动条的原理:已知有两个div,子div出现了滚动条，那么父div只需要比子div的宽度少20px,再加上overflow: hidden，那么滚动条就被隐藏了。
```css
section.content div{
    width: calc(100% + 20px);
}
```
## 封装一个挂载到Vue.prototype的弹窗组件
许多人用过[element-ui](http://element.eleme.io/#/zh-CN/component/installation)这套组件库，当初在写admin端的时候其实考虑过直接上element-ui,然后我就去官网读了常用组件的使用方法，当时看过它使用[信息提示框Message组件](http://element.eleme.io/#/zh-CN/component/message)的时候，通过调用this.$message()，弹窗组件便完成了显示并自动摧毁。因为我之前在练手vue的时候，都是import组件进来的，很麻烦，每个页面都得import一次，所以npm install element-ui下来，然后看它的源码,发现它是利用vue.extend预定义选项创建可复用的组件构造器，再封装一个构造函数暴露出来，每次调用this.$message()其实就是new 构造函数一次，但组件隐藏的时候，需要我们手动this.$destory()一下。
另外一个在博客管理系统常用的组件就是confirm组件，我们删除文章肯定要给用户多一次提示，以免是用户点错的删除。这两个组件是用频率最多，大家可以先把这两个组件先码出来再做其他。
[Message组件和Confirm组件源码(代码都留注释了)](https://github.com/sinner77/vue-koa2-blog/tree/master/admin/src/components/common)

## 用sessionStorage来存储token
只前做过一个[小项目vue-koa2-login](https://github.com/sinner77/vue-koa2-login),只是把登录拿到的token存储在store里面，这样做的坏处就是一旦刷新页面，vuex会重新初始化，相当于退出登录了。在这个项目里，我把token存在sessionStorage并在初始化token时，用sessionStorage来初始化store.state.token,现在刷新页面token也还在不会导致退出登录了。
```javascript
const state = {
    token: sessionStorage.getItem('blog-token');
};
```
## marked.js+highlight.js
markdown编译器选用的是simplemde,常见的功能例如各种快捷键，分屏预览，全屏预览，提示等等都有，可定制性还挺强。我的习惯是每写完一段文字，总是会不自觉的按下ctrl+s，所以我就直接做成按ctrl+s保存文章了。大家也可以做成自动保存文章，用上防抖函数保一直saveArticle函数即可，逻辑也很简单。
说到mared.js,marked只是负责把markdown解析成html,hljs的作用是负责高度解析出来的html里面的<code>部分，即代码端部分。存放在数据库，即文章的内容字段，存的就是markdown解析成的html。到时在front端展示文章内容，借用v-html这个指令插入这段html便能完成文章的显示了。
对了,hljs在官网可以定制它的语言包，可以只注册需要高亮的语言，这样就不至于js文件过大。

## 学习资料

[koa2实现基本token的登录注册](https://github.com/sinner77/vue-koa2-login)   <br/>
[打造 Vue.js 可复用组件](http://www.jianshu.com/p/79a37137e45d)   <br/>
[vue中动态绑定图片的问题](http://www.cnblogs.com/hongmaju/p/6877090.html)   <br/>
[hljs学习](http://blog.csdn.net/spy19881201/article/details/38866033)<br/>
[防抖动函数](http://jinlong.github.io/2016/04/24/Debouncing-and-Throttling-Explained-Through-Examples/)   <br/>
[容易理解的抖动和节流函数](https://segmentfault.com/a/1190000005926579)   <br/>
[如何优雅的选择字体(font-family)](https://segmentfault.com/a/1190000006110417)
