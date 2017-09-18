
/*
 * GET home page.
 */
var User=require('../models/User');
var cache = require('memory-cache');
var multer=require('multer');
var upload = require('../routes/fileuphead');
module.exports=function (app) {
  app.get('/',function (req,res) {
    res.render('index');
  });
  app.get('/login',function(req,res){
    result1={
      'result':'success'
    };
    result2={
      'result':'fail'
    };
    var username=req.query.username,
        pwd=req.query.pwd,
        content={username:username,
                  pwd:pwd
        };
        User.find(content,function (err,result) {
          if(err){
            console.log(err);
          }
          else {
            if(result.length!=0){
              var nickname=result[0].nickname;
              console.log(nickname);
              cache.put('nickname',nickname);
              cache.put('username', username);
              res.json(result1);
            }
            else{
              res.json(result2);
            }
          }
        });
  });
  app.get('/register',function(req,res){
        res.render('register');
  });
  app.post('/uploadhead', upload.single('head'), function (req, res, next) {
    if (req.file) {
      var myhead=req.file.filename;
      cache.put('myhead',myhead);
    }
  });
  app.post('/reg',function(req,res){
    result1={
      'result':'注册成功'
    }
    result2={
      'result':'用户名已存在'
    }
    var username=req.body.username,
        myhead=cache.get("myhead"),
        pwd=req.body.pwd,
        sex=req.body.sex,
        nickname=req.body.nickname,
        birth=req.body.birth,
        address=req.body.address,
        safety=req.body.safety,
    content={username:username},
    contentsave={username:username,
                 myhead:myhead,
                 pwd:pwd,
                 nickname:nickname,
                 sex:sex,
                 birth:birth,
                 address:address,
                 safety:safety
     };
    User.find(content,function(err,result){
      if(err){
        console.log(err);
      }
      else{
        if(result.length==0){
          res.json(result1);
          new User(contentsave).save();
        }
        else if(result.length!=0){
          res.json(result2);
        }
      }
    })
  });
};