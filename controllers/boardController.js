// @ts-check
const { ObjectId } = require('mongodb');

const mongoClient = require('./mongoConnect');

const db = {
  // 모든 글 정보 가져오기
  getAllArticles: async () => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const allArticlesCursor = board.find({});
    const allArticles = await allArticlesCursor.toArray();
    return allArticles;
  },

  // 새로운 글 작성하기
  writeArticle: async (newArticle) => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const writeResult = await board.insertOne(newArticle);
    if (!writeResult.acknowledged) throw new Error('글 쓰기 실패');
    return true;
  },

  // 특정 ID를 가지는 게시글 찾기
  getArticle: async (id) => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const findArticle = await board.findOne({ _id: ObjectId(id) });
    if (!findArticle) return false;
    return findArticle;
  },

  // 특정 ID를 가지는 게시글 수정하기
  modifyArticle: async (id, modifyArticle, img) => {
    try {
      const client = await mongoClient.connect();
      const board = client.db('kdt4').collection('board');

      const finalModifyArticle = {
        TITLE: modifyArticle.title,
        CONTENT: modifyArticle.content,
      };

      if (img !== undefined) finalModifyArticle.IMAGE = img?.filename;

      const updateResult = await board.updateOne(
        { _id: ObjectId(id) },
        {
          $set: finalModifyArticle,
        },
      );
      if (!updateResult.acknowledged) throw new Error('게시글 수정 실패');
      return true;
    } catch (err) {
      console.error(err);
    }
  },

  // 글 삭제
  deleteArticle: async (id) => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const deleteResult = await board.deleteOne({ _id: ObjectId(id) });
    if (!deleteResult.acknowledged) throw new Error('게시글 삭제 실패');
    return true;
  },
};

module.exports = db;
