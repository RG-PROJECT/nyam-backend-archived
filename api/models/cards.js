const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  status: { type: String, default: "OK" },
  title: { type: String, required: true },
  // ㄴ 최대한 자동으로 제목 생성 hh시 mm분에 저장한 author의 기록
  // author: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  regdate: { type: Date, default: Date.now },
  img: { type: String },
  text: { type: String }
  //   contents: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Contents",
  //     required: true
  //   }
  //   reactionList: [Schema.Types.ObjectId],
  //   commentList: [Schema.Types.ObjectId]
});

module.exports = mongoose.model("Card", cardSchema);
