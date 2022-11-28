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

// 유저 라우터, 전체 회원 목록 조회
userRouter.get('/', (req, res) => {
  res.send(USER);
});

// 특정 ID를 가진 회원 정보 조회
userRouter.get('/:id', (req, res) => {
  const findUser = USER.find((user) => {
    console.log(user);
    return user.id === req.params.id;
    // const findUser = USER.find((user) => user.id === req.params.id);
    // 콘솔로그 빼고 위에랑 같은거 (중괄호랑 리턴 생략, 한줄일때..?)
  });
  if (findUser) {
    res.send(findUser);
  } else {
    res.send('ID를 찾지 못하였습니다.');
  }
});

// 새로운 회원 등록
userRouter.post('/', (req, res) => {
  if (req.query.id && req.query.name) {
    const newUser = {
      id: req.query.id,
      name: req.query.name,
    };
    USER.push(newUser);
    res.send('회원 등록 완료');
  } else {
    res.send('Unexpected Query');
  }
});
app.use('/users', userRouter);
app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번에서 실행 중입니다.`);
});
