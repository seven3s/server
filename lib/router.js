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
var exports = {

    /**
     * routRequest 路由处理
     *
     * @param  {type} req http请求对象
     * @param  {type} res http返回对象
     *
     */
    routRequest: function (req, res) {
        var pathname = url.parse(req.url).pathname;
        var realPath = __dirname + '/web' + pathname;
        var ext = path.extname(realPath);
        ext = ext ? ext.slice(1) : 'unknown';
        fs.exists(realPath, function (exists) {
            if (!exists) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write("This request URL " + pathname + " was not found on this server.");
                res.end();
            } else {
                fs.readFile(realPath, "binary", function (err, file) {
                    if (err) {
                        res.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        res.end('500');
                    } else {
                        var contentType = mime.lookup(ext) || "text/plain";
                        res.writeHead(200, {
                            'Content-Type': contentType
                        });
                        res.write(file, "binary");
                        res.end();
                    }
                });
            }
        });
    }
};
module.exports = exports;