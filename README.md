# server
简单web服务；
起名：

前朱雀为陵光,后玄武为执名,左青龙为孟章,右白虎为咸池

####1.开始：
>install

```
npm install mz-server
```
>入口文件

在项目更目录新建app.js

```
/**
 * @File:      测试webserver
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V0.0.1
 * @Date:      2016-05-23 18:06:57
 */
 
// 引用静态服务
var app = require('lg-server');

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