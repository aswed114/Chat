/**
 * Created by Administrator on 7/31/2017.
 */
var cache = require('memory-cache');
var Post=require('../models/Post');
var User=require('../models/User');
var multer=require('multer');
var upload = require('../routes/fileupblog');
var date=new Date(),
    minute=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+(date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes());
module.exports=function(app){
    app.get('/test',function (req,res) {
        res.render('test');
    });
    app.get('/client',function (req,res) {
       res.render('client');
    });
    app.get('/allfunction',function(req,res){
        if(cache.get('username')==null){
            res.redirect('/');
        }
        else{
            res.render('allfunction');
        }
    });
    app.get('/webblog',function (req,res) {
        res.render('webblog');
    });
    app.get('/webmusic',function (req,res) {
        res.render('webmusic');
    });
    app.get('/webfriend',function (req,res) {
        res.render('webfriend');
    });
    app.get('/personmessage',function (req,res) {
        res.render('personmessage');
    });
    app.get('/changemessage',function (req,res) {
        res.render('changemessage');
    });
    app.get('/seepersonblogview',function (req,res) {
        res.render('seepersonblogview');
    });
    app.get('/alterpersonblogview',function (req,res) {
        res.render('alterpersonblogview');
    });
    app.get('/changepassword',function (req,res) {
        res.render('changepassword');
    });
    app.post('/blogname',function (req,res) {
        var username=cache.get('username');
        var content={
            username:username
        };
        User.findOne(content,function (err,tasks) {
            if(tasks!=null){
                var nickname=tasks.nickname;
                result={
                    'nickname':nickname
                };
                res.json(result);
            }
        })
    });
    app.post('/uploadblog', upload.single('blog'), function (req, res, next) {
        if (req.file) {
            var picture=req.file.filename;
            cache.put('picture',picture);
        }
    });
    app.post('/blogsubmit',function(req,res){
        var title=req.body.title,
            post=req.body.post,
            username=cache.get('username'),
            picture=cache.get('picture'),
            result={
                "result":"success"
            },
            time={
            date:date,
            year:date.getFullYear(),
            month:date.getFullYear()+"-"+(date.getMonth()+1),
            day:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
            minute:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"-"+date.getHours()+":"+(date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())
        };
        console.log(picture);
        var contentsave={title:title,
                  username:username,
                  time:minute,
                  post:post,
                  picture:picture
        };
        new Post(contentsave).save();
        res.json(result);
    });
    
    
}