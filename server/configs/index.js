const fs = require('fs');

let config = {
   admin: {
       user: 'admin',
       password: 'admin'
   },
   jwt: {
       secret: 'secret',
       exprisesIn: '2h'
   },
   mongodb: {
       host: '127.0.0.1',
       database: 'blog',
       port: 27017,
       user: '',
       password: ''
   },
   app: {
       port: process.env.PORT || 3000,
       routerBaseApi: '/api'
   }
};

//可以新建一个private.js定义自己的私有配置
if(fs.existsSync(__dirname + '/private.js')){
    config = Object.assign(config, require('./private.js'));
}

module.exports = config;