const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// title: String == title: { type: String }
const articleSchema = new Schema({
    title: String,
    content: String,
    publish: {
        type: Boolean,
        default: false
    },
    createTime: Date,
    lastEditTime: {
        type: Date,
        default: Date.now
    },
    tags: [{ type: Schema.Types.ObjectId, ref: 'tag' }]  //type为tag文档的id
});
//module.exports 指向新的对象时，exports 断开了与 module.exports 的引用
//，那么通过 exports = module.exports 让 exports 重新指向 module.exports 即可。
exports = module.exports = mongoose.model('article', articleSchema);