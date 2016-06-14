/**
 * @file 简单web静态服务
 * @author 刘彪(liubiao01@itoxs.com)
 * @version V0.01
 * @date 2016-04-20
 */
var http = require('http');
var getPort = require('./getPort');
var IP = require('./ip');
var chalk = require('chalk');
// var route = require('./router.js');

// 静态服务路径依赖 
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var port = process.env.PORT || 8888;
var exports = {
    createServer: function (static_dir) {
        // 静态服务路径
        static_dir = static_dir || './';
        var serve = serveStatic(static_dir, {'index': ['index.html', 'index.htm']});
        var server = http.createServer(function (req, res) {
            // route.routRequest(req, res);
            // 静态服务路径
            var done = finalhandler(req, res);
            serve(req, res, done);
        });
        // 获取一个可用端口
        getPort.getPort(port, function (port) {

            // 启动web服务
            server.listen(port, function () {
                var ip = IP.getIp();

                // 如果未联网则使用本机回环地址：127.0.0.1
                ip = ip || 'localhost';
                var url = 'http://' + ip + ':' + port;
                console.log(chalk.yellow('服务已启动~~地址是:') + chalk.green(url));
                console.log('正在打开...');

                // 打开默认浏览器
                var child_process = require('child_process');
                if (process.platform == 'win32') {
                       cmd  = 'start';
                }else if (process.platform == 'linux') {
                       cmd  = 'xdg-open';
                }else if (process.platform == 'darwin') {
                       cmd  = 'open';
                }

                // 打开中...
                child_process.exec(cmd + ' "' + url + '"');
                console.log(chalk.green('已在浏览器成功打开!'));
            });
        });
    }
};
module.exports = exports;