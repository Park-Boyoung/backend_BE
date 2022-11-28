// @ts-check
const express = require('express');

const app = express();
const PORT = 4000;

const indexRouter = require('./routes');
const userRouter = require('./routes/users');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', userRouter);

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

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.send(err.message);
});

app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번에서 실행 중입니다!`);
});
