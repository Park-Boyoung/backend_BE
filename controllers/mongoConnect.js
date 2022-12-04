// @ts-check
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://boyoung:7167@cluster0.uae2ehq.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
