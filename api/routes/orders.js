const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/orders');
const Product = require('../models/products');

router.get('/', (req, res, next) => {
    Order.find()
        .select('quantity product _id')
        .exec()
        .then( docs => {
            const response = {
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        quantity: doc.quantity,
                        product: doc.product,
                        requeist: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + doc._id
                        }
                    }
                })
            }
            console.log(docs);
            if(docs.length >= 0){
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: 'no order found'
                })
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'order stored',
                createOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/'+ result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
})

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'order details!',
        orderId: req.params.orderId
    })
})

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'order deleted!',
        orderId: req.params.orderId
    })
})

module.exports = router;