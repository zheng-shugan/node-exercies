// 导入数据操作模块
import db from "../db/index.js";
// 密码加密模块
import bcrypt from "bcryptjs";
// 导入生成 Token 的模块
import jsonwebtoken from "jsonwebtoken";
// 导入密钥
import {jwtSecretKey, expiresIn} from "../config.js";


const registerUser = (req, res) => {
  // console.log(req.body)
  const userInfo = req.body
  // 判断数据是否合法
  /* if (!userInfo.username || !userInfo.password) {
    return res.send({
      status: 1,
      msg: '用户名或密码不能为空'
    })
  } */

  // 定义 SQL 语句，查询用户名是否被占用
  const selectSql = `select * from ev_users where username=?`
  db.query(selectSql, [userInfo.name], (err, results) => {
    // SQL 语句执行失败
    if (err) {
      /* return res.send({
        status: 1,
        msg: err.message
      }) */
      return res.cc(err);
    }

    // 用户名被占用
    if (results.length > 0) {
      /* return res.send({
        status: 1,
        msg: '用户名被占用，请更换用户名'
      }) */
      return res.cc('用户名被占用，请更换用户名')
    }
    // TODO: 用户名可用
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)
    const insertSql = 'insert into ev_users set ?'
    db.query(insertSql, {username: userInfo.username, password: userInfo.password}, (err, results) => {
      // SQL 语句执行失败
      // if (err) return res.send({ status: 1, msg: err.message })
      if (err) return res.cc(err)

      // SQL 语句执行成功但影响行数不为 1
      if (results.affectedRows !== 1) return res.send({status: 1, msg: '注册用户失败，请稍后再试'})

      // 注册成功
      res.send({status: 0, msg: '注册成功！'})
    })
  })
}

const login = (req, res) => {
  // 接受表单的数据
  console.log(req.body)
  const {username, password} = req.body

  // 定义 SQL 语句
  const sqlStr = `select * from ev_users where username=?`

  // 执行 SQL 语句
  db.query(sqlStr, username, (err, results) => {
    // 执行 SQL 语句失败
    if (err) {
      console.log('router handle SQL grammar error')
      return res.cc(err)
    }

    // 执行 SQL 语句成功，但是获取到的数据条数不等于 1
    if (results.length !== 1) return res.cc("登陆失败")

    // console.log(results[0])

    // TODO: 判断登陆的账号和密码是否和数据库中的一致
    // 思路：调用 bcrypt.compareSync (用户提交的密码, 数据库中的密码) 方法比较密码是否一致
    // bcrypt.compareSync 的返回值是一个布尔值，true 一致，false 不一致
    // 对比从表单中获取的密码和数据库中的密码
    const compareResult = bcrypt.compareSync(password, results[0].password);


    // 如果对比结果为 false
    if (!compareResult) return res.cc("密码错误")

    // TODO: 登陆成功，生成 Token 字符串
    // 在生成字符 Token 字符串的时候要剔除 密码 和 头像
    const user = {...results[0], password: '', user_pic: ''}
    // console.log(user)

    // 对用户的信息进行加密, 生成 Token
    const tokenStr = jsonwebtoken.sign(
      user,                       // 需要加密的信息
      jwtSecretKey,               // 加密的密钥
      {expiresIn: expiresIn}  // Token 的有效期
    )
    // console.log(tokenStr)

    // 将 Token 响应给客户端
    res.send({
      status: 0,
      msg: '登陆成功',
      token: 'Bearer '+ tokenStr
    })
  })
}

export {
  registerUser,
  login
}