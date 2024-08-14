const express = require("express")
const mongose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()

mongose.connect("mongodb://localhost:27017/order")

let count = 0

const orderSchema = new mongose.Schema({
    orderId: String,
    userId: String,
    product: String
})

const Order = mongose.model('Order', orderSchema)

app.use(bodyParser.json())

app.get("/orders/:userId",  async (req, res) => {
    const ordersDb = await Order.find({userId: req.params.userId})
    const orders = []
    ordersDb.forEach(o => {
        orders.push({orderId: o.orderId, userId:o.userId, product: o.productId})
    })
    res.status(200).json(orders)
})

app.post("/orders/:userId",  async (req, res) => {
    const newOrder = new Order({
        userId: req.params.userId,
        product: req.body.content,
        orderId: ++count
    })
    const savedOrder = await newOrder.save()
    res.status(201).json(savedOrder)

})

app.listen(3000,()=> {
    console.log("app started")
})



