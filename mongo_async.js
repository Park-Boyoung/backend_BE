// @ts-check
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://boyoung:7167@cluster0.uae2ehq.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  await client.connect();
  const user = client.db('kdt4').collection('user');
  const deleteResult = await user.deleteMany({});
  if (!deleteResult.acknowledged) throw new Error('삭제 이상');

  const insertResult = await user.insertMany([
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
  ]);

  if (!insertResult.acknowledged) throw new Error('삽입 이상');

  //   const updateManyResult = await user.updateMany(
  //     { age: { $gte: 5 } },
  //     { $set: { name: '5살이상' } },
  //   );
  //   if (!updateManyResult.acknowledged) throw new Error('삭제 이상');

  //   const data = await user.findOne({ name: 'loopy' });
  //   console.log(data);

  const data = await user.find({ age: { $gte: 5 } }).toArray();
  console.log(data);

  //   const findCursor = user.find({});
  //   const data = await findCursor.toArray();
  //   console.log(data);

  client.close();
}

main();
