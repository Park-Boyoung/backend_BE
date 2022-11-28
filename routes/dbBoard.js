// @ts-check
// const { Console } = require('console');
const express = require('express');
// const { isJSDocDeprecatedTag } = require('typescript');
const db = require('../controllers/boardController');

const router = express.Router();

// 로그인 처리 함수
function isLogin(req, res, next) {
  console.log('session', req.session.login, 'cookie', req.signedCookies.user);
  if (req.session.login || req.signedCookies.user) {
    next();
  } else {
    res.status(400);
    res.send(
      '로그인이 필요한 서비스입니다.<br> <a href="/login">로그인 페이지로 이동</a>',
    );
  }
}

// dbBoard 메인 페이지
// localhost:4000/dbBoard
router.get('/', isLogin, (req, res) => {
  db.getAllArticles((data) => {
    console.log(data);
    const ARTICLE = data;
    const articleCounts = ARTICLE.length;
    res.render('dbBoard', {
      ARTICLE,
      articleCounts,
      userId: req.session.userId,
    });
  });
});

// 모든 게시글 데이터 받아오는 라우터
router.get('/getAll', (req, res) => {
  db.getAllArticles((data) => {
    res.send(data);
  });
});

// 게시글 쓰기 페이지로 이동
router.get('/write', isLogin, (req, res) => {
  res.render('dbBoard_write');
});

// 게시글 추가
router.post('/write', isLogin, (req, res) => {
  if (req.body.title && req.body.content) {
    const newArticle = {
      id: req.session.userId,
      title: req.body.title,
      content: req.body.content,
    };
    db.writeArticle(newArticle, (data) => {
      if (data.protocol41) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('DB에 글 추가 실패');
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 빠졌습니다.');
    throw err;
  }
});

// 게시글 수정 페이지로 이동
router.get('/modify/:id', isLogin, (req, res) => {
  db.getArticle(req.params.id, (data) => {
    console.log(data);
    if (data.length > 0) {
      res.render('dbBoard_modify', { selectedArticle: data[0] });
    }
  });
});

// 게시글 수정
router.post('/modify/:id', isLogin, (req, res) => {
  if (req.body.title && req.body.content) {
    db.modifyArticle(req.params.id, req.body, (data) => {
      if (data.protocol41) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('DB 글 내용 수정 실패');
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 빠졌습니다.');
    throw err;
  }
});

// 게시글 삭제
router.delete('/delete/:id', isLogin, (req, res) => {
  db.deleteArticle(req.params.id, (data) => {
    console.log(data);
    if (data.protocol41) {
      res.send('게시글이 삭제 되었습니다.');
    }
  });
});

// 게시글 삭제 (위에랑 이거랑 둘 다 가능)
// router.delete('/delete/:id', (req, res) => {
//   if (req.params.id) {
//     db.deleteArticle(req.params.id, (data) => {
//       console.log(data);
//       if (data.protocol41) {
//         res.send('삭제 완료');
//       } else {
//         const err = new Error('글 삭제 실패');
//         err.statusCode = 404;
//         throw err;
//       }
//     });
//   } else {
//     const err = new Error('ID 파라미트 값이 없습니다.');
//     err.statusCode = 404;
//     throw err;
//   }
// });

module.exports = router;
