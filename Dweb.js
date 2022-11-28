// @ts-check

const express = require('express');

const app = express();

const userRouter = express.Router();

const PORT = 4000;

app.set('view engine', 'ejs');

const USER = [
  {
    id: 'boyoung',
    name: '박보영',
    email: 'by@gmail.com',
  },
  {
    id: 'kimi',
    name: '이기원',
    email: 'lee@naver.com',
  },
];

userRouter.get('/show', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
  res.write('<h1>Hello, Dynamic Web page!</h1>');
  for (let i = 0; i < USER.length; i++) {
    res.write(`<h2>USER id is ${USER[i].id}`);
    res.write(`<h2>USER name is ${USER[i].name}`);
    res.write(`<h2>USER email is ${USER[i].email}`);
  }
  res.end();
});

// EJS 사용 파트
// localhost:4000/users/ejs
userRouter.get('/ejs', (req, res) => {
  res.render('index', { USER, userCounts: USER.length });
});

app.use('/users', userRouter);
app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번에서 실행 중입니다.`);
});
