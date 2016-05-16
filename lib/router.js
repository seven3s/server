/**
 * @file 路由规则
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-04-23
 */
var url = require('url');
var path = require("path");
var fs = require('fs');
var mime = require('mime');

/**
 * routeter routeter类
 *
 * @param  {type} req http请求对象
 * @param  {type} res http返回对象
 *
 */
function routeter (req, res) {}

/**
 * routStaticFile 读取静态文件
 *
 * @param  {type} req http请求对象
 * @param  {type} res http返回对象
 *
 */
routeter.prototype.routStaticFile = function (req, res) {
    var me = this;
    var pathname = url.parse(req.url).pathname;
    var realPath = __dirname + '/web' + pathname;
    // 获取后缀名
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            me.response404(req, res);
        } else {
            fs.readFile(realPath, function (err, file) {
                if (err) {
                    me.response500(req, res);
                } else {
                    var contentType = mime.lookup(ext);
                    me.response200(res, file, contentType, 'utf-8');
                }
            });
        }
    });
};

/**
 * response200 返回200
 *
 * @param  {type} req http请求对象
 * @param  {type} res http返回对象
 *
 */
routeter.prototype.response200 = function (res, data, contentType, encoding) {
    res.writeHead(200, {
        'Content-Type': contentType
    });
    res.write(data, encoding);
    res.end();
};

/**
 * response404 返回404
 * @param  {type} req http请求对象
 * @param  {type} res http返回对象
 */
routeter.prototype.response404 = function (req, res) {
    res.writeHead(404);
    res.end();
};

/**
 * response500 返回500
 *
 * @param  {type} req http请求对象
 * @param  {type} res http返回对象
 *
 */
routeter.prototype.response500 = function (req, res) {
    res.writeHead(500);
    res.end();
};

var exports = {

    /**
     * routRequest 路由处理
     *
     * @param  {type} req http请求对象
     * @param  {type} res http返回对象
     *
     */
    routRequest: function (req, res) {
        var route = new routeter();
        route.routStaticFile(req, res);
    }
};
module.exports = exports;