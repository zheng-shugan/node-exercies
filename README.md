# 使用 Node 实现后端登陆、认证

## 介绍

基于`Node.js`实现了注册、登陆、修改密码、修改头像等基本`API`。

## 目录结构
`api_server`
```
├── ./app.js  # 入口文件
├── ./config.js # 全局配置文件
├── ./db  # 数据库
│   └── ./db/index.js				      
├── ./package.json  # 项目信息
├── ./router  # express 路由
│   ├── ./router/article.js				   
│   ├── ./router/articleClass.js		   
│   ├── ./router/index.js				   
│   ├── ./router/user.js				   
│   └── ./router/userInfo.js               
├── ./router_handler  # 路由处理函数
│   ├── ./router_handler/article.js		   
│   ├── ./router_handler/articleClass.js   
│   ├── ./router_handler/index.js		   
│   ├── ./router_handler/user.js		   
│   └── ./router_handler/userInfo.js	   
└── ./schema  # 校验规则     
    ├── ./schema/articleClass.json         
    ├── ./schema/article.json              
    ├── ./schema/index.json                
    └── ./schema/user.json                 
```



其中的`/db/index.js`需导入自己的数据库，结构如下：

```js
import mysql from "mysql";

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',              	// 数据库的地址
  user: 'root',               	 	// 数据库用户
  password: 'Your SQL password', 	// 数据库密码
  database: 'my_db_01',          	// 数据库名称
})

export default db
```

## 本地启动

### 1. 安装依赖

`npm install`

### 2. 启动本地服务器

`nodemon app.js`或`node app.js`

### 3. 验证前端接口

可以使用ApiFox/Postman测试，也可以使用提供的网页直接验证。使用提供的网页验证要注意将`js/baseAPI.js`的`  options.url = 'http://127.0.0.1:启动后端服务的端口号' + options.url`



更多信息参考：

http://escook.cn:8088/#/

https://www.showdoc.com.cn/escook/3707158761215217
