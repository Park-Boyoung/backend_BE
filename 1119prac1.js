// @ts-check

const express = require('express');

const app = express();

const userRouter = express.Router();

const PORT = 4000;

const USER = [
  {
    id: 'boyoung',
    name: '박보영',
  },
  {
    id: 'kimi',
    name: '이기원',
  },
];
// 전체 회원 조회
// userRouter.get('/', (req, res) => {
//   res.send(USER);
// });

// 회원 수정
userRouter.put('/:id', (req, res) => {
  if (req.query.id && req.query.name) {
    const findUserIndex = USER.findIndex((user) => user.id === req.params.id);
    if (findUserIndex !== -1) {
      const modifyUser = {
        id: req.query.id,
        name: req.query.name,
      };
      USER[findUserIndex] = modifyUser;
      res.send('회원 정보 수정 완료.');
    } else {
      res.send('ID를 찾을 수 없습니다!');
    }
  } else {
    console.log('Unexpected Query!');
  }
});

// 삭제
userRouter.delete('/:id', (req, res) => {
  const findUserIndex = USER.findIndex((user) => user.id === req.params.id);
  if (findUserIndex !== -1) {
    USER.splice(findUserIndex, 1);
    res.send('회원 삭제 완료.');
  } else {
    res.send('해당 ID를 찾을 수 없습니다.');
  }
});

app.use('/users', userRouter);
app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번에서 실행 중입니다.`);
});
