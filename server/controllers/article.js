const ArticleModel = require('../models/article.js');

class ArticleController{
    //创建文章
    static async createArticle(ctx, next){
        console.log(111);
        ctx.body = 111;
        return next()
    }
    //获取单个文章
    static async getArticleById(ctx){

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