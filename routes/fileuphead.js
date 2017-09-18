/**
 * Created by Administrator on 8/21/2017.
 */
var multer = require('multer');
var cache = require('memory-cache');
//var md5 = require('md5');
var config = require('../config/confighead');
var storage = multer.diskStorage({
    //设置上传文件路径,以后可以扩展成上传至七牛,文件服务器等等
    //Note:如果你传递的是一个函数，你负责创建文件夹，如果你传递的是一个字符串，multer会自动创建
    destination: config.upload.path,
    //TODO:文件区分目录存放
    //获取文件MD5，重命名，添加后缀,文件重复会直接覆盖
    filename: function (req, file, cb) {
        var fileFormat =(file.originalname).split(".");
        var date=new Date();
        var filename=file.fieldname+"."+date.getTime()+"."+fileFormat[fileFormat.length - 1];
        cb(null, filename);
        //cache.put("filehead",filename);
    }
});

//添加配置文件到muler对象。
var upload = multer({
    storage: storage,
    //其他设置请参考multer的limits
    //limits:{}
});
//导出对象
module.exports = upload;