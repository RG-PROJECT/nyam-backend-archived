const mongoose = require("mongoose");

const contentsSchema = mongoose.Schema({
  // 컨텐츠 둘중 하나만 true이면 업로드 되게 하고싶다
  img: { type: String },
  text: { type: String }
});

module.exports = mongoose.model("Contents", contentsSchema);
