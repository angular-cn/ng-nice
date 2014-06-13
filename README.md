## ng-nice
站点：http://ngnice.com/

NgNice站点是由一批AngularJS爱好者发起的，致力于打造一个AngularJS的学习和经验分享平台。
目前NgNice平台不对外开放注册功能，站内分享内容主要由NgNice官方团队进行维护，如果你也是AngularJS的爱好者，并且乐于分享你的经验给其他人，那就加入我们吧！ 官方团队成员参见：点击查看团队成员。
NgNice站点目前提供的功能如下：

1. 简单的内容发布系统，主要分享一些AngularJS使用的经验和精品文章;
1. AngularJS开发指南中文翻译的展示，github源码地址：https://github.com/jingyanjiaoliu/angular-guide-zh
1. AngularJS showcase项目的展示，目前处于开发阶段，github源码地址：https://github.com/angular-cn/ng-showcase


详细说明参见：http://ngnice.com/about

## ng-nice整体架构说明

服务端技术：NodeJS + Express4.0 + Mongodb

前端技术：MV\* 框架 AngularJS + Bootstrap3.x

## ng-nice本地搭建步骤

1. 新建文件config.js ，拷贝 config.sample.js 内容到 config.js；
1. 配置config.js，包括mongodb数据库链接字符串和cookie_secret；
1. 执行npm install 安装NodeJS Modules。
1. node server 启动服务。

## Directory structure

```
|-- core
|   |-- api
|   |-- controller
|   |-- data
|   |   -- model
|   |-- mailer
|   -- validation
 -- web
    |-- static
    |   |-- css
    |   |-- docs
    |   |   |-- components
    |   |   |   |-- bootstrap
    |   |   |   |   |-- css
    |   |   |   |   |-- img
    |   |   |   |   |-- js
    |   |   |   |--font-awesome
    |   |   |       |-- css
    |   |   |       -- font
    |   |   |-- css
    |   |   |-- img
    |   |   |   |-- guide
    |   |   |   |-- tutorial
    |   |   |-- js
    |   |   |-- notes
    |   |   |-- partials
    |   |       |-- api
    |   |       |-- cookbook
    |   |       |-- error
    |   |       |-- guide
    |   |       |-- misc
    |   |       |-- tutorial
    |   |-- showcase
    |   |-- fonts
    |   |   |--font-awesome
    |   |       |-- 4.0.3
    |   |           |-- fonts
    |   |           |-- less
    |   |-- img
    |   |-- js
    |   |   |-- controller
    |   |   |-- directive
    |   |   |-- filter
    |   |   -- service
    |   |-- lib
    |   |   |-- angular
    |   |   |   -- 1.2.16
    |   |   |-- angular-ui
    |   |   |   -- ui-router
    |   |   |       -- 0.2.10
    |   |   |-- bootstrap
    |   |   |   -- 3.1.1
    |   |   |       |-- fonts
    |   |   |       |-- js
    |   |   |       |-- less
    |   |   |-- jquery
    |   |   |   -- 1.11.0
    |   |   |-- markdown
    |   |   |   -- 0.6.0
    |   |   |-- marked
    |   |   |   -- 0.3.2
    |   |   |-- moment
    |   |   |   -- 2.6.0
    |   |   -- w5cValidator
    |   |       |-- 1.0.0
    |   |       -- 2.0.0
    -- view
        |-- footer
        |-- header
        |-- post
        -- user
```