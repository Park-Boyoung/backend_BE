// @ts-check
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://boyoung:7167@cluster0.uae2ehq.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// client.connect((err, db) => {
//   const user = client.db('kdt-test').collection('test');

//   // << 삭제 >>
//   user.deleteMany({}, (err, deleteResult) => {
//     if (deleteResult?.acknowledged) {
//       // << 삽입 >>
//       user.deleteMany(
//         [
//           {
//             name: 'pororo',
//             age: 5,
//           },
//           {
//             name: 'loopy',
//             age: 6,
//           },
//           {
//             name: 'crong',
//             age: 4,
//           },
//         ],
//         (err, insertResult) => {
//           if (insertResult?.acknowledged) {
//             const findDataCursor = user.find({});
//             findDataCursor.toArray((err, data) => {
//               console.log(data);
//               client.close();
//             });
//           }
//         },
//       );
//     }
//   });
// });

// client.connect((err, db) => {
//   const user = client.db('kdt-test').collection('test');

//   // << 삭제 >>
//   user.deleteMany({}, (err, deleteResult) => {
//     if (deleteResult?.acknowledged) {
//       user.insertMany(
//         [
//           {
//             name: 'pororo',
//             age: 5,
//           },
//           {
//             name: 'loopy',
//             age: 6,
//           },
//           {
//             name: 'crong',
//             age: 4,
//           },
//         ],

//         (err, insertResult) => {
//           if (insertResult?.acknowledged) {
//             user.deleteMany(
//               {
//                 age: { $gte: 5 },
//               },
//               (err, deleteResult2) => {
//                 if (deleteResult2?.acknowledged) {
//                   const findDataCursor = user.find({});
//                   findDataCursor.toArray((err, data) => {
//                     console.log(data);
//                     client.close();
//                   });
//                 }
//               },
//             );
//           }
//         },
//       );
//     }
//   });
// });

client.connect((err, db) => {
  const user = client.db('kdt-test').collection('test');

  // << 수정, 검색 >>
  user.deleteMany({}, (err, deleteResult) => {
    if (deleteResult?.acknowledged) {
      user.insertMany(
        [
          {
            name: 'pororo',
            age: 5,
          },
          {
            name: 'loopy',
            age: 6,
          },
          {
            name: 'crong',
            age: 4,
          },
        ],

        (err, insertResult) => {
          if (insertResult?.acknowledged) {
            const cursor = user.find({
              $or: [{ age: { $gte: 5 } }, { name: 'crong' }],
            });

            cursor.toArray((err, data) => {
              console.log(data);
              client.close();
            });
          }
        },
      );
    }
  });
});
