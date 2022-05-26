import mysql from "mysql";

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',          // 数据库的地址
  user: 'root',               // 数据库用户
  password: 'mysqlAdmin123!', // 数据库密码
  database: 'my_db_01',       // 数据库名称
})

export default db