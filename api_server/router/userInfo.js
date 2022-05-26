import express from "express";
// 导入用户信息处理函数
import {
  getUserInfo,
  updateUserInfo,
  updatePassword,
  updateAvatar
} from "../router_handler/index.js";
// 导入验证数据合法性的中间件
import expressJoi from "@escook/express-joi";
// 导入需要验证规则的对象
import {
  update_password_schema,
  update_userinfo_schema,
  update_avatar_schema
} from "../schema/index.js";


const router = express.Router()

// 获取用户基本信息的路由
router.get('/userinfo', getUserInfo)

// 更新用户的信息路由
router.post('/userinfo', expressJoi(update_userinfo_schema), updateUserInfo)

// 重置密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), updatePassword)

// 更换头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), updateAvatar)

export {
  router
}