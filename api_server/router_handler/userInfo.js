// 导入数据库模块
import db from "../db/index.js";
// 导入 bcrypt
import bcrypt from "bcryptjs";


// 获取用户信息的接口
const getUserInfo = (req, res) => {
  const sqlStr = `select id, username, nickname, email, user_pic from ev_users where id=?`

  console.log(req.auth.id)
  const {id} = req.auth

  db.query(sqlStr, id, (err, results) => {
    // SQL 语句执行失败
    if (err) return res.cc(err)

    // SQL 语句执行成功但是查询到的数据条数不唯一
    if (results.length !== 1) return res.cc(err)

    // 将用户信息响应给客户端
    res.send({
      status: 0,
      msg: '获取用户信息成功',
      data: results[0]
    })
  })
}

// 更新用户数据的接口
const updateUserInfo = (req, res) => {
  console.log('req.body: ', req.body)
  // 定义 SQL 语句
  const sqlStr = `update ev_users set ? where id=?`

  // console.log(req)

  // 执行 SQL 语句
  // console.log(req.body.id)
  db.query(sqlStr, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err)

    // console.log(results)
    if (results.affectedRows !== 1) return res.cc("更新失败")

    console.log(results)

    return res.cc("修改用户信息成功", 0)
  })
}

// 定义重置密码的接口
const updatePassword = (req, res) => {
  // 获取 req.body 中的 oldPwd 和 newPwd
  const {oldPwd, newPwd} = req.body

  // console.log('old password', oldPwd)
  // console.log('new password ', newPwd)
  const sqlStr = `select * from ev_users where id=?`
  const {id} = req.auth
  // console.log('req.auth: ', req.auth)
  console.log('req.auth,id: ', req.auth.id)

  // 查询用户是否存在
  db.query(sqlStr, id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc("用户不存在")

    console.log(results)

    // 判断用户提交的旧密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.cc('原密码错误')

    // 旧密码验证通过
    const updatePassword = `update ev_users set password=? where id=?`

    // 对新密码进行处理
    const newPassword = bcrypt.hashSync(newPwd, 10)

    db.query(updatePassword, [newPassword, id], (err, results) => {
      if (err) return res.cc(err)

      if (results.affectedRows !== 1) return res.cc("重置密码失败")

      res.cc("更新密码成功", 0)
    })
  })
}

// 更换头像的接口
const updateAvatar = (req, res) => {
  const sqlStr = `update ev_users set user_pic=? where id=?`
  db.query(sqlStr, [req.body.avatar, req.auth.id], (err, results) => {
    if (err) return res.cc(err)

    if (results.affectedRows !== 1) return res.cc("更新头像失败")

    return res.cc("更新头像成功！", 0)
  })
}

export {
  getUserInfo,
  updateUserInfo,
  updatePassword,
  updateAvatar
}