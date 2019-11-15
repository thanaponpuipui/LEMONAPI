const { newOrder } = require('./newOrder.trx');

const restId = 19;

const orderType = {
    type:'DELIVERY',
    deliveryService: 4,
    refCode: 'GET1234'
}

const items = [
    {
        foodId:1,
        amount:2,
        remark:'add ice'
    },
    {
        foodId:4,
        amount:2,
        remark:'extra sweet add soy milk'
    }
]

const data = {
    orderType,
    items
}

newOrder(data, restId).catch(e => console.log('error'))