import db from "../db/index.js";

const addArticle = (req, res) => {

  const articleInfo = {
    // 标题、内容、状态、所属的分类Id
    ...req.body,
    // 文章发布时间
    pub_date: new Date(),
    // 文章作者的Id
    author_id: req.auth.id,
  }

  console.log(req)

  const sql = `insert into ev_articles set ?`

  db.query(sql, articleInfo, (err, results) => {
    if (err) return res.cc(err)

    if (results.affectedRows !== 1) return res.cc("发布文章失败！")
    res.cc("发布文章成功", 0)
  })
}

export {
  addArticle,
}

