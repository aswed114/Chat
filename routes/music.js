/**
 * Created by Administrator on 8/25/2017.
 */
var cache = require('memory-cache');
var Music=require('../models/Music');
var User=require('../models/User');
var Listmusic=require('../models/Listmusic');
var Likemusic=require('../models/Likemusic');
module.exports=function(app) {
    app.post('/musicform1',function (req,res) {
        var content={};
        var result={
            "allmusic1":[]
        }
        Music.find(content,function (err,tasks) {
            var num=tasks.length;
            if(num<9){
                for(var i=0;i<num;i++){
                    var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musiccd:tasks[i].musiccd};
                    result.allmusic1.push(arr);
                }
            }
            else{
                for(var i=0;i<9;i++){
                    var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musiccd:tasks[i].musiccd};
                    result.allmusic1.push(arr);
                }
            }
            res.json(result);
        })
    })
    app.post('/musicform',function (req,res) {
        var musicformpage=req.body.musicformpage;
        var content={};
        var result={
            "allmusic":[]
        }
        if(musicformpage==0){
            Music.find(content,function (err,tasks) {
                var num=tasks.length;
                for(var i=0;i<9;i++){
                    var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musiccd:tasks[i].musiccd};
                    result.allmusic.push(arr);
                }
                res.json(result);
            })
        }
        else{
            Music.find(content,function (err,tasks) {
                var num=tasks.length;
                if(num-musicformpage*9>=9){
                    for(var i=musicformpage*9;i<musicformpage*18;i++){
                        var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musiccd:tasks[i].musiccd};
                        result.allmusic.push(arr);
                    }
                    res.json(result);
                }
                else{
                    result={
                        "allmusic":[],
                        "final":"finallist"
                    }
                    for(var i=musicformpage*9;i<num;i++){
                        var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musiccd:tasks[i].musiccd};
                        result.allmusic.push(arr);
                    }
                    res.json(result);
                }

            })
        }
    })
    app.post('/allmusicnumwhere',function (req,res) {
        var username=cache.get('username');
        var content={
            username:username
        };
        var result;
        Listmusic.find(content,function (err,tasks) {
            var musicnum=tasks.length;
            result={
                "musicnum":musicnum
            };
            res.json(result);
        });
    })
    app.post('/musicwhere',function (req,res) {
        var musictitlesinger=req.body.musictitlesinger;
        var jq=musictitlesinger.split(",");
        var musictitle=jq[0];
        var singer=jq[1];
        var content={
            musictitle:musictitle,
            singer:singer
        }
        Music.findOne(content,function (err,tasks) {
            if(err){
                console.log(err);
            }
            else{
                var musicplace=tasks.musicplace;
                var musicpicture=tasks.musicpicture;
                var result={
                    "musicplace":musicplace,
                    "musicpicture":musicpicture
                }
                res.json(result);
            }
        })
    })
    app.post('/addmusic',function (req,res) {
        var musictitlesinger=req.body.musictitlesinger;
        var username=cache.get('username');
        var jq=musictitlesinger.split(",");
        var musictitle=jq[0];
        var singer=jq[1];
        var content1={
            username:username,
            musictitle:musictitle,
            singer:singer
        };
        var content2={
            musictitle:musictitle,
            singer:singer
        };
        var result1={
            "result":"fail"
        };
        var result2={
            "result":"success"
        };
        Listmusic.find(content1,function (err,tasks) {
            if(err){
                console.log(err);
            }
            else{
                if(tasks.length==0){
                    Music.findOne(content2,function (err,tasks) {
                        var musicplace=tasks.musicplace;
                        var musicpicture=tasks.musicpicture;
                        var musictotaltime=tasks.musictotaltime;
                        var musiccd=tasks.musiccd;
                        var contentsave={
                            username:username,
                            musictitle:musictitle,
                            singer:singer,
                            musiccd:musiccd,
                            musicplace:musicplace,
                            musictotaltime:musictotaltime,
                            musicpicture:musicpicture
                        };
                        new Listmusic(contentsave).save();
                    })
                    res.json(result2);
                }
                else{
                    res.json(result1);
                }
            }
        })
    });
    app.post('/addlike',function (req,res) {
        var musictitlesinger=req.body.musictitlesinger;
        var username=cache.get('username');
        var jq=musictitlesinger.split(",");
        var musictitle=jq[0];
        var singer=jq[1];
        var content1={
            username:username,
            musictitle:musictitle,
            singer:singer
        };
        var content2={
            musictitle:musictitle,
            singer:singer
        };
        var result1={
            "result":"fail"
        };
        var result2={
            "result":"success"
        };
        Likemusic.find(content1,function (err,tasks) {
            if(err){
                console.log(err);
            }
            else{
                if(tasks.length==0){
                    Music.findOne(content2,function (err,tasks) {
                        var musicplace=tasks.musicplace;
                        var musicpicture=tasks.musicpicture;
                        var musictotaltime=tasks.musictotaltime;
                        var musiccd=tasks.musiccd;
                        var contentsave={
                            username:username,
                            musictitle:musictitle,
                            singer:singer,
                            musiccd:musiccd,
                            musicplace:musicplace,
                            musictotaltime:musictotaltime,
                            musicpicture:musicpicture
                        };
                        new Likemusic(contentsave).save();
                    })
                    res.json(result2);
                }
                else{
                    res.json(result1);
                }
            }
        })
    });
    app.post('/deletemusic',function (req,res) {
        var musictitlesinger=req.body.musictitlesinger;
        var username=cache.get('username');
        var jq=musictitlesinger.split(",");
        var musictitle=jq[0];
        var singer=jq[1];
        var content={
            username:username,
            musictitle:musictitle,
            singer:singer
        };
        var result={
            "result":"success"
        };
        Listmusic.remove(content,function (err,docs) {
            if(err){
                console.log(err);
            }
            else{
                res.json(result);
            }
        })
    })
    app.post('/deletelike',function (req,res) {
        var musicid=req.body.musicid;
        var username=cache.get('username');
        var content={
            username:username,
        };
        Likemusic.find(content,function (err,tasks) {
            var num=tasks.length;
                var result={
                "result":"success"
            };
                var singer=tasks[num-musicid-1].singer;
                var musictitle=tasks[num-musicid-1].musictitle;
                var removecontent={
                    username:username,
                    singer:singer,
                    musictitle:musictitle
                }
                Likemusic.remove(removecontent,function (err,docs) {
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.json(result);
                    }
                })
        })
    })

    app.post('/emptylist',function (req,res) {
        var username=cache.get('username');
        var content={
            username:username
        };
        var result={
            "result":"success"
        }
        Listmusic.remove(content,function (err,docs) {
            if(err){
                console.log(err);
            }
            else{
                res.json(result);
            }
        })
    })
    app.post('/prevformlist',function (req,res) {
        var username=cache.get('username');
        var isformlist=req.body.isformlist;
        var nowmusicmarksonval=parseInt(req.body.nowmusicmarksonval);
        var result;
        if(isformlist=="list"){
            var content={
                username:username
            };
            Listmusic.find(content,function (err,tasks) {
                var num=tasks.length;
                var prevmusictitle=tasks[num-nowmusicmarksonval-1].musictitle;
                var prevmusicsinger=tasks[num-nowmusicmarksonval-1].singer;
                var prevmusicpicture=tasks[num-nowmusicmarksonval-1].musicpicture;
                var prevmusicplace=tasks[num-nowmusicmarksonval-1].musicplace;
                result={
                    "prevmusictitle":prevmusictitle,
                    "prevmusicsinger":prevmusicsinger,
                    "prevmusicpicture":prevmusicpicture,
                    "prevmusicplace":prevmusicplace
                }
                res.json(result);
            })
        }
    })
    app.post('/nextformlist',function (req,res) {
        var username=cache.get('username');
        var isformlist=req.body.isformlist;
        var nowmusicmarksonval=parseInt(req.body.nowmusicmarksonval);
        var result;
        if(isformlist=="list"){
            var content={
                username:username
            };
            Listmusic.find(content,function (err,tasks) {
                var num=tasks.length;
                var nextmusictitle=tasks[num-nowmusicmarksonval-1].musictitle;
                var nextmusicsinger=tasks[num-nowmusicmarksonval-1].singer;
                var nextmusicpicture=tasks[num-nowmusicmarksonval-1].musicpicture;
                var nextmusicplace=tasks[num-nowmusicmarksonval-1].musicplace;
                result={
                    "nextmusictitle":nextmusictitle,
                    "nextmusicsinger":nextmusicsinger,
                    "nextmusicpicture":nextmusicpicture,
                    "nextmusicplace":nextmusicplace
                }
                res.json(result);
            })
        }
    })
    app.post('/playlist',function (req,res) {
        var musiclistpage=req.body.musiclistpage;
        var username=cache.get('username');
        var content={
            username:username
        };
        var result={
            "allmusiclist":[]
        };
        if(musiclistpage==0){
            Listmusic.find(content,function (err,tasks) {
                var num=tasks.length;
                for(var i=num-1;i>=num-8;i--){
                    var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musictotaltime:tasks[i].musictotaltime};
                    result.allmusiclist.push(arr);
                }
                res.json(result);
            })
        }
        else{
            Listmusic.find(content,function (err,tasks) {
                var num=tasks.length;
                if(num-musiclistpage*8>=8){
                    for(var i=musiclistpage*8+7;i>=musiclistpage*8;i--){
                        var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musictotaltime:tasks[i].musictotaltime};
                        result.allmusiclist.push(arr);
                    }
                    res.json(result);
                }
                else{
                    result={
                        "allmusiclist":[],
                        "final":"finallist"
                    }
                    for(var i=num-8*musiclistpage-1;i>=0;i--){
                        var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musictotaltime:tasks[i].musictotaltime};
                        result.allmusiclist.push(arr);
                    }
                    res.json(result);
                }

            })
        }
    })
    app.post('/playlist1',function (req,res) {
        var username=cache.get('username');
        var content={
            username:username
        };
        var result={
            "alllistmusic1":[],
            "iseight":"false"
        };
        Listmusic.find(content,function (err,tasks) {
            var num=tasks.length;
            if(num<8){
                for(var i=num-1;i>=0;i--){
                    var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musictotaltime:tasks[i].musictotaltime};
                    result.alllistmusic1.push(arr);
                }
            }
            else if(num==8){
                result.iseight="true";
                for(var i=num-1;i>=0;i--){
                    var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musictotaltime:tasks[i].musictotaltime};
                    result.alllistmusic1.push(arr);
                }
                console.log(result.iseight);
            }
            else{
                for(var i=num-1;i>=num-8;i--){
                    var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musictotaltime:tasks[i].musictotaltime};
                    result.alllistmusic1.push(arr);
                }
            }
            res.json(result);
        })
    })
    app.post('/likelist',function (req,res) {
        var username=cache.get('username');
        var musiclikepage=req.body.musiclikepage;
        var content={
            username:username
        };
        var result={
            "allmusiclist":[]
        };
        if(musiclikepage==0){
            Likemusic.find(content,function (err,tasks) {
                var num=tasks.length;
                for(var i=num-1;i>=num-8;i--){
                    var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musictotaltime:tasks[i].musictotaltime};
                    result.allmusiclist.push(arr);
                }
                res.json(result);
            })
        }
        else{
            Likemusic.find(content,function (err,tasks) {
                var num=tasks.length;
                if(num-musiclikepage*8>=8){
                    for(var i=musiclikepage*8+7;i>=musiclikepage*8;i--){
                        var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musictotaltime:tasks[i].musictotaltime};
                        result.allmusiclist.push(arr);
                    }
                    res.json(result);
                }
                else{
                    result={
                        "allmusiclist":[],
                        "final":"finallist"
                    }
                    for(var i=num-8*musiclikepage-1;i>=0;i--){
                        var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musictotaltime:tasks[i].musictotaltime};
                        result.allmusiclist.push(arr);
                    }
                    res.json(result);
                }

            })
        }
    })
    app.post('/likelist1',function (req,res) {
        var username=cache.get('username');
        var content={
            username:username
        };

        Likemusic.find(content,function (err,tasks) {
            var num=tasks.length;
            var result={
                "alllistmusic1":[],
                "iseight":"false"
            };
            if(num<8){
                for(var i=num-1;i>=0;i--){
                    var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musictotaltime:tasks[i].musictotaltime};
                    result.alllistmusic1.push(arr);
                }
            }
            else if(num==8){
                result.iseight="true";
                for(var i=num-1;i>=0;i--){
                    var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musictotaltime:tasks[i].musictotaltime};
                    result.alllistmusic1.push(arr);
                }
            }
            else{
                for(var i=num-1;i>=num-8;i--){
                    var arr={musictitle:tasks[i].musictitle,singer:tasks[i].singer,musictotaltime:tasks[i].musictotaltime};
                    result.alllistmusic1.push(arr);
                }
            }
            console.log(result.alllistmusic1);
            res.json(result);
        })
    })
}