// @ts-check

// const exp = require('constants');
const express = require('express');
const bodyParser = require('body-parser');
const { STATUS_CODES } = require('http');

const app = express();
const PORT = 4000;

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', userRouter);

// const USER = [
//   {
//     id: 'boyoung',
//     name: '박보영',
//     email: 'by@gmail.com',
//   },
//   {
//     id: 'kimi',
//     name: '이기원',
//     email: 'lee@naver.com',
//   },
// ];

// userRouter.get('/show', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
//   res.write('<h1>Hello, Dynamic Web page!</h1>');
//   for (let i = 0; i < USER.length; i++) {
//     res.write(`<h2>USER id is ${USER[i].id}`);
//     res.write(`<h2>USER name is ${USER[i].name}`);
//     res.write(`<h2>USER email is ${USER[i].email}`);
//   }
//   res.end();
// });

// EJS 사용 파트
// localhost:4000/users/ejs
// userRouter.get('/ejs', (req, res) => {
//   res.render('index', { USER, userCounts: USER.length });
// });

// 새로운 회원 등록
// userRouter.post('/', (req, res) => {
//   if (req.query.id && req.query.name && req.query.email) {
//     const newUser = {
//       id: req.query.id,
//       name: req.query.name,
//       email: req.query.email,
//     };
//     USER.push(newUser);
//     res.send('회원 등록 완료');
//   } else {
//     res.send('Unexpected Query');
//   }
// });

// 회원 수정
// userRouter.put('/:id', (req, res) => {
//   if (req.query.id && req.query.name && req.query.email) {
//     const findUserIndex = USER.findIndex((user) => user.id === req.params.id);
//     if (findUserIndex !== -1) {
//       const modifyUser = {
//         id: req.query.id,
//         name: req.query.name,
//         email: req.query.email,
//       };
//       USER[findUserIndex] = modifyUser;
//       res.send('회원 정보 수정 완료.');
//     } else {
//       res.send('ID를 찾을 수 없습니다!');
//     }
//   } else {
//     console.log('Unexpected Query!');
//   }
// });

// 삭제
// userRouter.delete('/:id', (req, res) => {
//   const findUserIndex = USER.findIndex((user) => user.id === req.params.id);
//   if (findUserIndex !== -1) {
//     USER.splice(findUserIndex, 1);
//     res.send('회원 삭제 완료.');
//   } else {
//     res.send('해당 ID를 찾을 수 없습니다.');
//   }
// });

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.send(err.message);
});

app.use('/users', userRouter);
app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번에서 실행 중입니다.`);
});
