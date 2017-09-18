/**
 * Created by Administrator on 8/25/2017.
 */
var mongoose = require('mongoose');
// 连接数据库
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/blog');
// 设置数据类型
var monSchema = new mongoose.Schema({
    musictitle:{type:String},
    singer:{type:String},
    musiccd:{type:String},
    musicplace:{type:String},
    musictotaltime:{type:String},
    musicpicture:{type:String}
});
var Music = db.model('musics',monSchema);
module.exports=Music;