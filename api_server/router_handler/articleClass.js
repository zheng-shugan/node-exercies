import db from "../db/index.js";

const getArticleClass = (req, res) => {
  console.log(req)
  const sqlStr = 'select * from ev_article_class where is_delete=0 order by id asc'
  db.query(sqlStr, (err, results) => {
    if (err) return res.cc(err)

    res.send({
      status: 0,
      msg: "获取文章分类成功",
      data: results
    })
  })
  // res.send("getArticleClass ok")
}

const addArticleClass = (req, res) => {
  const sqlStr = 'insert into ev_article_class set ?'
  const {body} = req
  console.log('req.body: ', body);

  db.query(sqlStr, req.body, (err, results) => {
    if (err) return res.cc(err)

    // 分类名称 和 分类别名 都被占用
    if (results.length === 2)
      return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
      return res.cc('分类名称与别名被占用，请更换后重试！')
    // 分类名称 或 分类别名 被占用
    if (results.length === 1 && results[0].name === req.body.name)
      return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias)
      return res.cc('分类别名被占用，请更换后重试！')
    // console.log(results)
    if (results.affectedRows !== 1)
      return res.cc('新增文章分类失败！')


    // TODO: 新增文章分类
    res.cc('新增文章分类成功', 0)
  })
  // res.send("add class success")
}

const deleteCateById = (req, res) => {
  const sqlStr = 'update ev_article_class set is_delete=1 where id=?'
  console.log(req.params)
  const {id} = req.params
  db.query(sqlStr, id, (err, results) => {
    if (err) return res.cc(err)

    if (results.affectedRows !== 1)
      return res.cc("删除文章分类失败")

    res.cc("删除文章分类成功", 0)
  })
  // res.send("delete class done")
}

const getArtCateById = (req, res) => {
  // console.log(req.body)
  // console.log(req.params)
  const {id} = req.params
  const sqlStr = 'select * from ev_article_class where id=?'

  db.query(sqlStr, id, (err, results) => {
    if (err) return res.cc(err)

    if (results.length !== 1)
      return res.cc("获取文章分类失败")

    res.send({
      status: 0,
      msg: '获取文章分类数据成功',
      data: results[0]
    })
  })
  // res.send("getArtCateById done")
}

const updateCateById = (req, res) => {
  // res.send("updateCateById done")
  console.log('req.body ', req.body)
  console.log(req.body.Id, req.body.name, req.body.alias)

  const { Id, name, alias } = req.body

  const sqlStr = 'select * from ev_article_class where Id<>? and (name=? or alias=?)'
  db.query(sqlStr, [Id, name, alias], (err, results) => {
    if (err)
      return res.cc(err)

    // 分类名称 和 分类别名 都被占用
    if (results.length === 2)
      return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
      return res.cc('分类名称与别名被占用，请更换后重试！')
    // 分类名称 或 分类别名 被占用
    if (results.length === 1 && results[0].name === req.body.name)
      return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias)
      return res.cc('分类别名被占用，请更换后重试！')

    const sql = `update ev_article_class set ? where Id=?`

    db.query(sql, [req.body, Id], (err, results) => {
      if (err) return res.cc(err)

      if (results.affectedRows !== 1)
        return res.cc("更新文章分类失败")

      res.cc("更新文章分类成功", 0)
    })
  })
}


export {
  getArticleClass,
  addArticleClass,
  deleteCateById,
  getArtCateById,
  updateCateById
}