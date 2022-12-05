// @ts-check
const connect = require('./mongooseConnect');

const User = require('../models/user');

connect();

const db = {
  // getUsers: (cb) => {
  //   connection.query('SELECT * FROM mydb.user;', (err, data) => {
  //     if (err) throw err;
  //     console.log(data);
  //     cb(data);
  //   });
  // },

  // 유저 중복 체크
  userCheck: async (userId) => {
    try {
      const findUser = await User.findOne({ id: userId });
      if (!findUser) return false;
      return findUser;
    } catch (err) {
      console.error(err);
      return { status: 'unexpected', err };
    }
  },

  // 회원가입
  registerUser: async (newUser) => {
    try {
      console.log(newUser);
      const registerResult = await User.create(newUser);
      if (!registerResult) throw new Error('회원 가입 실패');
      return { status: 'success' };
    } catch (err) {
      console.log(err);
      if (err.code === 11000) return { status: 'duplicated' };
      return { status: 'unexpected', err };
    }
  },
};

module.exports = db;
