var express = require('express');  
var app = express(); 

var port = process.env.PORT || 8081; // 设置端口号：8081
app.listen(port); // 监听 port[3000]端口
console.log('i_movie start on port' + port);

var path = require('path');
var mongoose = require('mongoose'); // 加载mongoose模块
mongoose.connect('mongodb://localhost:27017/mini_movie'); // 连接mongodb本地数据库mini_movie
console.log('MongoDB connection success!');
app.locals.moment = require('moment'); // 载入moment模块，格式化日期

var serveStatic = require('serve-static');  // 静态文件处理
app.use(serveStatic('public')); // 路径：public

var bodyParser = require('body-parser');
// 因为后台录入页有提交表单的步骤，故加载此模块方法（bodyParser模块来做文件解析），将表单里的数据进行格式化
app.use(bodyParser.urlencoded({extended: true}));

var _underscore = require('underscore'); // _.用新对象里的字段替换老的字段

app.set('views', './views/pages');     // 设置视图默认的文件路径
app.set('view engine', 'jade');  // 设置视图引擎：jade

var movie = require('./models/movie.js'); // 载入mongoose编译后的模型movie

// 编写主要页面路由
// index page 首页
app.get('/', function (req, res) {
    movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('index', {  // 渲染index 首页
            title: '微型电影 首页',
            movies: movies
        });
    });
});

// detail page 详情页
app.get('/movie/:id', function (req, res) {
    var id = req.params.id;
    movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: '电影名：' + movie.title,
            movie: movie
        });
    });
});

// admin page 后台录入页
app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: '微型电影 后台录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    });
});

// admin update movie 后台更新页
app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id;
    if (id) {
        movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: '微型电影 后台更新页',
                movie: movie
            });
        });
    }
});

// admin post movie 后台录入提交
app.post('/admin/movie/new', function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie = null;
    if (id !== 'undefined') { // 已经存在的电影数据
        movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _underscore.extend(movie, movieObj); // 用新对象里的字段替换老的字段
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            });
        });
    } else {  // 新加的电影
        _movie = new movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        });
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/movie/' + movie._id);
        });
    }
});

// list page 列表页
app.get('/admin/list', function (req, res) {
    movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: '微型电影 列表页',
            movies: movies
        });
    });
});

// list delete movie data 列表页删除电影
app.delete('/admin/list', function (req, res) {
    var id = req.query.id;
    if (id) {
        movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        });
    }
});
