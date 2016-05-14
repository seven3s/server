/**
 * @file 获取可用端口
 * @author 刘彪(liubiao01@itoxs.com)
 * @version V0.01
 * @date 2016-04-22
 */
var exports = {

    // 默认端口
    defaultPort: 8080,

    /**
     * init 初始化方法；
     *
     */
    init: function () {

    },

    /**
     * getPort 获取一个可用端口
     *
     */
    getPort: function (port, callback) {

        var me = this;
        // 转换为Number
        port /= 1;
        // 校验端口
        port = Number.isNaN(port) ? this.defaultPort : port;
        me.checkPortIsDo(port, function (isDo) {
            if (isDo) {
                callback && callback(port);
            }else {
                port++;
                me.getPort(port, callback);
            }
        });
    },

    /**
     * checkPortIsDo 检查端口是否可用
     *
     */
    checkPortIsDo: function (port, callback) {
        var net = require('net');
        // 创建服务并监听窗口
        var server = net.createServer().listen(port);
        server.on('listening', function () {
            // 执行这块代码说明端口未被占用
            // 关闭服务
            server.close();
            console.log('端口{' + port + '} 可用');
            callback && callback(true);
        });
        server.on('error', function (err) {
            if (err.code === 'EADDRINUSE') {
                // 端口已经被使用
                console.log('端口{' + port + '} 被占用,正在重试...');
                callback && callback(false);
            }
        });
    }
};
module.exports = exports;