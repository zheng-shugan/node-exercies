import express from "express";
// 导入用户路由处理函数模块
import {registerUser, login} from "../router_handler/index.js";
// 导入验证表单数据的中间件
import expressJoi from "@escook/express-joi";
// 导入需要的验证规则对象
import { reg_login_schema } from "../schema/index.js";



// 创建路由对象
const router = express.Router()

/*
* 注册新用户
* 在注册新用户路由的时候，声明全局中间件，对当前请求中携带的数据进行验证
*   1. 在数据验证通过之后，会把这次请求流转给后面的路由处理函数
*   2. 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 对象，
*   进入全局错误级别中间件中国进行处理 */
router.post('/register', expressJoi(reg_login_schema), registerUser)

// 登陆
router.post('/login', expressJoi(reg_login_schema),login)

export default router