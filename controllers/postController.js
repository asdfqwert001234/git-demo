// 引入model
const postModel = require('../models/postModel');

// 顯示所有文章
async function showPosts(req, res) {
  try {
    const posts = await postModel.getAllPosts();
    res.render('home', { posts });
  } catch (error) {
    res.status(500).send('資料庫錯誤');
  }
}

// 創建文章
async function createPost(req, res) {
  const { title, content } = req.body;
  try {
    const postId = await postModel.addPost(title, content);

    if (postId) {
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).send('新增文章失敗');
  }
}

// 搜尋文章
async function findPost(req, res) {
  try {

    const post = await postModel.getPostById(req.params.id);

    if (post) {
      res.render('post', { post });
    } else {
      res.status(404).send('查無此文章');
    }
  } catch (error) {
    res.status(500).send('新增文章失敗');
  }
}

module.exports = {
  showPosts,
  createPost,
  findPost
};
