const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const postController = require('./controllers/postController');

const app = express();
const port = 3000;

// 設定 Handlebars 模板引擎
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

// 設定靜態檔案
app.use(express.static('public'));

// 使用 body-parser 來解析 POST 請求
app.use(bodyParser.urlencoded({ extended: false }));

// 設定路由
app.get('/', postController.showPosts);
app.get('/post/:id', postController.findPost);
app.get('/new-post', (req, res) => { res.render('new-post'); });
app.post('/add-post', postController.createPost);

// 啟動伺服器
app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`);
});
