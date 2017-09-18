/**
 * Created by Administrator on 7/21/2017.
 */
var mongoose = require('mongoose');
// 连接数据库
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/blog');
// 设置数据类型
var monSchema = new mongoose.Schema({
    myhead:{type:String},
    username:{type:String},
    pwd:{type:String},
    nickname:{type:String},
    sex:{type:String},
    birth:{type:String},
    address:{type:String},
    safety:{type:String}
});
var User = db.model('users',monSchema);
module.exports=User;
