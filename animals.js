// @-ts-check

// 1129 수업 내용
// const animals = ['dog', 'cat', 'chicken'];

// function showAnimals() {
//   // 배열함수 사용 x
//   for (let i = 0; i < animals.length; i++) {
//     console.log(animals[i]);
//   }

//   // 배열함수 사용
//   animals.map((value) => console.log(value));
// }

// module.exports = {
//   animals,
//   showAnimals,
// };

// exports.showAnimals = function () {
//   animals.map((value) => console.log(value));
// };
// exports.animals = animals;

// es6방식

// const animals = ['dog', 'cat', 'chicken'];

// function showAnimals() {
//   animals.map((value) => console.log(value));
// }
// export { animals as ani, showAnimals as show };

// export default class Animal {
//   constructor() {
//     this.animals = ['dog', 'cat', 'chicken'];
//   }

//   showAnimals() {
//     this.animals.map((value) => console.log(value));
//   }
// }

// 1130 수업 내용
export const animals = {
  animals: ['dog', 'cat'],
  showAnimals() {
    this.animals.map((el) => console.log(el));
  },
};
