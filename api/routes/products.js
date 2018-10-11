const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id') // will get this data
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request: {
                        type: 'GET'
                    }
                }
            })
        }
        console.log(docs)
        if(docs.length >= 0){
            res.status(200).json(response)
        } else { // really 404?
            res.status(404).json({
                message: 'no entries found'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    // store it to db
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'handling POST request',
                createProduct: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json(doc)
            } else {
                res.status(404).json({message: 'No valid entry found'})
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
})

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {}; // for check both options of name and price

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id:id}, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(result);

    })
})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
        ;
})

module.exports = router;