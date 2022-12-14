// @ts-check

const express = require('express');
const db = require('../controllers/userController');

const router = express.Router();

// 로그인 페이지
router.get('/', (req, res) => {
  res.render('login');
});

// 로그인 처리
router.post('/', (req, res) => {
  db.userCheck(req.body.id, (data) => {
    if (data.length > 0) {
      if (data[0].PASSWORD === req.body.password) {
        req.session.login = true;
        req.session.userId = req.body.id;
        // 쿠키 발행
        res.cookie('user', req.body.id, {
          maxAge: 1000 * 20,
          httpOnly: true,
          signed: true,
        });

        res.redirect('/dbBoard');
      } else {
        res.send(
          '비밀번호가 다릅니다.<br><a href="/login">로그인 페이지로 이동</a>',
        );
      }
    } else {
      res.send(
        '해당 id 가 존재하지 않습니다.<br><a href="/login">로그인 페이지로 이동</a>',
      );
    }
  });
});

// 로그아웃 처리
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie('user');
    res.redirect('/');
  });
});
module.exports = router;
