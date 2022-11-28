// @ts-check

const express = require('express');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.cookie('alert', true, {
//     expires: new Date(Date.now() + 1000 * 10),
//     httpOnly: true,
//   });

//   console.log(req.cookies.alert);
//   console.log(req.cookies.tetz);

//   res.render('index', { alert: req.cookies.alert });
// });

// 1126실습 1
// router.get('/', (req, res) => {
//   res.cookie('name', '박보영', {
//     expires: new Date(Date.now() + 1000 * 10),
//     httpOnly: true,
//   });

//   const key = Object.keys(req.cookies)[0];

//   res.render('index', { key: key, value: req.cookies[key] });
// });

// router.get('/', (req, res) => {
//   res.render('index', { cookie: req.cookies.cookie });
// });

// router.get('/cookie', (req, res) => {
//   res.cookie('cookie', true, {
//     maxAge: 1000 * 60,
//     // expires: new Date(Date.now() + 1000 * 3),
//     // 1000 *60 = 1초
//     // 1000 *60 *60 = 한시간
//     // 1000 *60 *60 *24= 하루
//     httpOnly: false,
//   });
//   res.clearCookie('cookie');
//   res.send('쿠키굽기 성공');
// });

// 1126실습 2
router.post('/cookie', (req, res) => {
  res.cookie('popup', 'hide', {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send('쿠키 생성 성공');
});

router.get('/', (req, res) => {
  res.render('index', { popup: req.cookies.popup });
});
module.exports = router;
