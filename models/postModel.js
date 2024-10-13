const mysql = require('mysql2/promise');
const posts = [];
// 建立 MySQL 連線池
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "myblog"
});

// 取得資料庫所有文章
async function getAllPosts() {
  const [rows] = await pool.query('SELECT * FROM posts');
  posts.splice(0, rows.length, ...rows);

  return posts;
}

// 搜尋特定的文章
async function getPostById(id) {
  return await posts.find(post => post.id === parseInt(id));
}

//新增文章
async function addPost(title, content) {
  const sql = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  const [result] = await pool.query(sql, [title, content]);

  if (result.insertId) {
    posts.push({
      id: result.insertId,
      title: title,
      content: content
    });
    return true;
  }
}

module.exports = {
  getAllPosts,
  addPost,
  getPostById
};
