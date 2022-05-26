import express from "express";
import cors from "cors";
// 导入路由模块
import {
  router as userRouter,
  userInfoRouter,
  articleRouter,
  articleClass
} from './router/index.js'
import joi from "joi";
// 导入解析 Token 的中间件
import {expressjwt} from "express-jwt";
// 导入解析 Token 的密钥
import {jwtSecretKey} from "./config.js";


const app = express()

/* 配置中间件 */
// 跨域中间件
app.use(cors())

// 解析 application/x-www-form-urlencoded 格式中间件
app.use(express.urlencoded({extended: false}))

// 响应数据的中间件
app.use((req, res, next) => {
  // status = 0 为成功；status = 1 为失败；默认将 status 的值设为 1，方便处理失败的情况
  res.cc = (err, status = 1) => {
    res.send({
      status,
      // 状态描述，判断 err 是错误对象还是字符串
      msg: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 使用 unless({ path: [/^\/api\//] }) 指定前缀为 /api 的接口不需要进行 Token 的身份认证
app.use(expressjwt({
    secret: jwtSecretKey,   // 密钥
    algorithms: ["HS256"]   // 加密的算法
  })
    .unless({path: [/^\/api\///* , /^\/my\// */]})
)

/* 注册路由模块 */
// 用户注册路由
app.use('/api', userRouter)

// 用户信息路由
app.use('/my', userInfoRouter)

// 文章分类路由
app.use('/my/article', articleClass)

// 用户文章路由
app.use('/my/article', articleRouter)

/* 错误中间件 */
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
  res.cc(err)
})

app.listen(8000, () => {
  console.log("express server running at http://127.0.0.1:8000")
})