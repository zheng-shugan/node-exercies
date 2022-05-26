import express from "express";
import {addArticle} from "../router_handler/index.js";
// 导入解析 FormData 格式表单数据的包
import multer from "multer";
// 导入处理路径的核心模块
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

// 导入检验规则
import {add_article_schema} from "../schema/index.js";
import expressJoi from "@escook/express-joi";

// 在 ES Module 中使用 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname)
const router = express.Router()

// 发布新文章的路由
// upload.single() 是一个局部中间件用来解析解析 FormData 格式的表单数据
// 注意：在当前的路由中，先后使用了两个中间件：
//       先使用 multer 解析表单数据
//       再使用 expressJoi 对解析的表单数据进行验证
router.post(
  '/add',
  expressJoi(add_article_schema),
  addArticle
)

// console.log(__dirname)

export {
  router
}