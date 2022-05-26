import joi from "joi";


// 定义 标题、分类Id、内容、发布状态 的验证规则
const title = joi.string().required()
const class_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()


const add_article_schema = {
  body: {
    title,
    class_id,
    content,
    state
  }
}

export {
  add_article_schema,
}