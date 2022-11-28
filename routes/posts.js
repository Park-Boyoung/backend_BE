// @ts-check

const express = require('express');

const router = express.Router();

// const indexRouter = require('./routes');
// const userRouter = require('./routes/users');

// app.use('/', indexRouter);
// app.use('/users', userRouter);

const POSTS = [
  {
    title: '1119',
    content: '토요일',
  },
  {
    title: '1120',
    content: '일요일',
  },
];
// post 서비스 페이지
router.get('/', (req, res) => {
  res.render('posts', { POSTS, postCounts: POSTS.length });
});

// 글 전체 조회
router.get('/list', (req, res) => {
  res.send(POSTS);
});

// 글 추가
router.post('/', (req, res) => {
  if (req.body) {
    if (req.body.title && req.body.content) {
      const newPost = {
        title: req.body.title,
        content: req.body.content,
      };
      POSTS.push(newPost);
      res.redirect('/posts');
    } else {
      const err = new Error('no data');
    }
  } else {
    const err = new Error('Unexpected');
    err.statusCode = 404;
    throw err;
  }
});

// 글 삭제
router.delete('/:title', (req, res) => {
  const findPostIndex = POSTS.findIndex(
    (post) => post.title === req.params.title,
  );
  if (findPostIndex !== -1) {
    POSTS.splice(findPostIndex, 1);
    res.send('POST 삭제 완료.');
  } else {
    const err = new Error('해당 POST를 찾을 수 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

// app.use('/posts', userRouter);
// app.listen(PORT, () => {
//   console.log(`서버는 ${PORT}번에서 실행 중입니다.`);
// });

module.exports = router;
