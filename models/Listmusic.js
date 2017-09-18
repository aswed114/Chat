/**
 * Created by Administrator on 9/2/2017.
 */
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/blog');
var monSchema = new mongoose.Schema({
    username:{type:String},
    musictitle:{type:String},
    singer:{type:String},
    musiccd:{type:String},
    musicplace:{type:String},
    musictotaltime:{type:String},
    musicpicture:{type:String}
});
var Listmuscis = db.model('listmusics',monSchema);
module.exports=Listmuscis;