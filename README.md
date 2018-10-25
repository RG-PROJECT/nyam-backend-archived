# nyam-backend-memo

# Goal

📷 Record 👏 Feedback 🍻‍ Group

# 🍗 Basic Features

- Write everyday diet & exercise.
- With a group!
- Give group member a comment & reaction.

# 🍖 Further Features

- Group
  - Share Result
  - Share Group Link
  - Custom Group Reaction
  - Group Goal and Notice
  - Putting into competition with...
- Planning futere diet
  - Plan today diet menu in the morning
  - Show if you fulfilled it
- Easy feedback
  - Custom feedback
- Uploading should be easy as possible
  - taking photo & upload -> upload finish!
  - auto creating title for easy recording
  - custom template
  - auto completing based on user history
- Desktop stand alone app

# 🍟 Dependencies

- express
- nodemon (Auto update)
- morgan (Displays method called on console)
- body-parser
- mongoose

# TIL 🥨 Remind

## 🚙 Express Hello, world

```javascript
var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(3000);
```

## 🚗 Routing express.Router

Use the express.Router to create modular. It by itself is a complete middleware and routing system.

To use this, You can group URI regardless of HTTP Methods

(ex) localhost:3000/hello

- 📁 app.js

```javascript
const express = require("express");
const app = express();
const greetingRoutes = require("./routes/greetings");

app.use("/hello", greetingRoutes);
```

- 📁 greetings.js

```javascript
const exrpess = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Hello, godori!"
  });
  next(); // callback function of middleware
});

module.exports = router; // DON'T FORGET EXPORT
```

## 🎰 JS Random

Return a random number between 1 to 100:

```javascript
const min = 1;
const max = 100;

Math.floor(Math.random() * max + min);
```

## 🌈 Mongoose Schema

```javascript
var schema = new Schema({
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65 },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  decimal: Schema.Types.Decimal128,
  array: [],
  ofString: [String],
  ofNumber: [Number],
  ofDates: [Date],
  ofBuffer: [Buffer],
  ofBoolean: [Boolean],
  ofMixed: [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  ofArrays: [[]],
  ofArrayOfNumbers: [[Number]],
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  },
  map: Map,
  mapOfString: {
    type: Map,
    of: String
  }
});

// example use

var Thing = mongoose.model("Thing", schema);

var m = new Thing();
m.name = "Statue of Liberty";
m.age = 125;
m.updated = new Date();
m.binary = Buffer.alloc(0);
m.living = false;
m.mixed = { any: { thing: "i want" } };
m.markModified("mixed");
m._someId = new mongoose.Types.ObjectId();
m.array.push(1);
m.ofString.push("strings!");
m.ofNumber.unshift(1, 2, 3, 4);
m.ofDates.addToSet(new Date());
m.ofBuffer.pop();
m.ofMixed = [1, [], "three", { four: 5 }];
m.nested.stuff = "good";
m.map = new Map([["key", "value"]]);
m.save(callback);
```
