const cmd = require('../models/commande');

exports.retrieve = (req, res, next)=> {
    cmd.find({'item_number' : "Z62421FF"})
    .then(data => {
        res.send(data)
    })
    .catch(error=> {
        res.status(500).send({
           message : error.message || "Error retrieving dta baed on condition"
        })
    })
}