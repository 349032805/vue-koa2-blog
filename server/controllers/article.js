const Article = require('../models/article.js');

class ArticleController{
    //创建文章
    static async createArticle(ctx, next){
        const { title, content, publish, tags } = ctx.request.body;
        const createTime = new Date();
        const lastEditTime = new Date();
        if(title === ''){
            ctx.throw(400, '标题不能为空!');
        }
        if(content === ''){
            ctx.throw(400, '内容不能为空!');
        }
        const article = new Article({
            title,
            content,
            publish,
            createTime,
            lastEditTime,
            tags
        });
        //article.save()返回promise
        let result = await article.save().catch((err) => {
            ctx.throw(500, '服务器内部错误-数据存储错误！');
        });
        //http://mongoosejs.com/docs/api.html#document_Document-execPopulate
        //populate传入的为字段名，只需要保证schema声明的时候ref指向的model是正确的就行
        //populate('tags')表示把tags字段里面的id替换成真正的对象，可直接加回调，也可以通过execPopulate()返回promise
        await result.populate('tags').execPopulate().catch((err) => {
            ctx.throw(500, '服务器内部错误-数据populate错误！');
        });
        //文章发布成功，顺便也把存储结果返回
        ctx.success({
            msg: '文章创建成功！',
            data: result
        });
    }
    //获取单个文章
    static async getArticleById(ctx){
        const id = ctx.params.id;
        let result = await Article.findById(id).catch((err) => {
            ctx.throw(503, '服务器内部错误-数据查找错误!1111');
        });
        await result.populate('tags').execPopulate().catch((err) => {
            ctx.throw(500, '服务器内部错误-数据polulate错误!');
        });
        ctx.success({
            msg: '查询成功!',
            data: result
        });
    }
    //发布文章
    static async publishArticle(ctx){

    }
    //删除文章
    static async deleteArticleById(ctx){

    }
    //修改文章
    static async modifyArticle(ctx){

    }
    //获取所有文章
    static async getAllArticles(ctx){

    }
    //获取所以已发布的文章
    static async getAllPublishedArticles(ctx){

    }
}

exports = module.exports = ArticleController;