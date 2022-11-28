// @ts-check

const express = require('express');

const { appendFile } = require('fs');

const router = express.Router();

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

router.get('/show', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
  res.write('<h1>Hello, Dynamic Web page!</h1>');
  for (let i = 0; i < USER.length; i++) {
    res.write(`<h2>USER id is ${USER[i].id}`);
    res.write(`<h2>USER name is ${USER[i].name}`);
    res.write(`<h2>USER email is ${USER[i].email}`);
  }
  res.end();
});

// 전체 회원 조회
router.get('/list', (req, res) => {
  res.send(USER);
});

// EJS 사용 파트
// localhost:4000/users 20일 실습
router.get('/', (req, res) => {
  res.render('users', { USER, userCounts: USER.length });
});
// localhost:4000/users/ejs 19일 실습
// router.get('/ejs', (req, res) => {
//   res.render('users', { USER, userCounts: USER.length });
// });

// 특정 ID를 가진 회원 조회?
router.get('/:id/:id', (req, res) => {
  const findUser = USER.find((user) => {
    console.log(user);
    return user.id === req.params.id;
    // const findUser = USER.find((user) => user.id === req.params.id);
    // 콘솔로그 빼고 위에랑 같은거 (중괄호랑 리턴 생략, 한줄일때..?)
  });
  if (findUser) {
    res.send(findUser);
  } else {
    const err = new Error('ID를 찾을 수 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

// 새로운 회원 등록
router.post('/', (req, res) => {
  if (Object.keys(req.query).length > 0) {
    if (req.query.id && req.query.name && req.query.email) {
      const newUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER.push(newUser);
      res.send('회원 등록 완료');
    } else {
      const err = new Error('Unexpected Query');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.id && req.body.name && req.body.email) {
      const newUser = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
      };
      USER.push(newUser);
      // res.send('회원 등록 완료!');
      res.redirect('/users');
    } else {
      const err = new Error('Unexpected Query');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
  }
});

// 회원 수정
router.put('/:id', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const findUserIndex = USER.findIndex((user) => user.id === req.params.id);
    if (findUserIndex !== -1) {
      const modifyUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER[findUserIndex] = modifyUser;
      res.send('회원 정보 수정 완료.');
    } else {
      res.send('ID를 찾을 수 없습니다!');
    }
  } else {
    const err = new Error('Unexpected Query');
    err.statusCode = 404;
    throw err;
  }
});

// 삭제
router.delete('/:id', (req, res) => {
  const findUserIndex = USER.findIndex((user) => user.id === req.params.id);
  if (findUserIndex !== -1) {
    USER.splice(findUserIndex, 1);
    res.send('회원 삭제 완료.');
  } else {
    const err = new Error('해당 ID를 찾을 수 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

// app.use('/users', userRouter);
// app.listen(PORT, () => {
//   console.log(`서버는 ${PORT}번에서 실행 중입니다.`);
// });

module.exports = router;
