const dim = require('../models/dim_stock_date_cmd');


//get all dimension
exports.retrieve = async (req, res, next) => {
      try {
          const all = await dim.find()
          res.send(all)
      }
      catch(erro){
        res.status(500).json({message: erro});
      }
}