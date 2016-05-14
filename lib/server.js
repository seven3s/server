/**
 * @file 简单web服务
 * @author 刘彪(liubiao01@itoxs.com)
 * @version V0.01
 * @date 2016-04-20
 */
var http = require('http');
var port = require('./getPort');
var IP = require('./ip');
var url = require("url");
var port = 8888;
var server = http.createServer(function (req, res) {

    // // 通过writeHead对象设置服务器的响应头 及响应状态码定义为200
    // res.writeHead(200, {'Content-Type' : 'text/html'});

    // // 使用meta属性将设置返回的html代码的字符集设置为UTF-8，目的兼容显示中文
    // res.write('<head><meta charset="utf-8"/></head>');

    // // 通过响应对象的end方法输入html代码并结束响应流
    // res.end("是不是傻啊？");
    var pathname = url.parse(req.url).pathname;
    res.write(pathname);
    res.end();
    console.log(pathname);
});

// 获取一个可用端口
port.getPort(port, function (port) {

    // 启动web服务
    server.listen(port, function () {
        var ip = IP.getIp();
        console.log('服务已启动~~端口:' + port);

        // 如果未联网则使用本机回环地址：127.0.0.1
        ip = ip || 'localhost';
        console.log('服务已启动~~地址是:http://' + ip + ':' + port);
        console.log('正在打开...');

        // 打开默认浏览器
        var child_process = require('child_process');
        var url = 'http://' + ip + ':' + port;
        if (process.platform == 'win32') {
               cmd  = 'start';
        }else if (process.platform == 'linux') {
               cmd  = 'xdg-open';
        }else if (process.platform == 'darwin') {
               cmd  = 'open';
        }

        // 打开中...
        child_process.exec(cmd + ' "' + url + '"');
        console.log('已在浏览器成功打开!');
    });
});