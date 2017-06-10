const Article = require('../models/article.js');

class ArticleController{
    //创建文章
    static async createArticle(ctx, next){
        const { title, content, publish, tags, abstract } = ctx.request.body;
        const createTime = new Date();
        const lastEditTime = new Date();
        if(!title){
            ctx.throw(400, '标题不能为空!');
        }
        if(!content){
            ctx.throw(400, '内容不能为空!');
        }
        if(!abstract){
            ctx.throw(400, '摘要不能为空!');
        }
        const article = new Article({
            title,
            content,
            abstract,
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
            ctx.throw(500, '服务器内部错误-数据查找错误!');
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
    static async ifPublishArticle(ctx){
        const id = ctx.params.id;
        const publish = ctx.request.body.publish;
        if(publish !== true && publish !== false){
            ctx.throw(400, 'publish字段不能为除true和false之外的值!');
        }
        let result = await Article
            .findByIdAndUpdate(id, {
                publish
            }, {
                new: true
            })
            .exec()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-updatePublish错误!')
            });
        ctx.success({
            msg: '更新publish成功!',
            data: result
        });
    }
    //删除文章
    static async deleteArticleById(ctx){
        const id = ctx.params.id;
        let result = await Article.findByIdAndRemove(id).exec().catch((err) => {
            ctx.throw(500, '服务器内部错误-findByIdAndRemove错误!')
        });
        ctx.success({
            msg: '删除文章成功!',
            data: result
        });
    }
    //修改文章：不接受publish的修改
    static async modifyArticle(ctx){
        const { title, content, tags, abstract} = ctx.request.body;
        if(!title){
            ctx.throw(400, '标题不能为空!');
        }
        if(!content){
            ctx.throw(400, '内容不能为空!');
        }
        if(!abstract){
            ctx.throw(400, '摘要不能为空!');
        }
        const lastEditTime = new Date();
        const id = ctx.params.id;
        let result = await Article.findByIdAndUpdate(id, {             //{ $set: ctx.request.body }也可以
            title,
            content,
            abstract,
            tags,
            lastEditTime
        }, { new: true })
        .populate('tags')
        .exec()
        .catch((err) => {
            ctx.throw(500, '服务器内部错误-findByIdAndUpdate错误!');
        });
        ctx.success({
            msg: '修改成功!',
            data: result
        });
    }
    //获取所有文章(包含未发布文章，后台使用)
    static async getAllArticles(ctx){
        let tagId = ctx.query.tag;
        let page = +ctx.query.page;
        let limit = +ctx.query.limit || 5;
        if(page <= 0){
            page = 1;
        }
        let result, total;
        if(tagId){  //只传了page参数
            result = await Article
                .find({
                    tags: tagId   //{ tags: {"$in": tagARR }}也行
                })
                .populate('tags')
                .exec()
                .catch(err => {
                    ctx.throw(500, '服务器内部错误-根据标签查询文档错误!');
                });
        }else if(page && limit){  
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
            total = await Article
                .count()
                .exec()
                .catch(err => {
                    ctx.throw(500, '服务器内部错误-总数查询错误!')
                });
        }else{  //当没传递任何参数时，查询所有文章，包括发布和未发布的
            result = await Article
                .find()
                .sort({ 'createTime': -1 })
                .populate('tags')
                .exec()
                .catch(err => {
                    ctx.throw(500, '服务器内部错误-查找所有文章错误!')
                })
        }
        ctx.success({
            msg: '查询文章成功！',
            data: result,
            total
        });
    }
    //获取所以已发布的文章（前台使用）
    static async getAllPublishedArticles(ctx){
        let tagId = ctx.query.tag;
        let page = +ctx.query.page;
        let limit = +ctx.query.limit || 5;
        if(page <= 0){
            page = 1;
        }
        let result, total;
        if(tagId){  //只传了page参数
            result = await Article
                .find({
                    tags: tagId,   //{ tags: {"$in": tagARR }}也行
                    publish: true
                })
                .populate('tags')
                .exec()
                .catch(err => {
                    ctx.throw(500, '服务器内部错误-根据标签查询文档错误!');
                });
        }else if(page && limit){  
            result = await Article
                .find({
                    publish: true
                })
                .sort({ 'createTime': -1 })
                .skip(limit * (page - 1))
                .limit(limit)
                .populate('tags')
                .exec()
                .catch(err => {
                    ctx.throw(500, '服务器内部错误-分页查找错误!');
                });
            total = await Article
                .count()
                .exec()
                .catch(err => {
                    ctx.throw(500, '服务器内部错误-总数查询错误!')
                });
        }else{  //当没传递任何参数时，查询所有文章，包括发布和未发布的
            result = await Article
                .find({
                    publish: true
                })
                .sort({ 'createTime': -1 })
                .populate('tags')
                .exec()
                .catch(err => {
                    ctx.throw(500, '服务器内部错误-查找所有文章错误!')
                })
        }
        ctx.success({
            msg: '查询发布的文章成功！',
            data: result,
            total
        });
    }
}

exports = module.exports = ArticleController;