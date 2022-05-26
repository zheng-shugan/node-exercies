import joi from "joi";


// 定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

const add_cate_schema = {
  body: {
    name,
    alias
  }
}

// 定义 分类Id 的校验规则
const id = joi.number().integer().min(1).required()
const delete_cate_schema = {
  body: {
    id
  }
}

const get_cate_schema = {
  params: {
    id,
  },
}
const update_cate_schema = {
  body: {
    Id: id,
    name,
    alias
  }
}

export {
  add_cate_schema,
  delete_cate_schema,
  get_cate_schema,
  update_cate_schema
}