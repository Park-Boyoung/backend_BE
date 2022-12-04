// @ts-check

// 정보 합치기
// const boyoData = {
//   name: '박보영',
//   gender: 'Female',
// };
// const boyoInfo = {
//   nickName: 'boyo',
//   email: 'bypark9411@gmail.com',
// };

// const boyo = {
//   ...boyoData,
//   ...boyoInfo,
// };
// console.log(boyo);

// 배열 합치기
// const arr1 = [1, 2, 3, 4, 5];
// const arr2 = [6, 7, 8];
// const merge = [...arr1, ...arr2];

// console.log(merge);

const boyoData = {
  name: '박보영',
  gender: 'Female',
  nickName: 'boyo',
  email: 'bypark9411@gmail.com',
};
// const name = boyoData.name;
// const gender = boyoData.gender;
// const nickName = boyoData.nickName;
// const email = boyoData.email;

// const { name, gender, nickName, email } = boyoData;
// console.log(name, gender, nickName, email);

// const { name, ...boyoInfo } = boyoData;
// console.log(name, boyoInfo);

// const arr = [1, 2, 3, 4, 5, 6];
// const [first, second, ...rest] = arr;
// console.log(first);
// console.log(second);
// console.log(rest);

function spread(first, second, ...rest) {
  console.log(first, second);
  console.log(rest);
}

spread(1, 2, 3, 4, 5);
