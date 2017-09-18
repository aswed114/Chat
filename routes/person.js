/**
 * Created by Administrator on 8/15/2017.
 */
var cache = require('memory-cache');
var Post=require('../models/Post');
var multer=require('multer');
var upload = require('../routes/fileupblog');
var uploadhead = require('../routes/fileuphead');
var User=require('../models/User');
var fs=require('fs');
var date=new Date(),
    minute=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+(date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes());
module.exports=function(app){
    app.post('/personblog',function (req,res) {
        var username=cache.get('username');
        var selectpage=req.body.selectpage;
        var content={
            username:username
        };
        var result={
            "username":[]
        };
        Post.find(content,function (err,tasks) {
            var currmessage=selectpage*2-1;
            if(currmessage>tasks.length){
                console.log(err);
            }
            else{
                if(tasks.length%2==0){
                    for(var i=currmessage-1;i<=currmessage;i++){
                        var arr={title:tasks[i].title,time:tasks[i].time};
                        result.username.push(arr);
                    };
                    res.json(result);
                }
                else{
                    if(currmessage+1<tasks.length){
                        for(var i=currmessage-1;i<=currmessage;i++){
                            var arr={title:tasks[i].title,time:tasks[i].time};
                            result.username.push(arr);
                        };
                        res.json(result);
                    }
                    else{
                        var arr={title:tasks[tasks.length-1].title,time:tasks[tasks.length-1].time};
                        result.username.push(arr);
                        res.json(result);
                    }
                }

            }
        });
    });
    app.post('/personbloghead',function (req,res) {
        var username=cache.get('username');
        var content={
            username:username
        };
        User.findOne(content,function (err,tasks) {
            var myhead=tasks.myhead;
            var oldmyhead="/images/touxiang.jpg";
            if(myhead!=null){
                var result={"myhead":myhead};
            }
            else{
                var result={"myhead":oldmyhead};
            }
            res.json(result);
        })
    })
    app.post('/personblogpage',function (req,res) {
        var username=cache.get('username');
        var content={
            username:username
        };
        Post.find(content,function (err,tasks) {
            var personblognum=tasks.length;
            var personblogpage;
            if(personblognum%2==0){
                personblogpage=personblognum/2;
            }
            else {
                personblogpage=(personblognum+1)/2;
            }
            result={
                "personblogpage":personblogpage,
            }
            res.json(result);
        });
    });
    app.post('/personblogshow1',function (req,res) {
        var username=cache.get('username');
        var content={
            username:username
        };
        Post.find(content,function (err,tasks) {
            var personblognum=tasks.length;
            var singledouble;
            var showperson1=[];
            if(personblognum==1){
                var arr={title:tasks[0].title,time:tasks[0].time};
                showperson1.push(arr);
                singledouble=1;
            }
            else if(personblognum>=2){
                for(var i=0;i<=1;i++){
                    var arr={title:tasks[i].title,time:tasks[i].time};
                    showperson1.push(arr);
                }
                singledouble=2;
            }
            result={
                "singledouble":singledouble,
                "showperson1":showperson1
            }
            res.json(result);
        });
    });
    app.post('/changedata',function (req,res) {
        var username=cache.get('username');
        var content={
            username:username
        };
        User.findOne(content,function (err,tasks) {
            if(tasks!=null){
                var nickname=tasks.nickname;
                var sex=tasks.sex;
                var birth=tasks.birth;
                var address=tasks.address;
                var result={
                    "nickname":nickname,
                    "sex":sex,
                    "birth":birth,
                    "address":address
                }
                res.json(result);
            }
        })
    });
    app.post('/savechangedata',function (req,res) {
        var username=cache.get('username');
        var nickname=req.body.nickname;
        var address=req.body.address;
        var birth=req.body.birth;
        var sex=req.body.sex;
        var content={
            username:username
        };
        var update={
            nickname:nickname,
            address:address,
            birth:birth,
            sex:sex
        };
        var result={
            "result":"success"
        };
        //User.findOne(content).exec(function(err,user){
        //    user.nickname=nickname;
        //   user.address=address;
        //    user.birth=birth;
        //    user.sex=sex;
        //    user.save(function (){
        //        result.user=user;
         //       res.json(result);
        //   })

       // })
         User.update(content,update,function (err) {
             if(err){
                 console.log(err);
             }
             else{
                 res.json(result);
             }
         })
    });
    app.post('/savechangepw',function (req,res) {
        var username=cache.get('username');
        var originalpw=req.body.originalpw;
        var usesafety=req.body.usesafety;
        var content={
            username:username
        };
        User.findOne(content,function (err,tasks) {
            var pwd=tasks.pwd;
            var safety=tasks.safety;
             if(pwd!=originalpw||safety!=usesafety){
            var result={
                "result":"fail"
            }
            res.json(result);
        }
            else{
            var result={
                "result":"success"
            }
            res.json(result);
        }
        })
    });
    app.post('/savechangenewpw',function (req,res) {
        var username=cache.get('username');
        var newpw=req.body.newpw;
        var content={
            username:username
        };
        var update={
            pwd:newpw
        }
        var result={
            "result":"success"
        };
        User.update(content,update,function (error) {
            if(error){
                console.log(err);
            }
            else{
                res.json(result);
            }
        });


    })
    app.post('/upchangehead', uploadhead.single('head'), function (req, res, next) {
        if (req.file) {
            var mychangehead=req.file.filename;
            cache.put('mychangehead',mychangehead);
        }
    });
    app.post('/upchangeblog', upload.single('blog'), function (req, res, next) {
        if (req.file) {
            var mychangeblog=req.file.filename;
            cache.put('mychangeblog',mychangeblog);
        }
    });
    app.post('/changemyhead',function (req,res) {
        var username=cache.get('username');
        var mychangehead=cache.get("mychangehead");
        var content={
            username:username
        };
        var update={
            myhead:mychangehead
        };
        var result={
            "result":"success"
        };
        User.findOne(content,function (err,tasks) {
            var myhead=tasks.myhead;
            if(myhead!=null){
                console.log(myhead);
                fs.unlinkSync("uphead\\"+myhead);
            }
        })
        User.update(content,update,function (err) {
            if(err){
                console.log(err);
            }
            else{
                res.json(result);
            }
        })
    })
    app.post('/seepersonblog',function (req,res) {
        var titletime=req.body.titletime;
        cache.put('titletime',titletime);
        result={
            "result":"success"
        }
        res.json(result);
    })
    app.post('/seepersonmessage',function (req,res) {
        var username=cache.get('username');
        var titletime=cache.get("titletime");
        var jq=titletime.split(",");
        var title=jq[0];
        var time=jq[1];
        var content={
            username:username,
            title:title,
            time:time
        };
        Post.findOne(content,function (err,tasks) {
            var post=tasks.post;
            var picture=tasks.picture;
            var result={
                "title":title,
                "post":post,
                "picture":picture
            }
            res.json(result);
        })
    })
    app.post('/alterpersonblog',function (req,res) {
        var username=cache.get('username');
        cache.put('titletime',titletime);
        result={
            "result":"success"
        };
        res.json(result);
    });
    app.post('/alterpersonmessage',function (req,res) {
        var username=cache.get('username');
        var titletime=cache.get("titletime");
        var newtitle=req.body.title;
        var newpost=req.body.post;
        var jq=titletime.split(",");
        var oldtitle=jq[0];
        var oldtime=jq[1];
        var picture=cache.get('mychangeblog');
        result={
            "result":"success"
        };
        var content={
            username:username,
            title:oldtitle,
            time:oldtime
        };
        var update={
            title:newtitle,
            post:newpost,
            time:minute,
            picture:picture
        };
        Post.findOne(content,function (err,tasks) {
            var picture=tasks.picture;
            if(picture!=null){
                fs.unlinkSync("upblog\\"+picture);
            }
        })
        Post.update(content,update,function (error) {
            res.json(result);
        });
    })
    app.post('/deletepersonblog',function (req,res) {
        var username=cache.get('username');
        var titletime=req.body.titletime;
        var jq=titletime.split(",");
        var title=jq[0];
        var time=jq[1];
        result={
            "result":"success"
        };
        var content={
            username:username,
            title:title,
            time:time
        };
        Post.remove(content,function (err,docs) {
            if(err){
                console.log(err);
            }
            else{
                res.json(result);
            }
        })
    })
}