const config = require('../configs');
const User = require('../models/user');
const md5 = require('md5');

//初始化管理员账号中间件
module.exports = async (ctx, next) => {
    const username = config.admin.username;
    const password = md5(config.admin.password);
    let result = await User
        .find()
        .exec()
        .catch(err => {
            ctx.throw(500, '服务器内部错误-查找admin错误！');
        });
    if(result.length === 0){
        let user = new User({
            username,
            password
        });
        await user
            .save()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-存储admin错误！');
            });
        console.log('初始化admin账号密码完成!');
    }
    await next();
}; 