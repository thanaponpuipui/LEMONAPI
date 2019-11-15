const { addReceipts } = require("./foodReceipts.model")

const data = [
    {
        id: 3,
        amount: 5
    },
    {
        id: 5,
        amount: 250
    }
]

addReceipts(data, 1)