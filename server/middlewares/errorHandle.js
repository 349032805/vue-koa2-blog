// use: 统一错误处理中间件，用来统一捕获其他中间件的错误,在其他中间件使用之前使用 
const tracer = require('tracer');
const fs = require('fs');
//自定义错误输出格式
const logger = tracer.colorConsole({
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
module.exports = async (ctx, next) => {
    try{
        await next(); //一上面直接先执行下面的中间件
    }catch(err){
        if(!err){
            return ctx.error({ msg: new Error('未知错误!') });
        }
        if(typeof(err) == 'string'){
            return ctx.error({ msg: new Error(err) });
        }
        //.stack为error对象的属性，返回错误或异常的代码跟踪信息
        logger.error(err.stack);
        ctx.error({ msg: '服务器错误!', error: err, status: ctx.status });
    }
};