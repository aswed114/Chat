/**
 * Created by Administrator on 8/1/2017.
 */
var mongoose = require('mongoose');
var cache = require('memory-cache');
// 连接数据库
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/blog');
var monSchema = new mongoose.Schema({
    title:{type:String},
    username:{type:String},
    time:{type:String},
    post:{type:String},
    picture:{type:String}
});
var Post = db.model('posts',monSchema);
var PostDAO=function () {};
PostDAO.prototype.findPagination=function(obj,callback){
    var q=obj.search||{}
    var col=obj.columns;
    var pageNumber=obj.page.num||1;
    var resultsPerPage=obj.page.limit||2;
    var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;
    var query = Post.find(q,col).sort('-create_date').skip(skipFrom).limit(resultsPerPage);
    query.exec(function(error, results) {
        if (error) {
            callback(error, null, null);
        } else {
            Post.count(q, function(error, count) {
                if (error) {
                    callback(error, null, null);
                } else {
                    var pageCount = Math.ceil(count / resultsPerPage);
                    callback(null, pageCount, results);
                }
            });
        }
    });
}
module.exports=Post;