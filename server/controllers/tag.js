const Tag = require('../models/tag.js');

class tagController{
    //添加标签: 这里需要注意如果标签已经存在那么不再创建
    static async createTag(ctx){
        const name = ctx.request.body.name;
        if(!name){
            ctx.throw(400, '标签类型不能为空');
        }
        let isOldTag = await Tag
                .findOne({ name })
                .exec()
                .catch( err => {
                    ctx.throw(500, '服务器内部错误-fingOneTag错误!');
                });
        if(isOldTag !== null){
            return ctx.success({
                msg: '这是已经存在的标签！',
                data: isOldTag
            });
        }
        let tag = new Tag({
            name
        });
        // console.log(tag.save() instanceof Promise); 返回true。save的时候直接返回promise,查询的时候通过exec()来返回promise
        let result = await tag
            .save()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-createTag错误!');
            });
        ctx.success({
            msg: '添加标签成功！',
            data: result
        });
    }
    //获得所有标签
    static async getAllTags(ctx){
        let result = await Tag.find();
        ctx.success({
            msg: '获得所有标签成功!',
            data: result
        });
    }
    //修改标签
    static async modifyTag(ctx){
        let id = ctx.params.id;
        let name = ctx.request.body.name;
        if(!name){
            ctx.throw(400, '标签类型不能为空');
        }
        let result = await Tag
            .findByIdAndUpdate(id, {
                name
            }, {
                new: true       //返回新的已修改的信息
            })
            .exec()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-modifyTag错误!');
            });
        ctx.success({
            msg: '修改标签成功!',
            data: result
        });
    }
    //删除标签
    static async deleteTag(ctx){
        const id = ctx.params.id;
        let result = await Tag
            .findByIdAndRemove(id)
            .exec()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-delete错误!');
            });
        ctx.success({
            msg: '删除标签成功!',
            data: result
        });
    }
}

exports = module.exports = tagController;