import marked from 'marked';

//引入highlight.js ,有个hljs变量
import './highlight.pack.js';
//返回包中我在官网选择的部分语言
const languages = hljs.listLanguages()
//配置
hljs.configure({
  tabReplace: '    ', // 4 spaces，把tab替换成4个空格
});

marked.setOptions({
  renderer: new marked.Renderer(), //自定义的方式渲染内容 通过该对象来配置
  gfm: true, //允许github标准的markdown
  pedantic: false, //尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
  sanitize: false, //对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  tables: true, //允许支持表格语法
  breaks: true, //允许回车换行
  smartLists: true, //使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
  smartypants: true, //使用更为时髦的标点，比如在引用语法中加入破折号。
  highlight: function(code, lang) {
    if(!lang){
      return hljs.highlightAuto(code).value;
    }
    if(languages.indexOf(lang) === -1){ //改语言没注册,也可以自动高量它
      return hljs.highlightAuto(code).value;
    }
    return hljs.highlight(lang, code).value; 
  }
});

//hljs学习文档：http://blog.csdn.net/spy19881201/article/details/38866033
//整个流程是：我们在md输入的是字符串，marked.js帮我们把字符串解析为普通的html,这些html中代码部分的显示我们借助highlight.js来实现高亮。pre需要自己定义样式

//highlight函数，它可以让你文本的代码块实现语法高亮
// 完整的highlight方法包含三个参数：code，lang和callback
// code——代码内容——是一个字符串。
// lang——编程语言的种类——也是字符串。
// callback就是回调函数。

export default marked;