import express from "express";
import {
  getArticleClass,
  addArticleClass,
  deleteCateById,
  getArtCateById,
  updateCateById,
} from "../router_handler/index.js";

import {
  add_cate_schema,
  delete_cate_schema,
  get_cate_schema,
  update_cate_schema
} from "../schema/index.js";

import expressJoi from "@escook/express-joi";


const router = express.Router()

// 获取文章分类的路由接口
router.get('/cates', getArticleClass)

// 新增文章的路由接口
router.post('/addcates',
  expressJoi(add_cate_schema),
  addArticleClass
)

// 删除文章分类的路由接口
router.get(
  '/deletecate/:id',
  expressJoi(delete_cate_schema),
  deleteCateById
)

// 根据 id 获取文章分类数据
router.get(
  '/cates/:id',
  expressJoi(get_cate_schema),
  getArtCateById
)

// 更新文章分类
router.post('/updatecate',
  expressJoi(update_cate_schema),
  updateCateById
)


export {
  router
}