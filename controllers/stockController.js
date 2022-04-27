const stock = require ('../models/stock');
exports.findStock = (req, res, next)=> {
    stock.find()
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        res.status(500).send({
            message : error.message || "Some error while retrieving data"
        })
    })
}
