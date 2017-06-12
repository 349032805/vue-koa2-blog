const Me = require('../models/me.js');

class MeController{
	static async getMeInfo(ctx){
		let result = await Me
			.findOne({})
			.exec()
			.catch(err => {
				ctx.throw(500, '服务器内部错误-个人信息查找错误!');
			});
		if(result === null){ //这里再初始化数据，只会执行一次
			let meObj = new Me({
				content: 'i am sinner77'
			});
			let r = await meObj
					.save()
					.catch(err => {
						ctx.throw(500, '服务器内部错误-个人信息初始化错误!');
					});
			ctx.success({
	            msg: '个人信息初始化成功！',
	            data: r
        	});
		}else{
			ctx.success({
	            msg: '个人信息获取成功！',
	            data: result
        	});
		}
		
	}
	static async modifyMeInfo(ctx){
		const content = ctx.request.body.content;
		if(!content){
			ctx.throw(400, '内容不能为空!');
		}
		let result = await Me
			.findOneAndUpdate({},{
				content
			}, {
				new: true
			})
			.exec()
			.catch(err => {
				ctx.throw(500, '更改个人信息错误!');
			});
		ctx.success({
            msg: '个人信息修改成功！',
            data: result
        });
	}
}

exports = module.exports = MeController;