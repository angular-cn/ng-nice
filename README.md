## NgNice
站点：http://ngnice.com/

NgNice 站点是由一批 Angular.js 爱好者发起的，致力于打造一个 Angular.js 的学习和经验分享平台。
目前 NgNice 平台不对外开放注册功能，站内分享内容主要由 NgNice 官方团队进行维护，如果你也是 Angular.js 的爱好者，
并且乐于分享你的经验给其他人，那就加入我们吧！ 官方团队成员参见：[点击查看团队成员](https://worktile.com/teams/195a7878764eb2)。
NgNice站点目前提供的功能如下：

1. 简单的内容发布系统，主要分享一些 Angular.js 使用的经验和精品文章;
1. Angular.js开发指南中文翻译的展示，github源码地址：https://github.com/jingyanjiaoliu/angular-guide-zh
1. Angular.js showcase项目的展示，目前处于开发阶段，github源码地址：https://github.com/angular-cn/ng-showcase


详细说明参见：http://ngnice.com/about

## 整体架构技术说明

服务端技术：Node.js >=0.10.x + Express >=4.x + Mongodb >=2.x

前端技术：Angular.js >= 1.2.x + Bootstrap >= 3.x

## 本地搭建步骤

1. 配置开发环境的配置文件 core/config/development.js （包括 mongodb 数据库链接字符串和 cookie_secret）；
1. 运行命令 `npm install` 安装 NodeJS Modules；
1. 运行命令 `node server` 启动服务；
1. 生产环境使用 `NODE_ENV=production node server`(仅限linux环境下)。

## 大致目录结构

```
.
|-- bin
|-- core
|   |-- api
|   |-- config
|   |-- controller
|   |-- data
|   |   `-- model
|   |-- lib
|   |-- mailer
|   `-- validation
|-- test
|   |-- karma
|   `-- mocha
|       `-- data
`-- web
    |-- static
    |   |-- css
    |   |-- fonts
    |   |-- img
    |   |-- js
    |   |   |-- controller
    |   |   |-- directive
    |   |   |-- filter
    |   |   |-- service
    |   |   `-- tpl
    |   |       |-- common
    |   |       `-- directive
    |   |-- lib
    `-- view
        |-- footer
        |-- header
        |-- home
        |-- post
        |-- shared
        `-- user

```
