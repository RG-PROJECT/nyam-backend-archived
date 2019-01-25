const express = require("express");
const mongoose = require("mongoose");
const Card = require("../models/cards");
const router = express.Router();

router.get("/", (req, res, next) => {
    let page = 1;
    let limit = 10;
    if (typeof req.query['page'] !== 'undefined' && Number.isInteger(Number(req.query['page']))) {
        const v = Number(req.query['page']);
        if (v > 0)
            page = v;
    }
    if (typeof req.query['limit'] !== 'undefined' && Number.isInteger(Number(req.query['limit']))) {
        const v = Number(req.query['limit']);
        if (0 < v && v <= 20)
            limit = v;
    }
    console.log(`page:${page}, limit:${limit}`);
    Card.find().populate('author', 'name')
        .sort({regdate: -1})
        .skip((page - 1) * limit)
        .limit(limit)
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/", (req, res, next) => {
    if (!req.isAuthenticated()) {
        const error = new Error("Need login");
        error.status = 402;
        next(error);
        return;
    }
    console.log(req.body);
    if (typeof req.body.title === 'undefined' || typeof req.body.text === 'undefined') {
        const error = new Error("Invalid input");
        error.status = 403;
        next(error);
        return;
    }

    const title = req.body.title;
    const text = req.body.text;
    // min 200 ~ max 300
    const randNum = Math.floor(Math.random() * (300 - 200 + 1)) + 200;
    const card = new Card({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        author: req.user,
        img: "https://picsum.photos/" + randNum,
        text: text
    });

    card.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "SUCCESS Creating Card",
                createCard: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
