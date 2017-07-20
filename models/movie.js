var mongoose = require('mongoose');
var movieSchema = require('../schemas/movie.js'); //引入'../schemas/movie.js'导出的模式模块

// 编译生成movie模型
var movie = mongoose.model('movie', movieSchema);
// 编译生成movie模型
module.exports = movie;