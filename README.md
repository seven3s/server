# server
简单web服务脚手架

####1.开始：
>install

```
npm install server
```
>入口文件

在项目更目录新建app.js

```
/**
 * @File:      测试webserver
 * @Author:    花夏(v_liubiao01@baidu.com)
 * @Version:   V0.0.1
 * @Date:      2016-05-23 18:06:57
 */
 
// 引用静态服务
var app = require('server');

// 设置静态服务根目录，默认当前项目根目录
var static_dir = './web/';

// 创建静态服务，不用关注端口，系统会自己分配，默认8888
app.createServer(static_dir);
```
>启动

```
进入项目主目录
node app.js

```